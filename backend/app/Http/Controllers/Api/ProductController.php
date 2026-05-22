<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Product::query()
            ->with(['category.parent', 'brand', 'images', 'specs']);

        if ($request->filled('category')) {
            $category = Category::query()->where('slug', $request->string('category'))->first();
            if ($category) {
                $query->where('category_id', $category->id);
            }
        }

        if ($request->filled('subcategory')) {
            $subcategory = Category::query()
                ->where('slug', $request->string('subcategory'))
                ->whereNotNull('parent_id')
                ->first();

            if ($subcategory) {
                $hasDirectProducts = Product::query()
                    ->where('category_id', $subcategory->id)
                    ->exists();

                if ($hasDirectProducts) {
                    $query->where('category_id', $subcategory->id);
                } elseif ($subcategory->parent_id) {
                    $query->where('category_id', $subcategory->parent_id);
                }
            }
        }

        if ($request->filled('brand')) {
            $brand = Brand::query()->where('slug', $request->string('brand'))->first();
            if ($brand) {
                $query->where('brand_id', $brand->id);
            }
        }

        if ($request->filled('search')) {
            $search = $request->string('search');
            $query->where(function ($builder) use ($search) {
                $builder
                    ->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('sku', 'like', "%{$search}%")
                    ->orWhere('item_number', 'like', "%{$search}%")
                    ->orWhere('mfr_number', 'like', "%{$search}%");
            });
        }

        if ($request->filled('material')) {
            $query->where('material', $request->string('material'));
        }

        if ($request->filled('featured')) {
            $query->where('is_featured', $request->boolean('featured'));
        }

        if ($request->filled('in_stock')) {
            $query->where('in_stock', $request->boolean('in_stock'));
        }

        if ($request->filled('price_min')) {
            $query->where('price', '>=', $request->input('price_min'));
        }

        if ($request->filled('price_max')) {
            $query->where('price', '<=', $request->input('price_max'));
        }

        match ($request->string('sort')->toString()) {
            'price_asc' => $query->orderBy('price'),
            'price_desc' => $query->orderByDesc('price'),
            'name' => $query->orderBy('name'),
            default => $query->orderBy('sort_order')->orderBy('name'),
        };

        $perPage = min(max((int) $request->input('per_page', 24), 1), 100);
        $products = $query->paginate($perPage)->withQueryString();

        return ProductResource::collection($products)->response();
    }

    public function show(string $slug): JsonResponse
    {
        $product = Product::query()
            ->where('slug', $slug)
            ->with(['category.parent', 'brand', 'images', 'specs'])
            ->firstOrFail();

        return response()->json(['data' => new ProductResource($product)]);
    }
}
