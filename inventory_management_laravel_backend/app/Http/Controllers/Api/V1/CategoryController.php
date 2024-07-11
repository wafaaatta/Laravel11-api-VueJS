<?php

// app/Http/Controllers/Api/V1/CategoryController.php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CategoryController extends Controller
{
    public function index()
    {
        return Category::all();
    }

    public function show($id)
    {
        return Category::findOrFail($id);
    }

    public function store(Request $request)
    {
        $request->validate(
            [
                'title' => 'required|string|max:255|unique:categories',
                'description' => 'string|max:255|nullable',
                'image' => 'image|max:2048',
            ],
            [
                'required' => 'The :attribute field is required.',
                'unique' => 'The :attribute field must be unique.',
            ]
        );

        $imagePath = $request->file('image')->store('images/categories', 'public');

        $category = Category::create([
            'title' => $request->title,
            'description' => $request->description,
            'image' => $imagePath,
        ]);

        return response()->json($category, 201);
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        $category->update($request->all());

        return response()->json($category, 200);
    }

    public function destroy($id)
    {
        Category::findOrFail($id)->delete();

        return response()->json(null, 204);
    }

    public function getCategoriesCount()
    {
        $user = auth()->user();
        $count = Category::count();
        return response()->json($count,200);
    }
}
