<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ImportProductsRequest;
use App\Services\ProductCsvImporter;
use Illuminate\Http\JsonResponse;

class ProductImportController extends Controller
{
    public function __invoke(ImportProductsRequest $request, ProductCsvImporter $importer): JsonResponse
    {
        if ($request->filled('csv')) {
            $result = $importer->importFromContents($request->string('csv')->toString());
        } else {
            $result = $importer->import($request->file('file'));
        }

        return response()->json(['data' => $result]);
    }
}
