<?php

namespace App\Http\Services;

use App\Http\Resources\ApiResource;
use App\ClientOptions;

class ClientService 
{

	/**
	 * Get client options by client.
	 *
	 * @param int $clientId
	 * @return ApiResource
	 */
	public function getClientOptions($clientId)
	{
		$result = new ApiResource();

		$options = ClientOptions::clientId($clientId)->first();

		$result->setData($options);

		return $result;
	}

}