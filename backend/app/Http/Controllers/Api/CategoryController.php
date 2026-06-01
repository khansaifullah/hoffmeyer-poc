<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Category::query()->withCount('products')->orderBy('sort_order')->orderBy('name');

        if ($request->boolean('tree')) {
            $categories = $query
                ->productGroups()
                ->active()
                ->with([
                    'children' => fn ($categoryQuery) => $categoryQuery
                        ->active()
                        ->orderBy('sort_order')
                        ->with([
                            'children' => fn ($subcategoryQuery) => $subcategoryQuery
                                ->active()
                                ->orderBy('sort_order')
                                ->withCount('products'),
                        ])
                        ->withCount('products'),
                ])
                ->get();

            return response()->json(['data' => CategoryResource::collection($categories)]);
        }

        if ($request->boolean('product_groups') || $request->boolean('top_level')) {
            $query->productGroups();
        }

        if ($request->filled('level')) {
            $query->where('level', $request->string('level'));
        }

        if ($request->filled('parent_id')) {
            $query->where('parent_id', $request->integer('parent_id'));
        }

        if ($request->has('active')) {
            $query->where('is_active', $request->boolean('active'));
        }

        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }

        $categories = $query->get();

        return response()->json(['data' => CategoryResource::collection($categories)]);
    }

    public function show(string $slug): JsonResponse
    {
        $category = Category::query()
            ->where('slug', $slug)
            ->with([
                'parent.parent',
                'children' => fn ($query) => $query
                    ->where('is_active', true)
                    ->orderBy('sort_order')
                    ->with([
                        'children' => fn ($childQuery) => $childQuery
                            ->where('is_active', true)
                            ->orderBy('sort_order')
                            ->withCount('products'),
                    ])
                    ->withCount('products'),
                'products' => fn ($query) => $query
                    ->with(['brand', 'images', 'specs', 'category.parent.parent'])
                    ->orderBy('sort_order')
                    ->orderBy('name'),
            ])
            ->withCount('products')
            ->firstOrFail();

        return response()->json(['data' => new CategoryResource($category)]);
    }
}
