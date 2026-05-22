<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreBrandRequest;
use App\Http\Requests\Admin\UpdateBrandRequest;
use App\Http\Resources\BrandResource;
use App\Models\Brand;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BrandController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Brand::query()
            ->withCount('products')
            ->orderBy('sort_order')
            ->orderBy('name');

        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }

        return response()->json([
            'data' => BrandResource::collection($query->get()),
        ]);
    }

    public function store(StoreBrandRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['slug'] = $this->resolveSlug($data['slug'] ?? null, $data['name']);
        $data['is_featured'] = $data['is_featured'] ?? false;
        $data['is_active'] = $data['is_active'] ?? true;
        $data['sort_order'] = $data['sort_order'] ?? 0;

        $brand = Brand::query()->create($data);
        $brand->loadCount('products');

        return response()->json(['data' => new BrandResource($brand)], 201);
    }

    public function show(Brand $brand): JsonResponse
    {
        $brand->loadCount('products');

        return response()->json(['data' => new BrandResource($brand)]);
    }

    public function update(UpdateBrandRequest $request, Brand $brand): JsonResponse
    {
        $data = $request->validated();

        if (! empty($data['slug'])) {
            $data['slug'] = $this->resolveSlug(
                $data['slug'],
                $data['name'] ?? $brand->name,
                $brand->id
            );
        } else {
            unset($data['slug']);
        }

        $brand->update($data);
        $brand->loadCount('products');

        return response()->json(['data' => new BrandResource($brand)]);
    }

    public function destroy(Brand $brand): JsonResponse
    {
        if ($brand->products()->exists()) {
            return response()->json(['message' => 'Cannot delete a brand that has products.'], 422);
        }

        $brand->delete();

        return response()->json(['message' => 'Brand deleted.']);
    }

    private function resolveSlug(?string $slug, string $name, ?int $ignoreId = null): string
    {
        $base = $slug ?: Str::slug(str_replace(['®', '™', '&'], ['', '', 'and'], $name));
        $candidate = $base;
        $counter = 1;

        while (
            Brand::query()
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
