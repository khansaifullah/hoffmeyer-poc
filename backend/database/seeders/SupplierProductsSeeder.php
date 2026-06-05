<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductSpec;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SupplierProductsSeeder extends Seeder
{
    private int $itemCounter = 2000000;

    public function run(): void
    {
        $this->clearProducts();

        $subcategoryIds = Category::query()
            ->where('level', Category::LEVEL_SUBCATEGORY)
            ->pluck('id', 'slug')
            ->all();

        $brandIds = Brand::query()
            ->get()
            ->mapWithKeys(fn (Brand $brand) => [strtolower($brand->name) => $brand->id])
            ->all();

        $brandIds['flexco'] = $this->ensureBrand('Flexco', $brandIds);
        $brandIds['continental'] = $brandIds['continental'] ?? $this->ensureBrand('Continental', $brandIds);
        $brandIds['gates'] = $this->ensureBrand('Gates', $brandIds);
        $brandIds['dixon'] = $this->ensureBrand('Dixon', $brandIds);
        $brandIds['wellcall'] = $this->ensureBrand('Wellcall', $brandIds);

        $missingSlugs = [];
        $created = 0;

        foreach (CatalogSupplierProducts::all() as $index => $productData) {
            $subcategorySlug = $productData['subcategory_slug'];
            $categoryId = $subcategoryIds[$subcategorySlug] ?? null;

            if (! $categoryId) {
                $missingSlugs[$subcategorySlug] = ($missingSlugs[$subcategorySlug] ?? 0) + 1;
                continue;
            }

            $this->createProduct($categoryId, $productData, $brandIds, $index);
            $created++;
        }

        if ($missingSlugs !== []) {
            $this->command?->warn('Skipped products with unknown subcategory slugs: '.implode(', ', array_keys($missingSlugs)));
        }

        $this->command?->info("Seeded {$created} supplier products.");
    }

    private function clearProducts(): void
    {
        DB::table('category_product')->delete();
        ProductSpec::query()->delete();
        ProductImage::query()->delete();
        Product::query()->delete();
    }

    private function ensureBrand(string $name, array $brandIds): int
    {
        $key = strtolower($name);

        if (isset($brandIds[$key])) {
            return $brandIds[$key];
        }

        $brand = Brand::query()->create([
            'name' => $name,
            'slug' => CatalogMockData::slugify($name),
            'logo' => null,
            'description' => "{$name} products supplied through Hoffmeyer.",
            'is_featured' => false,
            'is_active' => true,
            'sort_order' => 999,
        ]);

        return $brand->id;
    }

    private function createProduct(int $categoryId, array $productData, array $brandIds, int $sortOrder): void
    {
        $slug = $productData['slug'];
        $this->itemCounter++;
        $itemNumber = (string) $this->itemCounter;
        $brandId = null;

        if (! empty($productData['brand'])) {
            $brandKey = strtolower($productData['brand']);
            $brandId = $brandIds[$brandKey] ?? null;
        }

        $material = $productData['material']
            ?? CatalogMockData::inferMaterial($productData['name'], $productData['description']);

        $product = Product::query()->create([
            'category_id' => $categoryId,
            'brand_id' => $brandId,
            'name' => $productData['name'],
            'slug' => $slug,
            'price' => $productData['price'] ?? 0,
            'image' => null,
            'sku' => sprintf('HOFF-%s-%s', $itemNumber, strtoupper(substr($slug, 0, 12))),
            'item_number' => $productData['item_number'] ?? $itemNumber,
            'mfr_number' => $productData['mfr_number'] ?? strtoupper(substr(str_replace('-', '', $slug), 0, 12)),
            'material' => $material,
            'description' => $productData['description'],
            'in_stock' => $productData['in_stock'] ?? true,
            'availability_status' => $productData['availability_status'] ?? 'in_stock',
            'is_featured' => $productData['is_featured'] ?? false,
            'sort_order' => $sortOrder,
        ]);

        $specs = $productData['specs'] ?? [];

        if (! empty($productData['source'])) {
            $specs = SupplierProductDefinition::withSource(
                $specs,
                $productData['source'],
                $productData['source_url'] ?? null
            );
        }

        foreach ($specs as $specIndex => $spec) {
            ProductSpec::query()->create([
                'product_id' => $product->id,
                'label' => $spec['label'],
                'value' => $spec['value'],
                'sort_order' => $specIndex,
            ]);
        }

        $product->categories()->sync([$categoryId]);
    }
}
