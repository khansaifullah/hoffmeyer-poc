<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    public function index(): JsonResponse
    {
        $products = Product::query()
            ->with('category')
            ->orderBy('name')
            ->get();

        return response()->json(['data' => $products]);
    }

    public function show(string $slug): JsonResponse
    {
        $product = Product::query()
            ->where('slug', $slug)
            ->with('category')
            ->firstOrFail();

        return response()->json(['data' => $product]);
    }
}
