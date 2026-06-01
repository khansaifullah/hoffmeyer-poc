<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'category_id' => $this->category_id,
            'category_ids' => $this->whenLoaded(
                'categories',
                fn () => $this->categories->pluck('id')->values()->all(),
                fn () => $this->category_id ? [$this->category_id] : []
            ),
            'brand_id' => $this->brand_id,
            'name' => $this->name,
            'slug' => $this->slug,
            'price' => $this->price,
            'image' => $this->image,
            'sku' => $this->sku,
            'item_number' => $this->item_number,
            'mfr_number' => $this->mfr_number,
            'material' => $this->material,
            'description' => $this->description,
            'in_stock' => $this->in_stock,
            'availability_status' => $this->availability_status,
            'is_featured' => $this->is_featured,
            'sort_order' => $this->sort_order,
            'category' => new CategoryResource($this->whenLoaded('category')),
            'categories' => CategoryResource::collection($this->whenLoaded('categories')),
            'brand' => new BrandResource($this->whenLoaded('brand')),
            'images' => $this->whenLoaded('images', fn () => $this->images->map(fn ($image) => [
                'id' => $image->id,
                'url' => $image->url,
                'sort_order' => $image->sort_order,
            ])),
            'specs' => $this->whenLoaded('specs', fn () => $this->specs->map(fn ($spec) => [
                'id' => $spec->id,
                'label' => $spec->label,
                'value' => $spec->value,
                'sort_order' => $spec->sort_order,
            ])),
        ];
    }
}
