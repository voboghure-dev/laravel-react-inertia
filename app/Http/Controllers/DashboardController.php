<?php
namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;

class DashboardController extends Controller {
	public function index() {
		$user = auth()->user();

		$tasks             = Task::query()->get();
		$totalPendingTasks = $tasks->where( 'status', 'pending' )->count();
		$myPendingTasks    = $tasks->where( 'status', 'pending' )->where( 'assigned_user_id', $user->id )->count();

		$totalInProgressTasks = $tasks->where( 'status', 'in_progress' )->count();
		$myInProgressTasks    = $tasks->where( 'status', 'in_progress' )->where( 'assigned_user_id', $user->id )->count();

		$totalCompletedTasks = $tasks->where( 'status', 'completed' )->count();
		$myCompletedTasks    = $tasks->where( 'status', 'completed' )->where( 'assigned_user_id', $user->id )->count();

		$latestTasks = Task::query()->whereIn( 'status', ['pending', 'in_progress'] )->limit( 10 )->get();
		$latestTasks = TaskResource::collection( $latestTasks );

		return inertia( 'Dashboard', [
			'totalPendingTasks'    => $totalPendingTasks,
			'myPendingTasks'       => $myPendingTasks,
			'totalInProgressTasks' => $totalInProgressTasks,
			'myInProgressTasks'    => $myInProgressTasks,
			'totalCompletedTasks'  => $totalCompletedTasks,
			'myCompletedTasks'     => $myCompletedTasks,
			'latestTasks'          => $latestTasks,
		] );
	}
}
