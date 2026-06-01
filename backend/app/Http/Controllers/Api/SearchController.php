<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $query = trim($request->string('q')->toString());
        $limit = min(max((int) $request->input('limit', 5), 1), 10);

        if (strlen($query) < 2) {
            return response()->json([
                'data' => [
                    'products' => [],
                    'categories' => [],
                    'brands' => [],
                ],
            ]);
        }

        $like = "%{$query}%";

        $products = Product::query()
            ->with(['category.parent.parent', 'brand'])
            ->where(function ($builder) use ($like) {
                $builder
                    ->where('name', 'like', $like)
                    ->orWhere('description', 'like', $like)
                    ->orWhere('sku', 'like', $like)
                    ->orWhere('item_number', 'like', $like)
                    ->orWhere('mfr_number', 'like', $like);
            })
            ->orderBy('sort_order')
            ->orderBy('name')
            ->limit($limit)
            ->get()
            ->map(fn (Product $product) => [
                'type' => 'product',
                'label' => 'Product',
                'name' => $product->name,
                'slug' => $product->slug,
                'href' => "/product/{$product->slug}",
                'meta' => collect([
                    $product->sku,
                    $product->category?->name,
                    $product->brand?->name,
                ])->filter()->implode(' · '),
            ]);

        $categories = Category::query()
            ->with('parent.parent')
            ->where('is_active', true)
            ->where(function ($builder) use ($like) {
                $builder
                    ->where('name', 'like', $like)
                    ->orWhere('slug', 'like', $like);
            })
            ->orderBy('sort_order')
            ->orderBy('name')
            ->limit($limit)
            ->get()
            ->map(function (Category $category) {
                $href = '/category/'.$category->catalogPath();

                $label = match ($category->level) {
                    Category::LEVEL_PRODUCT_GROUP => 'Product Group',
                    Category::LEVEL_CATEGORY => 'Category',
                    default => 'Subcategory',
                };

                $meta = match ($category->level) {
                    Category::LEVEL_PRODUCT_GROUP => null,
                    Category::LEVEL_CATEGORY => $category->parent?->name,
                    default => collect([$category->parent?->parent?->name, $category->parent?->name])
                        ->filter()
                        ->implode(' · '),
                };

                return [
                    'type' => 'category',
                    'label' => $label,
                    'name' => $category->name,
                    'slug' => $category->slug,
                    'level' => $category->level,
                    'href' => $href,
                    'meta' => $meta ?: null,
                ];
            });

        $brands = Brand::query()
            ->where('is_active', true)
            ->where(function ($builder) use ($like) {
                $builder
                    ->where('name', 'like', $like)
                    ->orWhere('slug', 'like', $like);
            })
            ->with(['products' => fn ($productQuery) => $productQuery->with('category.parent.parent')->orderBy('sort_order')->limit(1)])
            ->orderBy('sort_order')
            ->orderBy('name')
            ->limit($limit)
            ->get()
            ->map(function (Brand $brand) {
                $product = $brand->products->first();
                $groupSlug = $product?->category?->breadcrumb()->first()?->slug ?? 'bearings';

                return [
                    'type' => 'brand',
                    'label' => 'Brand',
                    'name' => $brand->name,
                    'slug' => $brand->slug,
                    'href' => "/category/{$groupSlug}/brand/{$brand->slug}",
                    'meta' => null,
                ];
            });

        return response()->json([
            'data' => [
                'products' => $products,
                'categories' => $categories,
                'brands' => $brands,
            ],
        ]);
    }
}
