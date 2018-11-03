<?php

namespace App\Http;

class ApiService 
{

    public function generateUserSession($username)
    {
        $user = User::username($username)->first();
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
				'taxId' => $client->taxid,
				'active' => $client->active,
				'modifiedBy' => $client->modified_by,
				'deletedAt' => $client->deleted_at,
				'createdAt' => $client->created_at,
				'updatedAt' => $client->updated_at
			];
        }
        
        $c = $user->sessionUser->client;
        $selectedClient = [
            'clientId' => $c->client_id,
            'name' => $c->name,
            'street' => $c->street,
            'city' => $c->city,
            'state' => $c->state,
            'zip' => $c->zip,
            'phone' => $c->phone,
            'taxId' => $c->taxid,
            'active' => ($c->active == 1),
            'modifiedBy' => $c->modified_by,
            'deletedAt' => $c->deleted_at,
            'createdAt' => $c->created_at,
            'updatedAt' => $c->updated_at
        ];

        $u = $user->sessionUser;
        $sessionUser = [
            'id' => $u->id,
            'userId' => $u->user_id,
            'sessionClient' => $u->session_client,
            'createdAt' => $u->created_at,
            'updatedAt' => $u->updated_at
        ];

		$userDto = [
			'id' => $user->id,
			'firstName' => $user->first_name,
			'lastName' => $user->last_name,
			'username' => $user->username,
			'email' => $user->email,
			'session' => $sessionUser,
			'selectedClient' => $selectedClient,
			'role' => $user->role,
			'createdAt' => $user->created_at,
			'updatedAt' => $user->updated_at,
			'clients' => $clientDtoList
        ];
        
        return $userDto;
    }

}