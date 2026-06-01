<?php

namespace App\Services;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;

class ProductCsvImporter
{
    private const REQUIRED_HEADERS = ['name', 'category_slug', 'price'];

    private const HEADER_ALIASES = [
        'product_name' => 'name',
        'product' => 'name',
        'title' => 'name',
        'category' => 'category_slug',
        'categoryslug' => 'category_slug',
        'brand' => 'brand_slug',
        'brandslug' => 'brand_slug',
        'item_no' => 'item_number',
        'item' => 'item_number',
        'mfr' => 'mfr_number',
        'manufacturer_number' => 'mfr_number',
        'stock' => 'in_stock',
        'featured' => 'is_featured',
        'availability' => 'availability_status',
    ];

    public function import(UploadedFile $file): array
    {
        $path = $file->getRealPath();

        if ($path === false) {
            return $this->errorResult('Unable to read CSV file.');
        }

        $contents = file_get_contents($path);

        if ($contents === false) {
            return $this->errorResult('Unable to read CSV file.');
        }

        return $this->importFromContents($contents);
    }

    public function importFromContents(string $contents): array
    {
        $contents = preg_replace('/^\xEF\xBB\xBF/', '', $contents) ?? $contents;
        $delimiter = $this->detectDelimiter($contents);

        $handle = fopen('php://memory', 'r+');

        if ($handle === false) {
            return $this->errorResult('Unable to read CSV file.');
        }

        fwrite($handle, $contents);
        rewind($handle);

        return $this->importHandle($handle, $delimiter);
    }

    private function detectDelimiter(string $contents): string
    {
        $firstLine = strtok($contents, "\r\n");

        if ($firstLine === false || $firstLine === '') {
            return ',';
        }

        $commaCount = substr_count($firstLine, ',');
        $semiCount = substr_count($firstLine, ';');
        $tabCount = substr_count($firstLine, "\t");

        if ($semiCount > $commaCount && $semiCount >= $tabCount) {
            return ';';
        }

        if ($tabCount > $commaCount && $tabCount >= $semiCount) {
            return "\t";
        }

        return ',';
    }

    private function importHandle($handle, string $delimiter = ','): array
    {
        $header = fgetcsv($handle, 0, $delimiter);

        if ($header === false) {
            fclose($handle);

            return $this->errorResult('CSV file is empty.', 1);
        }

        $header = $this->normalizeHeader($header);
        $missing = array_values(array_diff(self::REQUIRED_HEADERS, $header));

        if ($missing !== []) {
            fclose($handle);
            $found = implode(', ', array_filter($header));

            return [
                'created' => 0,
                'updated' => 0,
                'failed' => 0,
                'errors' => [[
                    'row' => 1,
                    'message' => 'Header row is missing required columns: '
                        .implode(', ', $missing)
                        .($found !== '' ? ". Found columns: {$found}" : ''),
                ]],
            ];
        }

        $created = 0;
        $updated = 0;
        $failed = 0;
        $errors = [];
        $rowNumber = 1;

        while (($row = fgetcsv($handle, 0, $delimiter)) !== false) {
            $rowNumber++;

            if ($this->isEmptyRow($row)) {
                continue;
            }

            $data = $this->mapRow($header, $row);
            $result = $this->importRow($data, $rowNumber);

            if ($result === 'created') {
                $created++;
            } elseif ($result === 'updated') {
                $updated++;
            } else {
                $failed++;
                $errors[] = ['row' => $rowNumber, 'message' => $result];
            }
        }

        fclose($handle);

        return compact('created', 'updated', 'failed', 'errors');
    }

    private function errorResult(string $message, int $row = 0): array
    {
        return [
            'created' => 0,
            'updated' => 0,
            'failed' => 0,
            'errors' => [['row' => $row, 'message' => $message]],
        ];
    }

    private function normalizeHeader(array $header): array
    {
        return array_map(function ($column) {
            $column = trim((string) $column);
            $column = preg_replace('/^\xEF\xBB\xBF/', '', $column) ?? $column;
            $column = Str::snake(strtolower(str_replace([' ', '-'], '_', $column)));

            return self::HEADER_ALIASES[$column] ?? $column;
        }, $header);
    }

    private function isEmptyRow(array $row): bool
    {
        return trim(implode('', $row)) === '';
    }

    private function mapRow(array $header, array $row): array
    {
        $mapped = [];

        foreach ($header as $index => $column) {
            $mapped[$column] = trim((string) ($row[$index] ?? ''));
        }

        return $mapped;
    }

    private function importRow(array $data, int $rowNumber): string
    {
        if ($data['name'] === '') {
            return 'Name is required.';
        }

        if ($data['category_slug'] === '') {
            return 'category_slug is required.';
        }

        if ($data['price'] === '' || ! is_numeric($data['price'])) {
            return 'Price must be a valid number.';
        }

        $category = Category::query()->where('slug', $data['category_slug'])->first();

        if (! $category) {
            return "Category '{$data['category_slug']}' was not found.";
        }

        if (! $category->isSubcategory()) {
            return "category_slug must reference a subcategory (leaf category).";
        }

        $brandId = null;

        if (! empty($data['brand_slug'])) {
            $brand = Brand::query()->where('slug', $data['brand_slug'])->first();

            if (! $brand) {
                return "Brand '{$data['brand_slug']}' was not found.";
            }

            $brandId = $brand->id;
        }

        $availability = $data['availability_status'] ?? 'in_stock';

        if (! in_array($availability, ['in_stock', 'factory_order', 'out_of_stock'], true)) {
            return 'availability_status must be in_stock, factory_order, or out_of_stock.';
        }

        $payload = [
            'category_id' => $category->id,
            'brand_id' => $brandId,
            'name' => $data['name'],
            'price' => (float) $data['price'],
            'image' => $data['image'] ?? null,
            'sku' => $data['sku'] ?? null,
            'item_number' => $data['item_number'] ?? null,
            'mfr_number' => $data['mfr_number'] ?? null,
            'material' => $data['material'] ?? null,
            'description' => $data['description'] ?? null,
            'in_stock' => $this->toBool($data['in_stock'] ?? 'true'),
            'availability_status' => $availability,
            'is_featured' => $this->toBool($data['is_featured'] ?? 'false'),
            'sort_order' => isset($data['sort_order']) && $data['sort_order'] !== ''
                ? (int) $data['sort_order']
                : 0,
        ];

        $existing = null;

        if (! empty($data['slug'])) {
            $existing = Product::query()->where('slug', $data['slug'])->first();
        } elseif (! empty($data['sku'])) {
            $existing = Product::query()->where('sku', $data['sku'])->first();
        }

        if ($existing) {
            if (! empty($data['slug'])) {
                $payload['slug'] = $this->resolveSlug($data['slug'], $data['name'], $existing->id);
            }

            $existing->update($payload);
            $existing->categories()->syncWithoutDetaching([$category->id]);

            return 'updated';
        }

        $payload['slug'] = $this->resolveSlug($data['slug'] ?? null, $data['name']);

        $product = Product::query()->create($payload);
        $product->categories()->sync([$category->id]);

        return 'created';
    }

    private function toBool(string $value): bool
    {
        return in_array(strtolower(trim($value)), ['1', 'true', 'yes', 'y'], true);
    }

    private function resolveSlug(?string $slug, string $name, ?int $ignoreId = null): string
    {
        $base = $slug ?: Str::slug(str_replace(['®', '™', '&'], ['', '', 'and'], $name));
        $candidate = $base;
        $counter = 1;

        while (
            Product::query()
                ->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))
                ->where('slug', $candidate)
                ->exists()
        ) {
            $candidate = "{$base}-{$counter}";
            $counter++;
        }

        return $candidate;
    }
}
