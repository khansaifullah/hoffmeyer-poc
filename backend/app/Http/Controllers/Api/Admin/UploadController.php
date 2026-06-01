<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreImageUploadRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadController extends Controller
{
    public function store(StoreImageUploadRequest $request): JsonResponse
    {
        $file = $request->file('image');
        $folder = $request->string('folder')->toString() ?: 'products';
        $extension = $file->getClientOriginalExtension() ?: $file->extension();
        $filename = Str::uuid()->toString().'.'.strtolower($extension);
        $path = $file->storeAs("uploads/{$folder}", $filename, 'public');
        $url = asset(Storage::url($path));

        return response()->json([
            'data' => [
                'path' => $path,
                'url' => $url,
            ],
        ], 201);
    }
}
