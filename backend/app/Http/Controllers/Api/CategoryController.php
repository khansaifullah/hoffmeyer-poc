<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    public function index(): JsonResponse
    {
        $categories = Category::query()
            ->withCount('products')
            ->orderBy('name')
            ->get();

        return response()->json(['data' => $categories]);
    }

    public function show(string $slug): JsonResponse
    {
        $category = Category::query()
            ->where('slug', $slug)
            ->with(['products' => fn ($query) => $query->orderBy('name')])
            ->firstOrFail();

        return response()->json(['data' => $category]);
    }
}
