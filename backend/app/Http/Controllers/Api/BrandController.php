<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BrandResource;
use App\Http\Resources\ProductResource;
use App\Models\Brand;
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

        $brands = $query->get();

        return response()->json(['data' => BrandResource::collection($brands)]);
    }

    public function show(string $slug, Request $request): JsonResponse
    {
        $brand = Brand::query()
            ->where('slug', $slug)
            ->with([
                'products' => fn ($query) => $query
                    ->with(['category', 'images', 'specs'])
                    ->when(
                        $request->filled('category'),
                        fn ($productQuery) => $productQuery->whereHas(
                            'category',
                            fn ($categoryQuery) => $categoryQuery->where('slug', $request->string('category'))
                        )
                    )
                    ->orderBy('sort_order')
                    ->orderBy('name'),
            ])
            ->withCount('products')
            ->firstOrFail();

        return response()->json(['data' => new BrandResource($brand)]);
    }
}
