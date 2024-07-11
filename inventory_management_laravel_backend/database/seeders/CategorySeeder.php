<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::factory()->create([
            "title"=> "Food",
            "description"=> "Food category",
            "id"=> 1,
            "image"=>"images/food.jpg"
        ]);

        Category::factory()->create([
            "title"=> "Juice",
            "description"=> "Juice category",
            "id"=> 2,
            "image"=>"images/juice.jpg"
        ]);
    }
}