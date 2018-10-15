<?php

namespace App\Http;

use App\Client;
use App\Http\Resources\ApiResource;
use App\User;
use App\UserDetail;
use ReflectionException;

class UserService 
{
	protected $helper;

	public function __construct(Helpers $_helper) {
		$this->helper = $_helper;
	}


	public function getUserDtoByUser($userId)
    {
        $user = User::find($userId);
        $clients = $user->clients;
		$clientDtoList = [];

		foreach($clients as $client)
		{
			$clientDtoList[] = [
				'clientId' => $client->client_id,
				'name' => $client->name,
				'street' => $client->street,
				'city' => $client->city,
				'state' => $client->state,
				'zip' => $client->zip,
				'phone' => $client->phone,
				'taxid' => $client->taxid,
				'active' => $client->active,
				'modifiedBy' => $client->modified_by,
				'deletedAt' => $client->deleted_at,
				'createdAt' => $client->created_at,
				'updatedAt' => $client->updated_at
			];
		}

		$userDto = [
			'id' => $user->id,
			'firstName' => $user->first_name,
			'lastName' => $user->last_name,
			'username' => $user->username,
			'email' => $user->email,
			'session' => $this->helper->normalizeLaravelObject($user->sessionUser->toArray()),
			'selectedClient' => $this->helper->normalizeLaravelObject($user->sessionUser->client->toArray()),
			'role' => $this->helper->normalizeLaravelObject($user->role->toArray()),
			'createdAt' => $user->created_at,
			'updatedAt' => $user->updated_at,
			'clients' => $clientDtoList
        ];

		$userDto['selectedClient']['options'] = $this->helper->normalizeLaravelObject($user->sessionUser->client->clientOption->toArray());
        
        return $userDto;
    }

	/**
	 * Used to create a totally new user w/user detail entities.
	 *
	 * @param $user
	 * @param $detail
	 * @param $clientId
	 *
	 * @return ApiResource|mixed
	 */
	public function saveUser($user, $detail, $clientId)
    {
    	$result = new ApiResource();

    	$client = Client::clientId($clientId)->first();

    	$u = new User();
    	$u->first_name = $user['firstName'];
    	$u->last_name = $user['lastName'];
    	$u->username = $user['username'];
    	$u->email = $user['email'];
    	$u->password = bcrypt($user['password']);
    	$u->active = 1;

    	$success = $u->save();

    	if(!$success)
    		return $result->setToFail()->getResponse();

    	$u->clients()->attach($client);

	    $success = $u->detail()->save($this->prepareUserDetail($detail, $u->id));

	    $result->setData($u);

	    if(!$success || $result->hasError)
	    	return $result->setToFail()->getResponse();

	    return $result;
    }

    private function prepareUserDetail($detail, $userId)
    {
    	$d = new UserDetail();
    	$d->user_id = $userId;
    	$d->street = $detail['street'];
    	$d->street2 = $detail['street2'];
    	$d->city = $detail['city'];
    	$d->state = $detail['state'];
		$d->zip = $detail['zip'];
		$d->ssn = $detail['ssn'];
		$d->phone = $detail['phone'];
		$d->birthDate = $detail['birthDate'];
		$d->bankAccount = $detail['bankAccount'];
		$d->bankRouting = $detail['bankRouting'];
		return $d;
    }

	/**
	 * Checks security and then saves our User Detail entity. This is publicly exposed and relies
	 * on the private method for actually saving.
	 *
	 * @param $detail
	 * @param $userId
	 *
	 * @return ApiResource
	 */
	public function saveUserDetail($detail, $userId)
    {
    	$result = new ApiResource();

    	$this->helper
		    ->checkAccessById(new ResourceType(ResourceType::User), $userId)
		    ->mergeInto($result);

    	if($result->hasError) return $result;

    	$this->registerUserDetail($detail)->mergeInto($result);

    	return $result;
    }

	/**
	 * Takes a User Detail entity and saves it as new or updates existing if applicable
	 * in the database, returns our api resource.
	 *
	 * @param $detail
	 *
	 * @return ApiResource
	 */
	private function registerUserDetail($detail)
    {
    	$result = new ApiResource();

    	$d = new UserDetail();
    	if($detail->userDetailId > 0)
    		$d->user_detail_id = $detail->userDetailId;
    	$d->user_id = $detail->userId;
    	$d->street = $detail->street;
    	$d->stree2 = $detail->street2;
    	$d->city = $detail->city;
    	$d->state = $detail->state;
    	$d->zip = $detail->zip;
    	$d->ssn = $detail->ssn;
    	$d->phone = $detail->phone;
    	$d->birth_date = $detail->birthDate;
    	$d->bank_routing = $detail->bankRouting;
		$d->bank_account = $detail->bankAccount;
		$d->sale_one_campaign_id = $detail->saleOneCampaignId;
		$d->sale_one_id = $detail->saleOneId;
		$d->sale_two_campaign_id = $detail->saleTwoCampaignId;
		$d->sale_two_id = $detail->saleTwoId;
		$d->sale_three_campaign_id = $detail->saleThreeCampaignId;
		$d->sale_three_id = $detail->saleThreeId;

		$saved = $d->save();

		if(!$saved) return $result->setToFail();

		return $result->setData($d);
    }

    /**
     * Update a user and its relationships. 
     * 
     * @param Request $request
     * @param int $clientId
     * @param int $userId
     * @return \App\Http\Resources\ApiResource
     */
    public function updateUserAgentDetail($request, $clientId, $userId)
    {
        $result = new ApiResource();

        $result->checkAccessByClient($clientId, $userId)
            ->mergeInto($result);

        if($result->hasError)
            return $result->throwApiException()->getResponse();

        /** new user (nothing uses this yet) */
        if($request->id == -1 || is_null($request->id))
            $user = new User;
        else /** updating user */
            $user = User::userId($request->id)->first();

        $user->first_name = $request->firstName;
        $user->last_name = $request->lastName;
        $user->email = $request->email;
        $user->active = $request->active; 

        /** Cast to an object for simplicity's sake */
        $request->detail = (object) $request->detail;
        if(is_null($user->detail))
        {
            $detail = new UserDetail;
            $detail->user_id = $user->id;
        }
        else
            $detail = $user->detail;

        $detail->street = $request->detail->street;
        $detail->street2 = $request->detail->street2;
        $detail->city = $request->detail->city;
        $detail->state = $request->detail->state;
        $detail->zip = $request->detail->zip;
        $detail->ssn = $request->detail->ssn;
        $detail->phone = $request->detail->phone;
        $detail->birthDate = $request->detail->birthDate;
        $detail->bankRouting = $request->detail->bankRouting;
        $detail->bankAccount = $request->detail->bankAccount;
        $user->detail()->save($detail);

        /** Cast to an object for simplicity's sake */
        $request->agent = (object) $request->agent;
        if(is_null($user->agent))
        {
            $agent = new Agent;
            $agent->user_id = $user->id;
        }
        else 
            $agent = $user->agent;
        
        $agent->first_name = $user->first_name;
        $agent->last_name = $user->last_name;
        $agent->manager_id = $request->agent->managerId;
        $agent->is_manager = $request->agent->isManager;
        $agent->is_active = $request->agent->isActive;
        $user->agent()->save($agent);

        $userSaved = $user->save();

        if(!$userSaved)
            return $result->setToFail();
        else 
            return $result->setData($user);
    }
}