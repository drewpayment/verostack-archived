<?php

namespace App\Http\Controllers;

use App\DncContact;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use App\Http\Resources\ApiResource;
use function GuzzleHttp\json_decode;
use Illuminate\Support\Facades\Auth;
use App\Http\Services\DncContactService;
use Google\Auth\HttpHandler\Guzzle6HttpHandler;

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
        $uid = $request->fbid;
        $existingContactsResult = new ApiResource();

        if ($uid != null) {
            $auth = app()->firebase->getAuth();
            $fbUser = $auth->getUser($uid);
            $user = ApiResource::getUserInfoByFirebase($fbUser->email);

            $contactsResult = $this->service->getExistingContacts($user->sessionUser->selectedClient);

            if ($contactsResult->hasData()) {
                $existingContacts = collect(null);
                $temp = $contactsResult->getData();

                foreach($temp as $c) 
                {
                    $geo = $this->getGeolocation($c);

                    if ($geo->hasError) {
                        $lat = '';
                        $lng = '';
                    } else {
                        $lat = $geo->getData()['lat'];
                        $lng = $geo->getData()['lng'];
                    }

                    $transformed = new DncContact([
                        'client_id' => $c->client_id,
                        'first_name' => $c->first_name,
                        'last_name' => $c->last_name,
                        'address' => $c->street,
                        'address_cont' => $c->street2,
                        'city' => $c->city,
                        'state' => $c->state,
                        'zip' => $c->zip,
                        'lat' => $lat,
                        'long' => $lng
                    ]);

                    $existingContacts->push($transformed);
                }

                $existingContactsResult->setData($existingContacts);
            }
        } else {
            $user = Auth::user();
            $user->load('sessionUser');
        }

        $clientId = $user->sessionUser->session_client;
        $conResults = new ApiResource(DncContact::byClient($clientId)->get());

        // TODO: NEED TO REMOVE DUPLICATE ADDRESSES
        if ($existingContactsResult->hasData()) {
            $contacts = array_merge($conResults->getData(), $existingContactsResult->getData());
        } else {
            $contacts = $conResults->getData();
        }

        return $result->setData($contacts)
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
     * @param App\Contact $contact
     * @return ApiResource
     */
    protected function getGeolocation($contact)
    {
        $result = new ApiResource();
        $street = str_replace(' ', '+', $contact->street);
        $city = str_replace(' ', '+', $contact->city);
        $state = $contact->state;
        $apiKey = config('services.google.api_key');
        $url = 'https://maps.googleapis.com/maps/api/geocode/json?address='
            . $street . ',+' . $city . ',+' . $state . '&key=' . $apiKey;

        $http = new GuzzleHttp\Client();

        $response = $http->request('GET', $url);
        if ($response->statusCode > 299 || $response->statusCode < 200) {
            // error handling?
        } 

        $parsed = json_decode($response->getBody());

        $geo = $parsed['results'][0]['geometry']['location'];
        $result->setData($geo);
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
