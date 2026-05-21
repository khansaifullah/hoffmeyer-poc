<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductSpec;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CatalogSeeder extends Seeder
{
    public function run(): void
    {
        $brandIds = $this->seedBrands();
        $categoryIds = $this->seedCategories();
        $this->seedProducts($categoryIds, $brandIds);
    }

    private function seedBrands(): array
    {
        $brandIds = [];
        $descriptions = CatalogMockData::brandDescriptions();

        foreach (CatalogMockData::brands() as $index => $brandData) {
            $slug = CatalogMockData::slugify($brandData['name']);
            $isFeatured = in_array($brandData['name'], CatalogMockData::FEATURED_BRAND_NAMES, true)
                || in_array(strtoupper($brandData['name']), array_map('strtoupper', CatalogMockData::FEATURED_BRAND_NAMES), true);

            $brand = Brand::query()->updateOrCreate(
                ['slug' => $slug],
                [
                    'name' => str_replace("\n", ' ', $brandData['name']),
                    'logo' => $brandData['logo'],
                    'description' => $descriptions[$slug] ?? sprintf(
                        '%s industrial products supplied through Hoffmeyer for B2B procurement and replacement programs.',
                        $brandData['name']
                    ),
                    'is_featured' => $isFeatured,
                    'is_active' => true,
                    'sort_order' => $index,
                ]
            );

            $brandIds[strtolower(str_replace("\n", ' ', $brandData['name']))] = $brand->id;
        }

        return $brandIds;
    }

    private function seedCategories(): array
    {
        $categoryIds = [];
        $subcategoryMap = CatalogMockData::subcategoryMap();

        foreach (CatalogMockData::categories() as $index => $categoryData) {
            $name = str_replace("\n", ' ', $categoryData['name']);
            $slug = CatalogMockData::slugify($categoryData['name']);

            $category = Category::query()->updateOrCreate(
                ['slug' => $slug],
                [
                    'parent_id' => null,
                    'name' => $name,
                    'image' => $categoryData['image'],
                    'description' => null,
                    'hero_description' => sprintf(
                        'Browse %s products, trusted brands, and top sellers for your operation.',
                        $name
                    ),
                    'sort_order' => $index,
                    'is_active' => true,
                ]
            );

            $categoryIds[$slug] = $category->id;

            $subcategories = $subcategoryMap[$slug]
                ?? CatalogMockData::genericSubcategories($categoryData['name'], $categoryData['image']);

            foreach ($subcategories as $subIndex => $subcategoryData) {
                $subSlug = CatalogMockData::slugify($subcategoryData['name']);

                Category::query()->updateOrCreate(
                    ['slug' => $subSlug],
                    [
                        'parent_id' => $category->id,
                        'name' => $subcategoryData['name'],
                        'image' => $subcategoryData['image'],
                        'description' => null,
                        'hero_description' => null,
                        'sort_order' => $subIndex,
                        'is_active' => true,
                    ]
                );
            }
        }

        return $categoryIds;
    }

    private function seedProducts(array $categoryIds, array $brandIds): void
    {
        foreach (CatalogMockData::categoryProducts() as $categorySlug => $products) {
            $categoryId = $categoryIds[$categorySlug] ?? null;

            if (! $categoryId) {
                continue;
            }

            $categoryName = Str::title(str_replace('-', ' ', $categorySlug));

            foreach ($products as $index => $productData) {
                $slug = CatalogMockData::slugify($productData['name']);
                $cleanName = str_replace(['®', '™'], '', $productData['name']);
                $description = sprintf('%s for %s applications.', $cleanName, $categoryName);
                $material = CatalogMockData::inferMaterial($productData['name'], $description);
                $mfrNumber = strtoupper(substr(str_replace('-', '', $slug), 0, 10));
                $itemNumber = (string) (1326180 + $index + 1);
                $brandId = null;

                if (! empty($productData['brand'])) {
                    $brandKey = strtolower($productData['brand']);
                    $brandId = $brandIds[$brandKey] ?? null;
                }

                $isFeatured = in_array($slug, CatalogMockData::HOME_FEATURED_PRODUCT_SLUGS, true);
                $availabilityStatus = $index === 4 ? 'factory_order' : 'in_stock';

                $product = Product::query()->updateOrCreate(
                    ['slug' => $slug],
                    [
                        'category_id' => $categoryId,
                        'brand_id' => $brandId,
                        'name' => $productData['name'],
                        'price' => $productData['price'],
                        'image' => $productData['image'],
                        'sku' => sprintf('HOFF-%s-%s', $itemNumber, strtoupper(substr($slug, 0, 8))),
                        'item_number' => $itemNumber,
                        'mfr_number' => $mfrNumber,
                        'material' => $material,
                        'description' => $description,
                        'in_stock' => true,
                        'availability_status' => $availabilityStatus,
                        'is_featured' => $isFeatured,
                        'sort_order' => $index,
                    ]
                );

                $product->images()->delete();
                foreach (range(0, 3) as $imageIndex) {
                    ProductImage::query()->create([
                        'product_id' => $product->id,
                        'url' => $productData['image'],
                        'sort_order' => $imageIndex,
                    ]);
                }

                $product->specs()->delete();
                foreach (CatalogMockData::buildSpecs($material) as $specIndex => $spec) {
                    ProductSpec::query()->create([
                        'product_id' => $product->id,
                        'label' => $spec['label'],
                        'value' => $spec['value'],
                        'sort_order' => $specIndex,
                    ]);
                }
            }
        }
    }
}
