<?php

namespace App\Http\Requests\Admin;

use App\Models\Category;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class StoreCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'parent_id' => ['nullable', 'exists:categories,id'],
            'level' => ['nullable', Rule::in([
                Category::LEVEL_PRODUCT_GROUP,
                Category::LEVEL_CATEGORY,
                Category::LEVEL_SUBCATEGORY,
            ])],
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:categories,slug'],
            'image' => ['nullable', 'string', 'max:500'],
            'description' => ['nullable', 'string'],
            'hero_description' => ['nullable', 'string'],
            'sort_order' => ['integer', 'min:0'],
            'is_active' => ['boolean'],
            'is_featured' => ['boolean'],
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator) {
            $parentId = $this->input('parent_id');
            $level = $this->input('level') ?: Category::resolveLevel($parentId);

            if (! $parentId && $level !== Category::LEVEL_PRODUCT_GROUP) {
                $validator->errors()->add('level', 'Top-level categories must be product groups.');
            }

            if ($parentId) {
                $parent = Category::query()->find($parentId);

                if ($parent && $parent->allowedChildLevel() !== $level) {
                    $validator->errors()->add('parent_id', 'The selected parent cannot contain this category level.');
                }
            }

            if ($level === Category::LEVEL_PRODUCT_GROUP && $this->boolean('is_featured') === false && $this->has('is_featured')) {
                return;
            }
        });
    }
}
