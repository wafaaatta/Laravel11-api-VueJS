<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::factory()->count(5)->create([
            'category_id' => 1,
            "image"=>"images/foodpro.jpg"
        ]);

        Product::factory()->count(5)->create([
            'category_id' => 2,
            "image"=>"images/juicepro.jpg"
        ]);
    }
}