<?php

namespace Database\Seeders;

class SupplierProductDefinition
{
    /**
     * @param  array<string, mixed>  $options
     * @return array<string, mixed>
     */
    public static function make(string $subcategorySlug, string $name, array $options = []): array
    {
        $slug = $options['slug'] ?? CatalogMockData::slugify($name);

        return [
            'subcategory_slug' => $subcategorySlug,
            'name' => $name,
            'slug' => $slug,
            'price' => $options['price'] ?? 0,
            'image' => null,
            'description' => $options['description'] ?? '',
            'material' => $options['material'] ?? null,
            'brand' => $options['brand'] ?? null,
            'mfr_number' => $options['mfr_number'] ?? null,
            'availability_status' => $options['availability_status'] ?? 'in_stock',
            'in_stock' => $options['in_stock'] ?? true,
            'is_featured' => $options['is_featured'] ?? false,
            'specs' => $options['specs'] ?? [],
            'source' => $options['source'] ?? null,
            'source_url' => $options['source_url'] ?? null,
        ];
    }

    /**
     * @param  list<array{label: string, value: string}>  $specs
     * @return list<array{label: string, value: string}>
     */
    public static function withSource(array $specs, ?string $source, ?string $sourceUrl): array
    {
        if ($source) {
            $specs[] = ['label' => 'Source', 'value' => $source];
        }

        if ($sourceUrl) {
            $specs[] = ['label' => 'Source URL', 'value' => $sourceUrl];
        }

        return $specs;
    }
}
