<div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
    <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-sm overflow-hidden sm:rounded-lg">
        <div class="flex items-center justify-center">
            <img src="https://laravel.com/img/logomark.min.svg" alt="Logo" class="h-24 mb-4">
        </div>
        <div class="text-center">
            <p class="text-3xl font-bold text-gray-800 mb-4">Welcome back Admin</p>
        </div>
        {{ $slot }}
    </div>
</div>
