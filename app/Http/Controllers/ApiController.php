<?php

namespace App\Http\Controllers;

use App\Client;
use App\Http\Helpers;
use App\Http\Resources\ApiResource;
use App\Http\UserService;
use App\Role;
use App\SessionUser;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ApiController extends Controller
{
	protected $helper;
	protected $service;

	public function __construct(Helpers $_helpers, UserService $_service) {
		$this->helper  = $_helpers;
		$this->service = $_service;
	}

	/**
	 * Route: /api/users/{username}
	 * Gets logged on user information.
	 *
	 * @param string $username
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function getUserInfo($username)
	{
		$user = User::username($username)->first();
		$user = $this->service->getUserDtoByUser($user->id);
		return response()->json($user);
	}


	/**
	 * Route: /api/users/{userId}
	 *
	 * @param $id
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function getUserById($id)
	{
		$result = new ApiResource();
		return $result
			->setData(User::userId($id)->first())
			->throwApiException()
			->getResponse();
	}


	/**
	 * Get a list of users via relationship with client.
	 *
	 * @param $clientId
	 *
	 * @return mixed
	 */
	public function getUsersByClient($clientId)
	{
		$users = Client::find($clientId)->users;

		$users = $this->helper->normalizeLaravelObject((array)$users);

		return response()->json($users);
	}

	/**
	 * Registers a new user by an admin. In order to make a call to this end point,
	 * the user must be a company or system admin user. After the user has been created,
	 * they're automatically assigned a role of "user". The admin needs to manually go
	 * in and change their type. This avoids situations where an admin could accidentally elevate
	 * a user's role status in the system.
	 *
	 * @param Request $request
	 *
	 * @return mixed
	 */
	public function registerNewUser(Request $request)
	{
		$firstName = $request->user['firstName'];
		$lastName = $request->user['lastName'];
		$username = $request->user['username'];
		$email = $request->user['email'];
		$client = Client::find($request->clientId);

		$user = User::create([
			'first_name' => $firstName,
			'last_name' => $lastName,
			'email' => $email,
			'username' => $username,
			'password' => bcrypt($this->helper->random_str(8))
		]);

		// if user creation is successful, we add their role record
		if($user->id > 0)
		{
			Role::create([
				'user_id' => $user->id,
				'role' => 1
			]);

			$client->users()->attach($user->id);
		}

		$user = $this->helper->normalizeLaravelObject((array)$user);

		return $user;
	}

	/**
	 * Get users by a logged in user and the user's role
	 *
	 * @param $userId
	 * @param $roleId
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function getUsersByUserRole($userId, $roleId)
	{
		$approved = DB::table('roles_type')->select('id', 'type', 'active')
			->where([
				['active', '=', 1],
				['id', '=', $roleId]
			])
			->first();

		if(is_null($approved)) return response()->json(false);

		if ($approved->id == 7)
		{
			$users = User::active()->get();
		}
		else if ($approved->id == 6)
		{
			$users = User::active()->get();
		}
		else
		{
			$users = [];
		}

		$users = $this->helper->normalizeLaravelObject((array)$users);

		return response()->json($users);
	}


	/**
	 * Set the user's selected client for their current session.
	 *
	 * @param $userId
	 * @param $clientId
	 *
	 * @return \Illuminate\Http\JsonResponse
	 * @return User::class
	 */
	public function setSelectedClient($userId, $clientId)
	{
		$user = User::find($userId);

		$user->sessionUser->update([
			'session_client' => $clientId
		]);

		$user = User::with('sessionUser')->find($userId);
		$user = $this->helper->normalizeLaravelObject($user->toArray());

		return response()->json($user);
	}

	/**
	 * Retrieve all active user roles from the database.
	 */
	public function getUserRoles()
	{
		$roles = DB::table('roles_type')->where('active', '=', 1)->get();
		foreach($roles as $i => $r)
		{
			$r->active = ($r->active == 1) ? true : false;
		}
		$roles = $this->helper->normalizeLaravelObject((array)$roles);

		return response()->json($roles);
	}


	public function getUserRolesAll()
	{
		$roles = Role::all();
		$roles = $this->helper->normalizeLaravelObject((array)$roles);

		return response()->json($roles);
	}


	public function getUserRolesInactive()
	{
		$roles = Role::inactiveOnly()->get();
		$roles = $this->helper->normalizeLaravelObject((array)$roles);
		return response()->json($roles);
	}

}
