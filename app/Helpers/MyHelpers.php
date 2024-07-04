<?php

/**
 * Get user permissions as array
 *
 * @return array()
 */
if (  ! function_exists( 'getUserPermissions' ) ) {
	function getUserPermissions() {
		$user = auth()->user();

		$permissions = $user->getAllPermissions();
		foreach ( $permissions as $permission ) {
			$user_permission[] = $permission->name;
		}

		return $user_permission;
	}
}
