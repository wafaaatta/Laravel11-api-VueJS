<x-app-layout>
    <div class="py-12 bg-gray-100">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
                <div class="text-center">
                    <h1 class="text-3xl font-bold mb-4">Inventory Management Dashboard</h1>
                    <p class="text-gray-600">Overview of your inventory metrics</p>
                </div>

                <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="p-6 bg-white rounded-lg shadow-md">
                        <div class="flex items-center">
                            <div class="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM12 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z"></path>
                                </svg>
                            </div>
                            <div class="ml-4">
                                <div class="text-lg font-semibold text-gray-700">Total Users</div>
                                <div class="text-2xl font-bold text-gray-900">{{ $totalUsers }}</div>
                            </div>
                        </div>
                    </div>

                    <div class="p-6 bg-white rounded-lg shadow-md">
                        <div class="flex items-center">
                            <div class="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
                                    <path d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM12 12c-1.65 0-3 1.35-3 3v4h6v-4c0-1.65-1.35-3-3-3z"></path>
                                    <path d="M20 6h-2v6h-2V6H8v6H6V6H4V4h16v2z"></path>
                                </svg>
                            </div>
                            <div class="ml-4">
                                <div class="text-lg font-semibold text-gray-700">Total Revenue</div>
                                <div class="text-2xl font-bold text-gray-900">$123,456</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-8 p-6 bg-white rounded-lg shadow-md">
                    <h2 class="text-xl font-semibold text-gray-700 mb-4">Recent Activities</h2>
                    <ul class="list-disc list-inside text-gray-600">
                        <li>User John Doe added a new product</li>
                        <li>Product XYZ was updated</li>
                        <li>Category ABC was deleted</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
