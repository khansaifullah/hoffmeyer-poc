<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreCategoryRequest;
use App\Http\Requests\Admin\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Category::query()
            ->with('parent')
            ->withCount('products')
            ->orderBy('sort_order')
            ->orderBy('name');

        if ($request->filled('parent_id')) {
            $query->where('parent_id', $request->integer('parent_id'));
        }

        if ($request->boolean('product_groups') || $request->boolean('top_level')) {
            $query->productGroups();
        }

        if ($request->filled('level')) {
            $query->where('level', $request->string('level'));
        }

        return response()->json([
            'data' => CategoryResource::collection($query->get()),
        ]);
    }

    public function store(StoreCategoryRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['slug'] = $this->resolveSlug($data['slug'] ?? null, $data['name']);
        $data['is_active'] = $data['is_active'] ?? true;
        $data['is_featured'] = $data['is_featured'] ?? false;
        $data['sort_order'] = $data['sort_order'] ?? 0;
        $data['level'] = $data['level'] ?? Category::resolveLevel($data['parent_id'] ?? null);

        $category = Category::query()->create($data);
        $category->load('parent')->loadCount('products');

        return response()->json(['data' => new CategoryResource($category)], 201);
    }

    public function show(Category $category): JsonResponse
    {
        $category->load(['parent.parent', 'children.children'])->loadCount('products');

        return response()->json(['data' => new CategoryResource($category)]);
    }

    public function update(UpdateCategoryRequest $request, Category $category): JsonResponse
    {
        $data = $request->validated();

        if (! empty($data['slug'])) {
            $data['slug'] = $this->resolveSlug(
                $data['slug'],
                $data['name'] ?? $category->name,
                $category->id
            );
        } else {
            unset($data['slug']);
        }

        if (array_key_exists('parent_id', $data) && $data['parent_id'] == $category->id) {
            return response()->json(['message' => 'A category cannot be its own parent.'], 422);
        }

        if (array_key_exists('parent_id', $data) && ! array_key_exists('level', $data)) {
            $data['level'] = Category::resolveLevel($data['parent_id']);
        }

        $category->update($data);
        $category->load('parent')->loadCount('products');

        return response()->json(['data' => new CategoryResource($category)]);
    }

    public function destroy(Category $category): JsonResponse
    {
        if ($category->children()->exists()) {
            return response()->json(['message' => 'Cannot delete a category that has child categories.'], 422);
        }

        if ($category->products()->exists()) {
            return response()->json(['message' => 'Cannot delete a category that has products.'], 422);
        }

        $category->delete();

        return response()->json(['message' => 'Category deleted.']);
    }

    private function resolveSlug(?string $slug, string $name, ?int $ignoreId = null): string
    {
        $base = $slug ?: Str::slug(str_replace(['®', '™', '&'], ['', '', 'and'], $name));
        $candidate = $base;
        $counter = 1;

        while (
            Category::query()
                ->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))
                ->where('slug', $candidate)
                ->exists()
        ) {
            $candidate = "{$base}-{$counter}";
            $counter++;
        }

        return $candidate;
    }
}
