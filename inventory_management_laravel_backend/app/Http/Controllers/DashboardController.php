<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function users()
    {
        $users = User::all();
        return view('admin.users.users', compact('users'));
    }

    public function editUserView(Request $request, $id)
    {
        $user = User::find($id);
        return view('admin.users.edit-user', compact('user'));
    }

    public function index()
    {
        if(auth()->user()->role != 'admin') {
            return view('errors.unauthorized');
        }

        $totalUsers = User::count();
        $totalRevenue = 123456;
        return view('dashboard', compact('totalUsers', 'totalRevenue'));
    }
}
