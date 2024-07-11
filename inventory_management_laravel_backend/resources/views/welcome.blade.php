<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Welcome to Inventory Management System</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        /* Custom Styles */
        .bg-primary {
            background-color: #f8f9fa;
        }
    </style>
</head>
<body class="bg-primary flex items-center justify-center min-h-screen">
    <div class="bg-white shadow-md rounded-lg p-8 max-w-xl w-full mx-4">
        <div class="flex justify-center mb-6">
            <img src="https://laravel.com/img/logomark.min.svg" alt="Logo" class="h-24 mb-4">
        </div>
        <h1 class="text-3xl font-semibold text-gray-800 text-center mb-4">
            Welcome to Your Admin Dashboard
        </h1>
        <p class="text-gray-600 text-center mb-6 text-base">
            Efficiently manage your inventory with our streamlined and powerful platform. Access essential features and data with ease.
        </p>
        <div class="flex flex-col space-y-4">
            <a href="{{ route('login') }}" class="block w-full text-center bg-blue-500 text-white rounded-md py-2 font-medium shadow-sm hover:bg-blue-600 transition duration-200">
                Login
            </a>
            <a href="{{ route('register') }}" class="block w-full text-center bg-green-500 text-white rounded-md py-2 font-medium shadow-sm hover:bg-green-600 transition duration-200">
                Register
            </a>
        </div>
    </div>
</body>
</html>
