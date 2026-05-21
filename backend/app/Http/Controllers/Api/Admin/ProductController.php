<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProductRequest;
use App\Http\Requests\Admin\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Product::query()
            ->with(['category', 'brand'])
            ->orderBy('sort_order')
            ->orderBy('name');

        if ($request->filled('search')) {
            $search = $request->string('search');
            $query->where(function ($builder) use ($search) {
                $builder
                    ->where('name', 'like', "%{$search}%")
                    ->orWhere('sku', 'like', "%{$search}%")
                    ->orWhere('item_number', 'like', "%{$search}%")
                    ->orWhere('mfr_number', 'like', "%{$search}%");
            });
        }

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->integer('category_id'));
        }

        $perPage = min(max((int) $request->input('per_page', 25), 1), 100);

        return ProductResource::collection($query->paginate($perPage))->response();
    }

    public function store(StoreProductRequest $request): JsonResponse
    {
        $data = $request->validated();
        $images = $data['images'] ?? [];
        $specs = $data['specs'] ?? [];
        unset($data['images'], $data['specs']);

        $data['slug'] = $this->resolveSlug($data['slug'] ?? null, $data['name']);
        $data['in_stock'] = $data['in_stock'] ?? true;
        $data['is_featured'] = $data['is_featured'] ?? false;
        $data['sort_order'] = $data['sort_order'] ?? 0;

        $product = Product::query()->create($data);
        $this->syncImages($product, $images, $data['image'] ?? null);
        $this->syncSpecs($product, $specs);

        $product->load(['category', 'brand', 'images', 'specs']);

        return response()->json(['data' => new ProductResource($product)], 201);
    }

    public function show(Product $product): JsonResponse
    {
        $product->load(['category', 'brand', 'images', 'specs']);

        return response()->json(['data' => new ProductResource($product)]);
    }

    public function update(UpdateProductRequest $request, Product $product): JsonResponse
    {
        $data = $request->validated();
        $images = $data['images'] ?? null;
        $specs = $data['specs'] ?? null;
        unset($data['images'], $data['specs']);

        if (! empty($data['slug'])) {
            $data['slug'] = $this->resolveSlug($data['slug'], $data['name'] ?? $product->name, $product->id);
        } else {
            unset($data['slug']);
        }

        $product->update($data);

        if ($images !== null) {
            $this->syncImages($product, $images, $data['image'] ?? $product->image);
        }

        if ($specs !== null) {
            $this->syncSpecs($product, $specs);
        }

        $product->load(['category', 'brand', 'images', 'specs']);

        return response()->json(['data' => new ProductResource($product)]);
    }

    public function destroy(Product $product): JsonResponse
    {
        $product->delete();

        return response()->json(['message' => 'Product deleted.']);
    }

    private function resolveSlug(?string $slug, string $name, ?int $ignoreId = null): string
    {
        $base = $slug ?: Str::slug(str_replace(['®', '™', '&'], ['', '', 'and'], $name));
        $candidate = $base;
        $counter = 1;

        while (
            Product::query()
                ->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))
                ->where('slug', $candidate)
                ->exists()
        ) {
            $candidate = "{$base}-{$counter}";
            $counter++;
        }

        return $candidate;
    }

    private function syncImages(Product $product, array $images, ?string $primaryImage): void
    {
        $product->images()->delete();

        $urls = count($images) > 0 ? $images : array_filter([$primaryImage]);

        foreach ($urls as $index => $url) {
            if (! $url) {
                continue;
            }

            $product->images()->create([
                'url' => $url,
                'sort_order' => $index,
            ]);
        }
    }

    private function syncSpecs(Product $product, array $specs): void
    {
        $product->specs()->delete();

        foreach ($specs as $index => $spec) {
            if (empty($spec['label']) || empty($spec['value'])) {
                continue;
            }

            $product->specs()->create([
                'label' => $spec['label'],
                'value' => $spec['value'],
                'sort_order' => $index,
            ]);
        }
    }
}
