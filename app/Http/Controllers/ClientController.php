<?php

namespace App\Http\Controllers;

use App\Client;
use App\Campaign;
use App\Http\Helpers;
use App\ClientOptions;
use App\Http\Resources\ApiResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class ClientController extends Controller
{
	protected $helper;

	public function __construct(Helpers $_helper)
	{
		$this->helper = $_helper;
	}

	public function getClientOptions($clientId)
	{
		$result = new ApiResource();
		$user = Auth::user();
		$user->load('sessionUser');
		$clientId = $user->sessionUser->session_client;

		$options = ClientOptions::clientId($clientId)->first();
		
		$result->setData($options);

		return $result->throwApiException()->getResponse();
	}

	public function updateUseExistingContacts(Request $request)
	{
		$result = new ApiResource();
		
		$op = ClientOptions::clientId($request->clientId)->first();
		$op->use_existing_contacts = $request->useExistingContacts;

		$saved = $op->save();

		if (!$saved) {
			return $result->setToFail()->throwApiException()->getResponse();
		}

		$result->setData($op);

		return $result->throwApiException()->getResponse();
	}
    
    public function updateClientOptions()
    {
        $options = ClientOptions::clientId(request()->clientId)->first();
        $options->has_onboarding = request()->hasOnboarding ? 1 : 0;
        $options->save();

        $options->has_onboarding = $options->has_onboarding == 1;
        $options = $this->helper->normalizeLaravelObject($options->toArray());

        return response()->json($options);
    }

//    public function getCampaignsByClient($clientId)
//    {
//        $campaigns = Campaign::clientId($clientId)->get();
//
//	    $campaigns = $this->helper->normalizeLaravelObject($campaigns->toArray());
//
//        return response()->json($campaigns);
//    }

	/**
	 * Route: /api/clients/users/{userId}
	 * Gets a list of clients by the user id of the authenticated
	 * user currently logged in.
	 *
	 * @param int $userId
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function getClientByUser($userId)
	{
		$user = User::find($userId)->first();
		$clients = $user->clients;

		$clients = $this->helper->normalizeLaravelObject($clients);

		return response()->json($clients);
	}

	/**
	 * Route: /api/clients/{clientId}
	 *
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function saveClient()
	{
		$request = request()->all();
		$client = Client::with('clientOption')->clientId($request['clientId'])->first();

		if(!is_null($client))
		{
			$client->name = $request['name'];
			$client->street = $request['street'];
			$client->city = $request['city'];
			$client->state = $request['state'];
			$client->zip = $request['zip'];
			$client->phone = $request['phone'];
			$client->taxid = $request['taxid'];
			$client->active = $request['active'];

			$client->save();
		}
		else
		{
			$client = new Client;
			$client->name = $request['name'];
			$client->street = $request['street'];
			$client->city = $request['city'];
			$client->state = $request['state'];
			$client->zip = $request['zip'];
			$client->phone = $request['phone'];
			$client->taxid = $request['taxid'];
			$client->active = $request['active'];

			$client->save();
			$this->helper->registerSystemAdminsClients($client);
		}

		$client = $this->helper->normalizeLaravelObject($client->toArray());
		$client['options'] = $client['clientOption'];
		unset($client['clientOption']);

		return response()->json($client);
	}

	/**
	 * Route: /api/clients/{clientId}
	 *
	 * @param $clientId
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function getClientById($clientId)
	{
		$client = Client::find($clientId);

		$client = $this->helper->normalizeLaravelObject($client->toArray());

		return response()->json($client);
	}

}
