<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BrandResource;
use App\Models\Brand;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Brand::query()->withCount('products')->orderBy('sort_order')->orderBy('name');

        if ($request->has('active')) {
            $query->where('is_active', $request->boolean('active'));
        }

        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }

        if ($request->filled('category')) {
            $this->applyBrandCategoryScope($query, $request->string('category')->toString());
        }

        $brands = $query->get();

        return response()->json(['data' => BrandResource::collection($brands)]);
    }

    public function show(string $slug, Request $request): JsonResponse
    {
        $categorySlug = $request->filled('category')
            ? $request->string('category')->toString()
            : null;

        $brand = Brand::query()
            ->where('slug', $slug)
            ->with([
                'products' => function ($query) use ($categorySlug) {
                    $query
                        ->with(['category', 'images', 'specs'])
                        ->orderBy('sort_order')
                        ->orderBy('name');

                    if ($categorySlug) {
                        $this->applyProductCategoryScope($query, $categorySlug);
                    }
                },
            ])
            ->withCount('products')
            ->firstOrFail();

        return response()->json(['data' => new BrandResource($brand)]);
    }

    private function applyBrandCategoryScope($query, string $categorySlug): void
    {
        $query->whereHas(
            'products',
            fn ($productQuery) => $this->applyProductCategoryScope($productQuery, $categorySlug)
        );
    }

    private function applyProductCategoryScope($query, string $categorySlug): void
    {
        $category = Category::query()->where('slug', $categorySlug)->first();

        if ($category?->isProductGroup()) {
            $subcategoryIds = $category->subcategoryIds();

            if ($subcategoryIds === []) {
                $query->whereRaw('1 = 0');

                return;
            }

            $query->whereHas(
                'categories',
                fn ($categoryQuery) => $categoryQuery->whereIn('categories.id', $subcategoryIds)
            );

            return;
        }

        $query->whereHas(
            'categories',
            fn ($categoryQuery) => $categoryQuery->where('slug', $categorySlug)
        );
    }
}
