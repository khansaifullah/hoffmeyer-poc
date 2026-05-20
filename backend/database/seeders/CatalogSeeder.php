<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class CatalogSeeder extends Seeder
{
    public function run(): void
    {
        $catalog = [
            [
                'name' => 'Conveyor Belts',
                'slug' => 'conveyor-belts',
                'image' => '/images/products/conveyor-belt.png',
                'products' => [
                    ['name' => 'Heavy-Duty Rubber Conveyor Belt', 'price' => 120.00, 'image' => '/images/products/conveyor-belt.png'],
                    ['name' => 'Cleated Incline Conveyor Belt', 'price' => 150.00, 'image' => '/images/products/conveyor-belt.png'],
                    ['name' => 'Heat Resistant Belt', 'price' => 180.00, 'image' => '/images/products/conveyor-belt.png'],
                ],
            ],
            [
                'name' => 'Industrial Hose',
                'slug' => 'industrial-hose',
                'image' => '/images/products/industrial-hose.png',
                'products' => [
                    ['name' => 'General Purpose Water Hose', 'price' => 45.00, 'image' => '/images/products/industrial-hose.png'],
                    ['name' => 'Premium Chemical Transfer Hose', 'price' => 290.00, 'image' => '/images/products/industrial-hose.png'],
                    ['name' => 'Fuel & Oil Suction Hose', 'price' => 195.00, 'image' => '/images/products/fuel-hose.png'],
                ],
            ],
            [
                'name' => 'Hydraulic Hose',
                'slug' => 'hydraulic-hose',
                'image' => '/images/products/hydraulic-hose-v2.png',
                'products' => [
                    ['name' => 'High-Pressure Braided Hydraulic Hose', 'price' => 98.00, 'image' => '/images/products/hydraulic-hose-v2.png'],
                    ['name' => 'Spiral Wire Reinforced Hydraulic Hose', 'price' => 165.00, 'image' => '/images/products/hydraulic-hose-v2.png'],
                ],
            ],
            [
                'name' => 'Hose Fittings & Adapters',
                'slug' => 'hose-fittings-and-adapters',
                'image' => '/images/products/hose-fittings.png',
                'products' => [
                    ['name' => 'JIC 37-Degree Flare Adapter', 'price' => 12.50, 'image' => '/images/products/hose-fittings.png'],
                    ['name' => 'Quick Disconnect Hose Coupler', 'price' => 45.00, 'image' => '/images/products/hose-fittings.png'],
                ],
            ],
            [
                'name' => 'Bearings',
                'slug' => 'bearings',
                'image' => '/images/products/bearing.png',
                'products' => [
                    ['name' => 'Dodge® Pillow Block Bearing', 'price' => 79.00, 'image' => '/images/products/bearing.png'],
                    ['name' => 'Flange Mount 4-Bolt Ball Bearing', 'price' => 65.00, 'image' => '/images/products/bearing.png'],
                ],
            ],
        ];

        foreach ($catalog as $categoryData) {
            $products = $categoryData['products'];
            unset($categoryData['products']);

            $category = Category::query()->updateOrCreate(
                ['slug' => $categoryData['slug']],
                $categoryData
            );

            foreach ($products as $productData) {
                Product::query()->updateOrCreate(
                    ['slug' => $this->slugify($productData['name'])],
                    [
                        ...$productData,
                        'category_id' => $category->id,
                        'in_stock' => true,
                    ]
                );
            }
        }
    }

    private function slugify(string $name): string
    {
        $slug = strtolower(str_replace(["\n", '®', '™', '&'], [' ', '', '', 'and'], $name));
        $slug = preg_replace('/[^a-z0-9]+/', '-', $slug);

        return trim($slug, '-');
    }
}
