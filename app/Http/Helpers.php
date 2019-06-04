<?php

namespace App\Http;


use App\Http\Resources\ApiResource;
use App\Role;
use App\User;

class ResourceType extends Enum {
	const Client = "1";
	const User = "2";
}

class Helpers
{

	public function registerSystemAdminsClients($client)
	{
		$admins = User::all();

		foreach($admins as $a)
		{
			$a->attach($client);
		}
	}

	/**
	 * Utility to update laravel models to conventional JS object property naming. In order
	 * to convert a Laravel Collection or Eloquent Model, you must utilize the ToArray() method
	 * that is provided by Laravel. This should typically only be utilized as the last step
	 * before return the object back to the frontend via the api.
	 *
	 * @param array $input
	 *
	 * @return array
	 */
	public function normalizeLaravelObject(array $input)
	{
		$return = array();
		foreach($input as $key => $value)
		{
			if(is_object($value))
			{
				$value = $this->normalizeLaravelObject((array)$value);
			}
			else if (is_array($value))
			{
				$value = $this->normalizeLaravelObject($value);
			}

			$result = '';
			$newKeyArr = explode('_', $key);
			foreach($newKeyArr as $idx => $v)
			{
				if($idx == 0)
				{
					$result .= $v;
				}
				else
				{
					$result .= ucfirst($v);
				}
			}

			if(strlen($result) > 0) $return[$result] = $value;
		}
		return $return;
	}

	/**
	 * Generates random string for use with generating random passwords.
	 *
	 * @param $length
	 * @param string $keyspace
	 *
	 * @return string
	 */
	public function random_str($length, $keyspace = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
	{
		$str = '';
		$max = mb_strlen($keyspace, '8bit') - 1;
		for($i = 0; $i < $length; ++$i)
		{
			$str .= $keyspace[random_int(0, $max)];
		}
		return $str;
	}

	/**
	 * Generates user session. 
	 *
	 * @param string $username
	 * @return App\User
	 */
	public function generateUserSession($username)
    {
        $user = User::with(['clients', 'detail', 'role', 'sessionUser'])
            ->username($username)
            ->first();

        if($user->role->role < 6) {
            $user->load('agent');
        }

        if(!is_null($user->sessionUser))
        {
            $c = $user->sessionUser->client;
            $selectedClient = [
                'clientId' => $c->client_id,
                'name' => $c->name,
                'street' => $c->street,
                'city' => $c->city,
                'state' => $c->state,
                'zip' => $c->zip,
                'phone' => $c->phone,
                'active' => ($c->active == 1),
                'options' => $this->normalizeLaravelObject($user->sessionUser->client->clientOption->toArray()),
                'modifiedBy' => $c->modified_by,
                'deletedAt' => $c->deleted_at,
                'createdAt' => $c->created_at,
                'updatedAt' => $c->updated_at
            ];
        }
        else 
        {
            $client = (object)$user->clients->all()[0];
            $selectedClient = [
                'clientId' => $client->client_id,
                'name' => $client->name,
                'street' => $client->street,
                'city' => $client->city,
                'state' => $client->state,
                'zip' => $client->zip,
                'phone' => $client->phone,
                'active' => ($client->active == 1),
                'options' => null
            ];
        }

        $user['selectedClient'] = $selectedClient;

        $user = $this->normalizeLaravelObject($user->toArray());

        return $user;
    }

	/**
	 * We need to check and make sure that the user has rights to be accessing the particular resource
	 * that they're attempting to view/add/edit. In order to do so, we use this utility that checks by the
	 * ResourceType that is passed into the fn and checks if the user is allowed to do what they're doing.
	 *
	 * @param ResourceType $resourceType
	 * @param $userId
	 * @param $clientId
	 *
	 * @return ApiResource
	 */
	public function checkAccessById(ResourceType $resourceType, $userId, $clientId = null)
    {
    	$authorized = false;
    	$result = new ApiResource();
    	$user = User::userId($userId)->first();

    	// if we don't find an user, let's set to fail and bail immediately
    	if($user == null) return $result->setToFail();

		if($resourceType == ResourceType::Client)
		{
			$clients = $user->clients;
			foreach($clients as $c)
			{
				$authorized = $clientId == $c->client_id;
			}

			if($authorized)
				$result->setToSuccess();
			else
				$result->setToFail();
		}
		else if($resourceType == ResourceType::User)
		{
			$authorized = $userId == $user->id;
			if($authorized)
				$result->setToSuccess();
			else
				$result->setToFail();
		}

		return $result;
    }

}