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
            ->with(['category', 'brand'])
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
            ->with('parent')
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
                $isSubcategory = $category->parent_id !== null;
                $href = $isSubcategory
                    ? "/category/{$category->parent->slug}/{$category->slug}"
                    : "/category/{$category->slug}";

                return [
                    'type' => 'category',
                    'label' => $isSubcategory ? 'Subcategory' : 'Category',
                    'name' => $category->name,
                    'slug' => $category->slug,
                    'href' => $href,
                    'meta' => $isSubcategory ? $category->parent?->name : null,
                ];
            });

        $brands = Brand::query()
            ->where('is_active', true)
            ->where(function ($builder) use ($like) {
                $builder
                    ->where('name', 'like', $like)
                    ->orWhere('slug', 'like', $like);
            })
            ->with(['products' => fn ($productQuery) => $productQuery->with('category')->orderBy('sort_order')->limit(1)])
            ->orderBy('sort_order')
            ->orderBy('name')
            ->limit($limit)
            ->get()
            ->map(function (Brand $brand) {
                $categorySlug = $brand->products->first()?->category?->slug ?? 'bearings';

                return [
                    'type' => 'brand',
                    'label' => 'Brand',
                    'name' => $brand->name,
                    'slug' => $brand->slug,
                    'href' => "/category/{$categorySlug}/brand/{$brand->slug}",
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
