<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductSpec;
use Illuminate\Database\Seeder;

class CatalogSeeder extends Seeder
{
    private const MIN_PRODUCTS_PER_SUBCATEGORY = 5;

    private int $itemCounter = 1326180;

    public function run(): void
    {
        $this->resetCatalog();

        $brandIds = $this->seedBrands();
        $subcategoryIds = $this->seedTaxonomy();
        $this->seedProducts($subcategoryIds, $brandIds);
    }

    private function resetCatalog(): void
    {
        Product::query()->delete();
        Category::query()->delete();
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

    /**
     * @return array<string, int> subcategory slug => id
     */
    private function seedTaxonomy(): array
    {
        $subcategoryIds = [];

        foreach (CatalogTaxonomy::productGroups() as $groupIndex => $groupData) {
            $groupName = $groupData['name'];
            $groupSlug = CatalogTaxonomy::slug($groupName);

            $group = Category::query()->create([
                'parent_id' => null,
                'level' => Category::LEVEL_PRODUCT_GROUP,
                'name' => $groupName,
                'slug' => $groupSlug,
                'image' => $groupData['image'] ?? null,
                'description' => null,
                'hero_description' => sprintf(
                    'Browse %s products, trusted brands, and top sellers for your operation.',
                    $groupName
                ),
                'sort_order' => $groupIndex,
                'is_active' => true,
                'is_featured' => $groupData['is_featured'] ?? false,
            ]);

            foreach ($groupData['categories'] as $categoryIndex => $categoryData) {
                $categoryName = $categoryData['name'];
                $categorySlug = CatalogTaxonomy::slug($categoryName, $groupSlug);

                $category = Category::query()->create([
                    'parent_id' => $group->id,
                    'level' => Category::LEVEL_CATEGORY,
                    'name' => $categoryName,
                    'slug' => $categorySlug,
                    'image' => $groupData['image'] ?? null,
                    'description' => null,
                    'hero_description' => sprintf('Browse %s in %s.', $categoryName, $groupName),
                    'sort_order' => $categoryIndex,
                    'is_active' => true,
                    'is_featured' => false,
                ]);

                foreach ($categoryData['subcategories'] as $subIndex => $subcategoryEntry) {
                    $subcategoryData = CatalogTaxonomy::normalizeSubcategoryEntry($subcategoryEntry);
                    $subcategoryName = $subcategoryData['name'];
                    $subcategorySlug = CatalogTaxonomy::slug($subcategoryName, $categorySlug);

                    $subcategory = Category::query()->create([
                        'parent_id' => $category->id,
                        'level' => Category::LEVEL_SUBCATEGORY,
                        'name' => $subcategoryName,
                        'slug' => $subcategorySlug,
                        'image' => $groupData['image'] ?? null,
                        'description' => $subcategoryData['description'] ?? null,
                        'hero_description' => null,
                        'sort_order' => $subIndex,
                        'is_active' => true,
                        'is_featured' => false,
                    ]);

                    $subcategoryIds[$subcategorySlug] = $subcategory->id;
                }
            }
        }

        return $subcategoryIds;
    }

    private function seedProducts(array $subcategoryIds, array $brandIds): void
    {
        $explicitProducts = CatalogMockData::subcategoryProducts();

        foreach ($subcategoryIds as $subcategorySlug => $categoryId) {
            $subcategory = Category::query()->with('parent.parent')->find($categoryId);

            if (! $subcategory) {
                continue;
            }

            $categoryLabel = collect([
                $subcategory->parent?->parent?->name,
                $subcategory->parent?->name,
                $subcategory->name,
            ])->filter()->implode(' / ');

            $image = $subcategory->image
                ?: $subcategory->parent?->parent?->image
                ?: '/images/products/bearing.png';

            $products = $explicitProducts[$subcategorySlug] ?? [];
            $seededCount = 0;

            foreach ($products as $index => $productData) {
                $this->createProduct($categoryId, $productData, $categoryLabel, $brandIds, $index);
                $seededCount++;
            }

            $needed = self::MIN_PRODUCTS_PER_SUBCATEGORY - $seededCount;

            if ($needed > 0) {
                $generatedProducts = CatalogMockData::defaultProductsForSubcategory(
                    $subcategory->name,
                    $subcategorySlug,
                    $image,
                    $needed,
                    $seededCount
                );

                foreach ($generatedProducts as $index => $productData) {
                    $this->createProduct(
                        $categoryId,
                        $productData,
                        $categoryLabel,
                        $brandIds,
                        $seededCount + $index
                    );
                }
            }
        }
    }

    private function createProduct(
        int $categoryId,
        array $productData,
        string $categoryLabel,
        array $brandIds,
        int $sortOrder
    ): void {
        $slug = $productData['slug'] ?? CatalogMockData::slugify($productData['name']);
        $cleanName = str_replace(['®', '™'], '', $productData['name']);
        $description = sprintf('%s for %s applications.', $cleanName, $categoryLabel);
        $material = CatalogMockData::inferMaterial($productData['name'], $description);
        $mfrNumber = strtoupper(substr(str_replace('-', '', $slug), 0, 10));
        $this->itemCounter++;
        $itemNumber = (string) $this->itemCounter;
        $brandId = null;

        if (! empty($productData['brand'])) {
            $brandKey = strtolower($productData['brand']);
            $brandId = $brandIds[$brandKey] ?? null;
        }

        $isFeatured = in_array($slug, CatalogMockData::HOME_FEATURED_PRODUCT_SLUGS, true);
        $availabilityStatus = $sortOrder === 4 ? 'factory_order' : 'in_stock';

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
                'sort_order' => $sortOrder,
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

        $product->categories()->syncWithoutDetaching([$categoryId]);
    }
}
