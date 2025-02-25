<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserCrudResource;
use App\Models\User;
use Spatie\Permission\Models\Role;

class UserController extends Controller {
	/**
	 * Display a listing of the resource.
	 */
	public function index() {
		$query = User::query();

		$sortField     = request( 'sort_field', 'created_at' );
		$sortDirection = request( 'sort_direction', 'desc' );

		if ( request( 'name' ) ) {
			$query->where( 'name', 'like', '%' . request( 'name' ) . '%' );
		}
		if ( request( 'email' ) ) {
			$query->where( 'email', 'like', '%' . request( 'email' ) . '%' );
		}

		$users = $query->orderBy( $sortField, $sortDirection )->paginate( 10 )->onEachSide( 1 );

		return inertia( 'User/Index', [
			'users'       => UserCrudResource::collection( $users ),
			'queryParams' => request()->query() ?: null,
			'success'     => session( 'success' ),
		] );
	}

	/**
	 * Show the form for creating a new resource.
	 */
	public function create() {
		$roles = Role::get();

		return inertia( 'User/Create', [
			'roles' => $roles,
		] );
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store( StoreUserRequest $request ) {
		$data                      = $request->validated();
		$data['password']          = bcrypt( $data['password'] );
		$data['email_verified_at'] = time();

		$user = User::create( $data );

		$user->syncRoles( $request->user_role );

		return to_route( "user.index" )->with( 'success', 'User has been successfully created.' );
	}

	/**
	 * Display the specified resource.
	 */
	public function show( User $user ) {
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit( User $user ) {
		$roles = Role::get();

		return inertia( 'User/Edit', [
			'user'  => new UserCrudResource( $user ),
			'roles' => $roles,
		] );
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update( UpdateUserRequest $request, User $user ) {
		$data     = $request->validated();
		$password = $data['password'];
		if ( $password ) {
			$data['password'] = bcrypt( $data['password'] );
		} else {
			unset( $data['password'] );
		}

		$user->update( $data );

		$user->syncRoles( $request->user_role );

		return to_route( "user.index" )->with( 'success', 'User has been successfully updated.' );
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy( User $user ) {
		$name = $user->name;
		$user->delete();

		return to_route( 'user.index' )->with( 'success', "User \"$name\" has been successfully deleted." );
	}
}
