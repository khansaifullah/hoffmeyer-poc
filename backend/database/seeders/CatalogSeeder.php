<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class CatalogSeeder extends Seeder
{
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
                'image' => null,
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
                    'image' => null,
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
                        'image' => null,
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
        unset($subcategoryIds, $brandIds);

        $this->call(SupplierProductsSeeder::class);
    }
}
