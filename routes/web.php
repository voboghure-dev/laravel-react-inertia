<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::redirect( '/', '/dashboard' );

// Route::get( '/dashboard', function () {
// 	return Inertia::render( 'Dashboard' );
// } )->middleware( ['auth', 'verified'] )->name( 'dashboard' );

Route::middleware( ['auth', 'verified'] )->group( function () {
	Route::get( '/dashboard', [DashboardController::class, 'index'] )->name( 'dashboard' );

	Route::resource( 'project', ProjectController::class );
	Route::get( 'task/my-tasks', [TaskController::class, 'myTasks'] )->name( 'task.myTasks' );
	Route::resource( 'task', TaskController::class );
	Route::resource( 'user', UserController::class );
	Route::resource( 'permission', PermissionController::class );
	Route::resource( 'role', RoleController::class );
	Route::get( 'role/{role}/add-permission', [RoleController::class, 'addPermissionToRole'] )->name( 'role.addPermission' );
	Route::post( 'role/{role}/give-permission', [RoleController::class, 'givePermissionToRole'] )->name( 'role.givePermission' );
} );

Route::middleware( 'auth' )->group( function () {
	Route::get( '/profile', [ProfileController::class, 'edit'] )->name( 'profile.edit' );
	Route::patch( '/profile', [ProfileController::class, 'update'] )->name( 'profile.update' );
	Route::delete( '/profile', [ProfileController::class, 'destroy'] )->name( 'profile.destroy' );
} );

require __DIR__ . '/auth.php';
