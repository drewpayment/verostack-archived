<?php

namespace App\Http\Services;

use App\DncContact;
use App\Http\Resources\ApiResource;

class DncContactService 
{

	/**
	 * Undocumented function
	 *
	 * @param Illuminate\Http\Request $model
	 * @return App\Http\Resources\ApiResource
	 */
	public function saveNewDncContact($model) 
	{
		$result = new ApiResource();

		$c = new DncContact([
			'dnc_contact_id' => $model->dncContactId,
			'client_id' => $model->clientId,
			'first_name' => $model->firstName,
			'last_name' => $model->lastName,
			'description' => $model->description,
			'address' => $model->address,
			'address_cont' => $model->addressCont,
			'city' => $model->city,
			'state' => $model->state,
			'zip' => $model->zip,
			'note' => $model->note
		]);

		$saved = $c->save();

		if (!$saved) return $result->setToFail();

		return $result->setData($c);
	}

}