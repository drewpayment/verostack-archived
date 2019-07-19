<?php

namespace App\Http\Services;

use App\Contact;
use App\DncContact;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\ApiResource;
use Illuminate\Console\Command;
use Laravel\Telescope\Telescope;
use Laravel\Telescope\IncomingEntry;
use function GuzzleHttp\json_encode;

class DncContactService 
{
	protected $clientService;

	public function __construct(ClientService $_clientService)
	{
		$this->clientService = $_clientService;
	}

	public function updateDncContact($dto) 
	{
		$result = new ApiResource();

		$model = DncContact::find($dto->dnc_contact_id);

		if ($model->first_name != $dto->first_name)
			$model->first_name = $dto->first_name;
		if ($model->last_name != $dto->last_name)
			$model->last_name = $dto->last_name;
		if ($model->description != $dto->description)
			$model->description = $dto->description;
		if ($model->address != $dto->address)
			$model->address = $dto->address;
		if ($model->address_cont != $dto->address_cont)
			$model->address_cont = $dto->address_cont;
		if ($model->city != $dto->city)
			$model->city = $dto->city;
		if ($model->state != $dto->state)
			$model->state = $dto->state;
		if ($model->zip != $dto->zip)
			$model->zip = $dto->zip;
		if ($model->note != $dto->note)
			$model->note = $dto->note;

		$saved = $model->save();

		if (!$saved) {
			return $result->setToFail();
		}

		return $result->setData($model);
	}

	/**
	 * Undocumented function
	 *
	 * @param $model
	 * @return App\Http\Resources\ApiResource
	 */
	public function saveNewDncContact($model) 
	{
		$result = new ApiResource();
		$lat = '';
		$lng = '';
		$geo = null;

		if (!array_key_exists($model['lat'], $model) || !array_key_exists($model['long'], $model)) {
			$geoResult = $this->getGeolocation($model->address, $model->city, $model->state);

			if (!$geoResult->hasError && $geoResult->hasData()) {
				$geo = $geoResult->getData();
				$lat = $geo->results[0]->geometry->location->lat;
				$lng = $geo->results[0]->geometry->location->lng;
			} else {
				return $result->setToFail();
			}
		} else {
			$lat = $model->lat;
			$lng = $model->long;
		}

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
			'note' => $model->note,
			'lat' => $lat,
			'long' => $lng,
			'geocode' => json_encode($geo)
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

	/**
	 * Checks if the user's selected client has enabled the mobile feature to use existing contacts
	 * from the normal contact db as dnc contacts. 
	 *
	 * @param int $clientId
	 * @return ApiResource
	 */
	public function getExistingContacts($clientId)
	{
		$result = new ApiResource();

		$this->clientService->getClientOptions($clientId)->mergeInto($result);

		$options = $result->getData();
		if (is_null($options) || !$options['useExistingContacts']) {
			return $result->setToFail();
		}

		$contacts = Contact::all();

		$result->setData($contacts);

		return $result;
	}

	/**
	 * Get Google Maps API geolocation data with GuzzleHttp.
	 *
	 * @param string $street
	 * @param string $city
	 * @param string $state
	 * @return App\Http\Resources\ApiResource
	 */
	public function getGeolocation($street, $city, $state) 
	{
		$result = new ApiResource();

        $street = str_replace(' ', '+', $street);
        $city = str_replace(' ', '+', $city);
        $state = $state;
        $apiKey = config('services.google.api_key');
        $url = 'https://maps.googleapis.com/maps/api/geocode/json?address='
            . $street . ',+' . $city . ',+' . $state . '&key=' . $apiKey;

        $http = new Client();
        $response = $http->request('GET', $url);
        if ($response->getStatusCode() > 299 || $response->getStatusCode() < 200) {
			// error handling?
			$result->setData($response->getBody());
            return $result;
        } 

		$parsed = json_decode($response->getBody());

        if (count($parsed->results) > 0) {
            $result->setData($parsed, false);
        } 
        
        return $result;
	}

}