<?php

// app/Http/Controllers/Api/V1/ProductController.php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('category')->get();

        return response()->json($products);
    }

    public function show($id)
    {
        return Product::with('category')->findOrFail($id);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'price' => 'required',
            'stock' => 'required',
            'category_id' => 'required',
            'image' => 'image|max:2048',
        ]);

        if(Category::where('id', $request->category_id)->count() == 0) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $imagePath = $request->file('image')->store('images/categories', 'public');

        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'stock' => $request->stock,
            'category_id' => $request->category_id,
            'image' => $imagePath,
        ]);

        return response()->json($product, 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $product->update($request->all());

        return response()->json($product, 200);
    }

    public function destroy($id)
    {
        Product::findOrFail($id)->delete();

        return response()->json(null, 204);
    }

    public function getProductsByCategory($id)
    {
        return Product::where('category_id', $id)->get();
    }
}
