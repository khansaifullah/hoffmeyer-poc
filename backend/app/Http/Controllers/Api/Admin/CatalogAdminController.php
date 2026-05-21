<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class CatalogAdminController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'message' => 'Admin catalog write routes will be added in Phase 2.',
            'endpoints' => [
                'POST /api/admin/products',
                'PUT /api/admin/products/{id}',
                'DELETE /api/admin/products/{id}',
                'POST /api/admin/categories',
                'PUT /api/admin/categories/{id}',
                'DELETE /api/admin/categories/{id}',
                'POST /api/admin/brands',
                'PUT /api/admin/brands/{id}',
                'DELETE /api/admin/brands/{id}',
            ],
        ]);
    }
}
