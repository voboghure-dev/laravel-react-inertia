<?php
namespace App\Http\Controllers;

use App\Http\Requests\StorePermissionRequest;
use App\Http\Requests\UpdatePermissionRequest;
use App\Http\Resources\PermissionResource;
use App\Models\Permission;

class PermissionController extends Controller {
	/**
	 * Display a listing of the resource.
	 */
	public function index() {
		$query = Permission::query();

		$sortField     = request( 'sort_field', 'created_at' );
		$sortDirection = request( 'sort_direction', 'desc' );

		if ( request( 'name' ) ) {
			$query->where( 'name', 'like', '%' . request( 'name' ) . '%' );
		}

		$permissions = $query->orderBy( $sortField, $sortDirection )->paginate( 10 )->onEachSide( 1 );

		return inertia( 'Permission/Index', [
			'permissions' => PermissionResource::collection( $permissions ),
			'queryParams' => request()->query() ?: null,
			'success'     => session( 'success' ),
		] );
	}

	/**
	 * Show the form for creating a new resource.
	 */
	public function create() {
		return inertia( 'Permission/Create' );
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store( StorePermissionRequest $request ) {
		$data = $request->validated();
		Permission::create( $data );

		return to_route( 'permission.index' )->with( 'success', 'Permission has been successfully created.' );
	}

	/**
	 * Display the specified resource.
	 */
	public function show( Permission $permission ) {
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit( Permission $permission ) {
		return inertia( 'Permission/Edit', [
			'permission' => new PermissionResource( $permission ),
		] );
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update( UpdatePermissionRequest $request, Permission $permission ) {
		$data = $request->validated();
		$permission->update( $data );

		return to_route( 'permission.index' )->with( 'success', "Permission \"$permission->name\" has been successfully updated." );
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy( Permission $permission ) {
		$permission->delete();

		return to_route( 'permission.index' )->with( 'success', "Permission \"$permission->name\" has been successfully deleted." );
	}
}
