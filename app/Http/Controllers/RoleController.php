<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\Http\Resources\RoleResource;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Spatie\Permission\Middleware\PermissionMiddleware;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller implements HasMiddleware {
	/**
	 * Get the middleware that should be assigned to the controller.
	 */
	public static function middleware(): array {
		return [
			new Middleware( PermissionMiddleware::using( 'view role' ), only: ['index'] ),
			new Middleware( PermissionMiddleware::using( 'add role' ), only: ['create', 'store', 'addPermissionToRole', 'givePermissionToRole'] ),
			new Middleware( PermissionMiddleware::using( 'edit role' ), only: ['edit', 'update'] ),
			new Middleware( PermissionMiddleware::using( 'delete role' ), only: ['destroy'] ),
		];
	}

	/**
	 * Display a listing of the resource.
	 */
	public function index() {
		$query = Role::query();

		$sortField     = request( 'sort_field', 'created_at' );
		$sortDirection = request( 'sort_direction', 'desc' );

		if ( request( 'name' ) ) {
			$query->where( 'name', 'like', '%' . request( 'name' ) . '%' );
		}

		$roles = $query->orderBy( $sortField, $sortDirection )->paginate( 10 )->onEachSide( 1 );

		return inertia( 'Role/Index', [
			'roles'       => RoleResource::collection( $roles ),
			'queryParams' => request()->query() ?: null,
			'success'     => session( 'success' ),
		] );
	}

	/**
	 * Show the form for creating a new resource.
	 */
	public function create() {
		return inertia( 'Role/Create' );
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store( StoreRoleRequest $request ) {
		$data = $request->validated();
		Role::create( $data );

		return to_route( 'role.index' )->with( 'success', 'Role has been successfully created.' );
	}

	/**
	 * Display the specified resource.
	 */
	public function show( Role $role ) {
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit( Role $role ) {
		return inertia( 'Role/Edit', [
			'role' => new RoleResource( $role ),
		] );
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update( UpdateRoleRequest $request, Role $role ) {
		$data = $request->validated();
		$role->update( $data );

		return to_route( 'role.index' )->with( 'success', "Role \"$role->name\" has been successfully updated." );
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy( Role $role ) {
		$name = $role->name;
		$role->delete();

		return to_route( 'role.index' )->with( 'success', "Role \"$name\" has been successfully deleted." );
	}

	/**
	 * Add permission to role
	 *
	 * @param Role $role
	 * @return void
	 */
	public function addPermissionToRole( Role $role ) {
		$permissions     = Permission::get();
		$rolePermissions = $role->getPermissionNames();

		return inertia( 'Role/AddPermission', [
			'role'            => $role,
			'permissions'     => $permissions,
			'rolePermissions' => $rolePermissions,
			'success'         => session( 'success' ),
			'error'           => session( 'error' ),
		] );
	}

	/**
	 * Give permission to role
	 *
	 * @param Request $request
	 * @param Role $role
	 * @return void
	 */
	public function givePermissionToRole( Request $request, Role $role ) {
		$request->validate( [
			'userPermission' => 'required',
		] );
		if ( $role->syncPermissions( $request->userPermission ) ) {
			return redirect()->back()->with( 'success', 'Permissions added to role' );
		} else {
			return redirect()->back()->with( 'error', 'Unable to add permission to role' );
		}
	}
}
