<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $breadcrumb = $this->breadcrumb()->map(fn ($node) => [
            'id' => $node->id,
            'name' => $node->name,
            'slug' => $node->slug,
            'level' => $node->level,
        ])->values();

        $catalogPath = $this->catalogPath();

        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'level' => $this->level,
            'image' => $this->image,
            'description' => $this->description,
            'hero_description' => $this->hero_description,
            'sort_order' => $this->sort_order,
            'is_active' => $this->is_active,
            'is_featured' => $this->is_featured,
            'parent_id' => $this->parent_id,
            'parent' => $this->whenLoaded('parent', fn () => new CategoryResource($this->parent)),
            'children' => CategoryResource::collection($this->whenLoaded('children')),
            'breadcrumb' => $breadcrumb,
            'catalog_path' => $catalogPath,
            'href' => '/category/'.$catalogPath,
            'products_count' => $this->whenCounted('products'),
            'products' => ProductResource::collection($this->whenLoaded('products')),
        ];
    }
}
