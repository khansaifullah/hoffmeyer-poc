<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BrandResource;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Category::query()->withCount('products')->orderBy('sort_order')->orderBy('name');

        if ($request->boolean('tree')) {
            $categories = $query
                ->whereNull('parent_id')
                ->where('is_active', true)
                ->with(['children' => fn ($childQuery) => $childQuery->where('is_active', true)->orderBy('sort_order')])
                ->get();

            return response()->json(['data' => CategoryResource::collection($categories)]);
        }

        if ($request->boolean('top_level')) {
            $query->whereNull('parent_id');
        }

        if ($request->has('active')) {
            $query->where('is_active', $request->boolean('active'));
        }

        $categories = $query->get();

        return response()->json(['data' => CategoryResource::collection($categories)]);
    }

    public function show(string $slug): JsonResponse
    {
        $category = Category::query()
            ->where('slug', $slug)
            ->with([
                'parent',
                'children' => fn ($query) => $query->where('is_active', true)->orderBy('sort_order'),
                'products' => fn ($query) => $query
                    ->with(['brand', 'images', 'specs'])
                    ->orderBy('sort_order')
                    ->orderBy('name'),
            ])
            ->withCount('products')
            ->firstOrFail();

        return response()->json(['data' => new CategoryResource($category)]);
    }
}
