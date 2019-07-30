<?php

namespace App\Http\Controllers;

use App\DncContact;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use App\Http\Resources\ApiResource;
use function GuzzleHttp\json_decode;
use Illuminate\Support\Facades\Auth;
use App\Http\Services\DncContactService;

class DncContactController extends Controller
{
    protected $service;

    public function __construct(DncContactService $_service)
    {
        $this->service = $_service;
    }
    
    /**
     * ~/api/dnc-contacts
     * GET
     *
     * @return DncContact[]
     */
    public function getDncContacts(Request $request)
    {
        $result = new ApiResource();
        $zipCode = $request->query('zip');

        $user = Auth::user();
        $user->load('sessionUser');
        $clientId = $user->sessionUser->session_client;
        // $contacts = new ApiResource(DncContact::byClient($clientId)->byZip($zipCode)->get());

        $query = DncContact::byClient($clientId);

        if ($zipCode == null && (strpos($request->userAgent(), 'dart') == false)) {
            $result->setData($query->get());
        } else {
            $result->setData($query->byZip($zipCode)->get());
        }

        return $result
            ->throwApiException()
            ->getResponse();
    }

    /**
     * Contacts Google Cloud Platform API and resolves Geolocation data based on address.
     * 
     * https://developers.google.com/maps/documentation/geocoding/intro#geocoding
     * 
     * example return object: 
     * {
     *     "lat" : 37.4224764,
     *     "lng" : -122.0842499
     * }
     *
     * @param $contact
     * @return ApiResource
     */
    protected function getGeolocation($contact)
    {
        $result = new ApiResource();

        $street = str_replace(' ', '+', $contact['street']);
        $city = str_replace(' ', '+', $contact['city']);
        $state = $contact['state'];
        $apiKey = config('services.google.api_key');
        $url = 'https://maps.googleapis.com/maps/api/geocode/json?address='
            . $street . ',+' . $city . ',+' . $state . '&key=' . $apiKey;

        $http = new Client();
        $response = $http->request('GET', $url);
        if ($response->getStatusCode() > 299 || $response->getStatusCode() < 200) {
            // error handling?
            return $result->setToFail(400);
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

    /**
     * ~/api/dnc-contacts
     * POST
     *
     * @param Request $request
     * @return DncContact
     */
    public function saveNewDncContact(Request $request)
    {
        $result = new ApiResource();
        $user = ApiResource::getUserInfo();

        $result->checkAccessByClient($user->sessionUser->session_client)->mergeInto($result);

        if ($result->hasError) return $result->throwApiException()->getResponse();

        $this->service->saveNewDncContact($request)->mergeInto($result);

        return $result->throwApiException()->getResponse();
    }

    /**
     * ~/api/dnc-contacts/{dncContactId}
     * POST
     *
     * @param Request $request
     * @param [type] $dncContactId
     * @return void
     */
    public function updateDncContact(Request $request, $dncContactId)
    {
        $result = new ApiResource();
        $user = ApiResource::getUserInfo();

        $result->checkAccessByClient($user->sessionUser->session_client)->mergeInto($result);

        if ($result->hasError)
            return $result->throwApiException()->getResponse();

        $dto = new DncContact([
            'dnc_contact_id' => $dncContactId,
            'client_id' => $user->clientId,
            'first_name' => $request->firstName,
            'last_name' => $request->lastName,
            'description' => $request->description,
            'address' => $request->address,
            'address_cont' => $request->addressCont,
            'city' => $request->city,
            'state' => $request->state,
            'zip' => $request->zip,
            'note' => $request->note
        ]);

        $this->service->updateDncContact($dto)->mergeInto($result);

        return $result->throwApiException()->getResponse();
    }

    /**
     * ~/api/dnc-contacts
     * DELETE
     *
     * @param Request $request
     * @return void
     */
    public function deleteDncContacts(Request $request) 
    {
        $result = new ApiResource();
        $user = ApiResource::getUserInfo();

        $rawIds = $request->dncContactIds;
        $ids = explode(',', $rawIds);

        $result->checkAccessByClient($user->sessionUser->session_client)->mergeInto($result);

        if ($result->hasError) return $result->throwApiException()->getResponse();

        $this->service->deleteDncContacts($ids)->mergeInto($result);

        return $result->throwApiException()->getResponse();
    }

}
