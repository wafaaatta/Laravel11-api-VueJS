<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Unauthorized - Inventory Management System</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
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
        <h1 class="text-4xl font-bold text-red-500 text-center mb-4">401</h1>
        <p class="text-gray-600 text-center mb-6 text-base">
            You are not authorized to access this page.
        </p>
        <div class="flex flex-col space-y-4">
            <form method="POST" action="{{ route('logout') }}" class="text-center">
                @csrf
                <button type="submit" class="block w-full text-center bg-blue-500 text-white rounded-md py-2 font-medium shadow-sm hover:bg-blue-600 transition duration-200">
                    {{ __('Go to Home') }}
                </button>
            </form>
        </div>
    </div>
</body>
</html>
