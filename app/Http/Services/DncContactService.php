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
		$long = '';

		if (!array_key_exists($model['lat'], $model) || !array_key_exists($model['long'], $model)) {
			$geoResult = $this->getGeolocation($model->street, $model->city, $model->state);

			if (!$geoResult->hasError) {
				$geo = $geoResult->getData();

				Telescope::recordLog(IncomingEntry([
					'geo' => json_encode($geo)
				]));

				$lat = $geo['lat'];
				$long = $geo['long'];
			} else {
				return $result->setToFail();
			}
		} else {
			$lat = $model->lat;
			$long = $model->long;
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
			'long' => $long
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

        //TODO: Need try/catch or some sort of error handling... Google returns "over daily limit" so 
        // something isn't setup totally right, but the object that came back was unexpected and we need a way to 
        // check the status when the API returns an object... 
		$parsed = json_decode($response->getBody());

        if (count($parsed->results) > 0) {
            $geo = $parsed->results[0]->geometry->location;
            // $geo = $parsed['results'][0]['geometry']['location'];
            $result->setData($geo, false);
        } 
        
        return $result;
	}

}