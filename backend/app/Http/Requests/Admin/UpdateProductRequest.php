<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $productId = $this->route('product')?->id ?? $this->route('product');

        return [
            'category_id' => ['sometimes', 'required', 'exists:categories,id'],
            'brand_id' => ['nullable', 'exists:brands,id'],
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('products', 'slug')->ignore($productId),
            ],
            'price' => ['sometimes', 'required', 'numeric', 'min:0'],
            'image' => ['nullable', 'string', 'max:500'],
            'sku' => ['nullable', 'string', 'max:255'],
            'item_number' => ['nullable', 'string', 'max:255'],
            'mfr_number' => ['nullable', 'string', 'max:255'],
            'material' => ['nullable', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
            'in_stock' => ['boolean'],
            'availability_status' => ['sometimes', Rule::in(['in_stock', 'factory_order', 'out_of_stock'])],
            'is_featured' => ['boolean'],
            'sort_order' => ['integer', 'min:0'],
            'images' => ['nullable', 'array'],
            'images.*' => ['string', 'max:500'],
            'specs' => ['nullable', 'array'],
            'specs.*.label' => ['required_with:specs', 'string', 'max:255'],
            'specs.*.value' => ['required_with:specs', 'string', 'max:255'],
        ];
    }
}
