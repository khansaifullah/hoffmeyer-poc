<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->string('level', 32)->default('product_group')->after('parent_id');
            $table->boolean('is_featured')->default(false)->after('is_active');
        });

        $categories = DB::table('categories')->get()->keyBy('id');

        foreach ($categories as $category) {
            $level = 'product_group';

            if ($category->parent_id) {
                $parent = $categories[$category->parent_id] ?? null;

                if ($parent && ! $parent->parent_id) {
                    $level = 'category';
                } elseif ($parent && $parent->parent_id) {
                    $level = 'subcategory';
                }
            }

            DB::table('categories')->where('id', $category->id)->update(['level' => $level]);
        }
    }

    public function down(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->dropColumn(['level', 'is_featured']);
        });
    }
};
