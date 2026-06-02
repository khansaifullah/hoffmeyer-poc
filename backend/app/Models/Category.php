<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;

class Category extends Model
{
    public const LEVEL_PRODUCT_GROUP = 'product_group';

    public const LEVEL_CATEGORY = 'category';

    public const LEVEL_SUBCATEGORY = 'subcategory';

    protected $fillable = [
        'parent_id',
        'level',
        'name',
        'slug',
        'image',
        'description',
        'sort_order',
        'is_active',
        'is_featured',
        'hero_description',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
        ];
    }

    protected static function booted(): void
    {
        static::saving(function (Category $category) {
            if (! $category->level) {
                $category->level = self::resolveLevel($category->parent_id);
            }
        });
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_id')->orderBy('sort_order');
    }

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class);
    }

    public function scopeProductGroups(Builder $query): Builder
    {
        return $query->where('level', self::LEVEL_PRODUCT_GROUP);
    }

    public function scopeCategories(Builder $query): Builder
    {
        return $query->where('level', self::LEVEL_CATEGORY);
    }

    public function scopeSubcategories(Builder $query): Builder
    {
        return $query->where('level', self::LEVEL_SUBCATEGORY);
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function isProductGroup(): bool
    {
        return $this->level === self::LEVEL_PRODUCT_GROUP;
    }

    public function isCategory(): bool
    {
        return $this->level === self::LEVEL_CATEGORY;
    }

    public function isSubcategory(): bool
    {
        return $this->level === self::LEVEL_SUBCATEGORY;
    }

    public static function resolveLevel(?int $parentId): string
    {
        if (! $parentId) {
            return self::LEVEL_PRODUCT_GROUP;
        }

        $parent = self::query()->find($parentId);

        if (! $parent) {
            return self::LEVEL_PRODUCT_GROUP;
        }

        return match ($parent->level) {
            self::LEVEL_PRODUCT_GROUP => self::LEVEL_CATEGORY,
            self::LEVEL_CATEGORY => self::LEVEL_SUBCATEGORY,
            default => self::LEVEL_SUBCATEGORY,
        };
    }

    public function allowedChildLevel(): ?string
    {
        return match ($this->level) {
            self::LEVEL_PRODUCT_GROUP => self::LEVEL_CATEGORY,
            self::LEVEL_CATEGORY => self::LEVEL_SUBCATEGORY,
            default => null,
        };
    }

    public function ancestors(): Collection
    {
        $ancestors = collect();
        $current = $this->parent;

        while ($current) {
            $ancestors->prepend($current);

            if ($current->relationLoaded('parent')) {
                $current = $current->parent;
            } elseif ($current->parent_id) {
                $current = $current->parent()->first();
            } else {
                $current = null;
            }
        }

        return $ancestors;
    }

    public function breadcrumb(): Collection
    {
        return $this->ancestors()->push($this);
    }

    /**
     * @return list<int>
     */
    public function subcategoryIds(): array
    {
        if ($this->isSubcategory()) {
            return [$this->id];
        }

        if ($this->isCategory()) {
            $this->loadMissing('children');

            return $this->children->pluck('id')->all();
        }

        $this->loadMissing('children.children');

        return $this->children
            ->flatMap(fn (Category $category) => $category->children->pluck('id'))
            ->all();
    }

    /**
     * @param  Builder<Product>  $query
     */
    public function applyProductFilter(Builder $query): Builder
    {
        $subcategoryIds = $this->subcategoryIds();

        if ($subcategoryIds === []) {
            return $query->whereRaw('0 = 1');
        }

        return $query->where(function (Builder $builder) use ($subcategoryIds) {
            $builder
                ->whereHas('categories', fn (Builder $relation) => $relation->whereIn('categories.id', $subcategoryIds))
                ->orWhereIn('category_id', $subcategoryIds);
        });
    }

    public function catalogPath(): string
    {
        return $this->breadcrumb()
            ->pluck('slug')
            ->implode('/');
    }
}
