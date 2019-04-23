<?php

namespace App\Http\Services;

use App\DncContact;
use Illuminate\Support\Facades\DB;
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

	/**
	 * Delete a single or list or DncContact entities from system.
	 *
	 * @param int[] $dncContactIds
	 * @return App\Http\Resources\ApiResource
	 */
	public function deleteDncContacts($dncContactIds)
	{
		$result = new ApiResource();

		DB::beginTransaction();
        try {
            $deletedDncContacts = DncContact::byDncContactList($dncContactIds)->delete();
            DB::commit();

            $result->setData($deletedDncContacts);
        } catch (\Exception $e) {
            DB::rollBack();

            $result->setToFail();
		}
		
		return $result;
	}

}