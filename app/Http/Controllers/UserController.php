<?php

namespace App\Http\Controllers;

use App\Role;
use App\User;
use App\Agent;
use App\UserDetail;
use App\SessionUser;
use App\Http\Helpers;
use App\Http\RoleService;
use App\Http\UserService;
use App\Http\AgentService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Resources\ApiResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\ClientUser;

class UserController extends Controller
{
    protected $service;
    protected $agentService;
    protected $helper;
    protected $roleService;

    public function __construct(UserService $_service, Helpers $_helper, AgentService $agent_service, RoleService $role_service)
    {
        $this->service = $_service;
        $this->helper = $_helper;
        $this->agentService = $agent_service;
        $this->roleService = $role_service;
    }

	/**
	 * Route: /api/users/{username}/session
	 * Get logged on user session.
	 *
	 * @param string $username
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function getUserSession($username)
	{
		$user = $this->helper->generateUserSession($username);
		return response()->json($user);
	}

	/**
	 * Get user detail entity by id.
	 *
	 * @param $userId
	 *
	 * @return mixed
	 */
	public function getUserDetailByUserId($userId)
    {
    	$result = new ApiResource();
    	return $result
		    ->setData(UserDetail::userId($userId)->first())
		    ->throwApiException()
		    ->setToSuccess()
		    ->getResponse();
    }

	/**
	 * Update user detail sale info.
	 *
	 * @param Request $request
	 * @param $userId
	 * @param $userDetailId
	 *
	 * @return mixed
	 */
	public function updateUserDetailSaleInfo(Request $request, $userId, $userDetailId)
    {
		$result = new ApiResource();

		$result->checkAccessByUser($userId)->mergeInto($result);

	    $detail = UserDetail::userId($userId)->first();

		if(isset($request->saleOneCampaignId))
			$detail->sale_one_campaign_id = $request->saleOneCampaignId;

		if(isset($request->saleOneId))
			$detail->sale_one_id = $request->saleOneId;

		if(isset($request->saleTwoCampaignId))
			$detail->sale_two_campaign_id = $request->saleTwoCampaignId;

		if(isset($request->saleTwoId))
			$detail->sale_two_id = $request->saleTwoId;

		if(isset($request->saleThreeCampaignId))
			$detail->sale_three_campaign_id = $request->saleThreeCampaignId;

		if(isset($request->saleThreeId))
			$detail->sale_three_id = $request->saleThreeId;

		$saved = $detail->save();

		if(!$saved) $result->setToFail();

		$detail = UserDetail::userId($userId)->first();

		return $result
			->setData($detail)
			->throwApiException()
			->getResponse();
    }

	/**
	 * @param Request $request
	 * @param $userId
	 * @param $userDetailId
	 *
	 * @return mixed
	 */
	public function updateUserDetailAgentInfo(Request $request, $userId, $userDetailId)
    {
    	$result = new ApiResource();

    	$result->checkAccessByUser($userId)
	           ->mergeInto($result);

    	$agent = Agent::id($userId)->first();
	    $agent->first_name = $request->firstName;
	    $agent->last_name = $request->lastName;
	    $agent->manager_id = $request->managerId;
	    $agent->is_manager = $request->isManager;
	    $agent->is_active = $request->agentIsActive ? 1 : 0;

    	$data = [
    		'agentId' => $agent->agent_id,
		    'userId' => $agent->user_id,
    		'firstName' => $agent->first_name,
		    'lastName' => $agent->last_name,
		    'managerId' => $agent->manager_id,
		    'isManager' => $agent->is_manager,
		    'username' => $user->username,
		    'userIsActive' => $user->active == 1,
		    'agentIsActive' => $agent->is_active == 1
	    ];

    	$saved = $agent->save() && $user->save();

    	if(!$saved) $result->setToFail();

    	return $result->setData($data)
		    ->throwApiException()
		    ->getResponse();
    }

	/**
	 * Handles saving a new/existing User Detail entity through API and returns the result and newly
	 * saved entity.
	 *
	 * @param Request $r
	 * @param $userId
	 * @param $userDetailId
	 *
	 * @return mixed
	 */
	public function saveUserDetailByUserId(Request $r, $userId, $userDetailId = null)
    {
    	$result = new ApiResource();

//    	$result->checkAccessByUser($userId)
//		    ->mergeInto($result);
//
//    	if($result->hasError)
//    		return $result->throwApiException()->getResponse();

    	$detail = $userDetailId != null
		    ? UserDetail::id($userDetailId)->first()
		    : new UserDetail();

    	if(is_null($detail->user_id))
    		$detail->user_id = $r->userId;
    	if(!is_null($r->street))
    		$detail->street = $r->street;
    	if(!is_null($r->street2))
    		$detail->street2 = $r->street2;
    	if(!is_null($r->city))
    		$detail->city = $r->city;
    	if(!is_null($r->state))
    		$detail->state = $r->state;
    	if(!is_null($r->zip))
    		$detail->zip = $r->zip;
    	if(!is_null($r->ssn))
    		$detail->ssn = $r->ssn;
    	if(!is_null($r->phone))
    		$detail->phone = $r->phone;
    	if(!is_null($r->birthDate))
    		$detail->birthDate = $r->birthDate;
    	if(!is_null($r->bankRouting))
    		$detail->bankRouting = $r->bankRouting;
    	if(!is_null($r->bankAccount))
    		$detail->bankAccount = $r->bankAccount;

		$saved = $detail->save();

		if(!$saved) $result->setToFail();

		return $result
			->setData($detail)
			->throwApiException()
			->getResponse();
    }

    public function saveNewUserAgentEntity(Request $r, $clientId)
    {
    	$result = new ApiResource();

        Validator::make($r->user, [
            'username' => 'required|unique:users',
            'email' => 'required|unique:users',
            'firstName' => 'required',
            'lastName' => 'required'
        ])->validate();

    	$u = $r->user;
    	$a = $r->agent;
    	$d = $r->detail;

		$this->service->saveUser($u, $d, $clientId)
		              ->mergeInto($result);

        $savedUser = (object)$result->getData();

        $role = $this->roleService
            ->saveRole((object)$savedUser, $r->role)
            ->mergeInto($result)
            ->getData();

		if($result->hasError)
			return $result->throwApiException()->getResponse();

		$a['userId'] = $savedUser->id;
		$a['clientId'] = $clientId;

		$this->agentService->saveNewAgentEntity($a)->mergeInto($result);

		if($result->hasError) 
			return $result->throwApiException()->getResponse();

		return $result
			->setData(User::with(['detail', 'agent', 'role'])->userId($savedUser->id)->first())
			->throwApiException()
			->getResponse();
    }

	/**
	 * @param Request $r
	 * @param $userId
	 *
	 * @return mixed
	 */
	public function updateUserInfo(Request $r, $userId)
    {
    	$result = new ApiResource();

	    $result->checkAccessByUser($userId)
	           ->mergeInto($result);

	    $user = User::userId($userId)->first();

		if (!is_null($r->firstName) && $r->firstName != $user->first_name)
			$user->first_name = $r->firstName;
		if (!is_null($r->lastName) && $r->lastName != $user->last_name)
			$user->last_name = $r->lastName;
		if (!is_null($r->email) && $r->email != $user->email)
			$user->email = $r->email;

	    if(!is_null($r->active))
	    	$user->active = $r->active;

	    $saved = $user->save();

	    if(!$saved) $result->setToFail();

	    return $result
		    ->setData($user)
		    ->throwApiException()
		    ->getResponse();
    }

    public function updateUser($userId)
	{
		$result = [];
        $input = request()->all();
        $userInput = $input['user'];
        $user = User::with('sessionUser')->find($userInput['id']);
        $selectedClientId = $userInput['selectedClient']['clientId'];
        
        if($user->first_name != $userInput['firstName'])
            $user->first_name = $userInput['firstName'];
        if($user->last_name != $userInput['lastName'])
            $user->last_name = $userInput['lastName'];
        if($user->email != $userInput['email'])
            $user->email = $userInput['email'];

        if($selectedClientId !== null)
        {
        	if($user->sessionUser === null)
	        {
	        	$sessUser = new SessionUser([
	        		'user_id' => $user->id,
			        'session_client' => $selectedClientId
		        ]);
	        	$user->sessionUser()->save($sessUser);
	        }
	        else
            {
        		$user->sessionUser->update([
        			'session_client' => $selectedClientId
		        ]);
	        }
        }

		// save models
		$user->save();

		$userDto = $this->service->getUserDtoByUser($user->id);
		$result['user'] = $userDto;

		$userDetail = $input['detail'];

		if($userDetail !== null)
		{
			$detail = UserDetail::find($userDetail['userDetailId']);

			if($detail->street != $userDetail['street'])
				$detail->street = $userDetail['street'];
			if($detail->street2 != $userDetail['street2'])
				$detail->street2 = $userDetail['street2'];
			if($detail->city != $userDetail['city'])
				$detail->city = $userDetail['city'];
			if($detail->state != $userDetail['state'])
				$detail->state = $userDetail['state'];
			if($detail->zip != $userDetail['zip'])
				$detail->zip = $userDetail['zip'];
			if($detail->ssn != $userDetail['ssn'])
				$detail->ssn = $userDetail['ssn'];
			if($detail->phone != $userDetail['phone'])
				$detail->phone = $userDetail['phone'];
			if($detail->birthDate != $userDetail['birthDate'])
				$detail->birthDate = $userDetail['birthDate'];
			if($detail->bankRouting != $userDetail['bankRouting'])
				$detail->bankRouting = $userDetail['bankRouting'];
			if($detail->bankAccount != $userDetail['bankAccount'])
				$detail->bankAccount = $userDetail['bankAccount'];
			if($detail->sale_one_id != $userDetail['saleOneId'])
				$detail->sale_one_id = $userDetail['saleOneId'];
			if($detail->sale_one_campaign_id != $userDetail['saleOneCampaignId'])
				$detail->sale_one_campaign_id = $userDetail['saleOneCampaignId'];
			if($detail->sale_two_id != $userDetail['saleTwoId'])
				$detail->sale_two_id = $userDetail['saleTwoId'];
			if($detail->sale_two_campaign_id != $userDetail['saleTwoCampaignId'])
				$detail->sale_two_campaign_id = $userDetail['saleTwoCampaignId'];
			if($detail->sale_three_id != $userDetail['saleThreeId'])
				$detail->sale_three_id = $userDetail['saleThreeId'];
			if($detail->sale_three_campaign_id != $userDetail['saleThreeCampaignId'])
				$detail->sale_three_campaign_id = $userDetail['saleThreeCampaignId'];

			$detail->save();
			$result['detail'] = $this->helper->normalizeLaravelObject($detail->toArray());
		}

		return response()->json($result);
	}


	/**
	 * Get all users
	 *
	 * @param bool $activeOnly
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function getUsers($activeOnly = true)
	{
		$users = User::isActiveByBool($activeOnly)->get();
		return response()->json($this->helper->normalizeLaravelObject($users->toArray()));
	}

    
    public function updateUserAgentDetailEntities(Request $request, $clientId, $userId)
    {
        $result = new ApiResource();

        $this->service
            ->updateUserAgentDetail($request, $clientId, $userId)
            ->mergeInto($result);
        
        return $result
            ->throwApiException()
            ->getResponse();
    }

    public function checkUsernameAvailability(Request $request)
    {
        $result = new ApiResource();

        $existing = User::username($request->u)->first();

        return $result
            ->setData(is_null($existing))
            ->throwApiException()
            ->getResponse();
    }

    public function saveUserRole(Request $request, $userId)
    {
        $result = new ApiResource();

        $role = Role::userId($userId)->first();

        $isNew = is_null($role);

        if($isNew)
        {
            $role = new Role;
            $role->user_id = $userId;
            $role->role = $request['role'];
        }
        else 
        {
            $role->role = $request['role'];
            $role->isSalesAdmin = $request['isSalesAdmin'];
        }             

        $saved = $role->save();   

        $role = Role::userId($userId)->first();

        if(!$saved)
            return $result->setToFail()
                ->throwApiException()
                ->getResponse();
        
        return $result
            ->setData($role)
            ->throwApiException()
            ->getResponse();
    }

    public function saveNewSessionUser(Request $request)
    {
        $result = new ApiResource();

        $su = new SessionUser;
        $su->user_id = $request->userId;
        $su->session_client = $request->sessionClient;
        $res = $su->save();

        if(!$res) 
            return $result
                ->setToFail()
                ->throwApiException('Failed to save session, please reload the page.', Response::HTTP_INTERNAL_SERVER_ERROR)
                ->getResponse();

        $su = SessionUser::bySessionUserId($su->id)->first();

        return $result
            ->setData($su)
            ->throwApiException('Failed to save session, please reload the page.', Response::HTTP_INTERNAL_SERVER_ERROR)
            ->getResponse();
    }

    public function changeClient($clientId)
    {
        $result = new ApiResource();

        // check if user is allowed to change to client
        $hasClientAccess = ClientUser::byClient($clientId)->exists();

        if (!$hasClientAccess) {
            return $result->setToFail('Does not have access to the selected client.')
                ->throwApiException()
                ->getResponse();
        }

        $u = SessionUser::where('user_id', Auth::user()->id)->first();

        $u->session_client = $clientId;

        $res = $u->save();

        if(!$res)
            return $result->setToFail()->throwApiException()->getResponse();

        return $result->setData(true)
            ->throwApiException()
            ->getResponse();
    }

}
