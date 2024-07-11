<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        api: __DIR__.'/../routes/api.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // $middleware
        // ->append(\Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class)
        // ->prepend(\Illuminate\Routing\Middleware\SubstituteBindings::class)
        // ->prepend('throttle:api');
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->renderable(function (Exception $e) {
            return response()->json([
                'message'=> $e->getMessage(),
                ],500);
        });
    })
    // ->withProviders([
    //     'api' => [
    //         \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    //         'throttle:api',
    //         \Illuminate\Routing\Middleware\SubstituteBindings::class,
    //     ],
    // ])
    ->create();
