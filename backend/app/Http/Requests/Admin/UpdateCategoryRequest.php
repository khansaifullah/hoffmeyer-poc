<?php

namespace App\Http\Requests\Admin;

use App\Models\Category;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class UpdateCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $categoryId = $this->route('category')?->id ?? $this->route('category');

        return [
            'parent_id' => ['nullable', 'exists:categories,id', Rule::notIn([$categoryId])],
            'level' => ['nullable', Rule::in([
                Category::LEVEL_PRODUCT_GROUP,
                Category::LEVEL_CATEGORY,
                Category::LEVEL_SUBCATEGORY,
            ])],
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('categories', 'slug')->ignore($categoryId),
            ],
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
            /** @var Category|null $category */
            $category = $this->route('category');

            if (! $category) {
                return;
            }

            $parentId = $this->input('parent_id', $category->parent_id);
            $level = $this->input('level', $category->level);

            if ($parentId == $category->id) {
                $validator->errors()->add('parent_id', 'A category cannot be its own parent.');
            }

            if (! $parentId && $level !== Category::LEVEL_PRODUCT_GROUP) {
                $validator->errors()->add('level', 'Top-level categories must be product groups.');
            }

            if ($parentId) {
                $parent = Category::query()->find($parentId);

                if ($parent && $parent->allowedChildLevel() !== $level) {
                    $validator->errors()->add('parent_id', 'The selected parent cannot contain this category level.');
                }
            }
        });
    }
}
