<?php

namespace App\Http\Controllers;

use App\User;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use App\Http\Resources\ApiResource;
use Illuminate\Support\Facades\Auth;
use Psr\Http\Message\ServerRequestInterface;
use Laravel\Passport\Http\Controllers\AccessTokenController;
use App\Http\Helpers;

class AuthController extends Controller
{
    protected $accessTokenController;
    protected $helper;

    public function __construct(AccessTokenController $accessTokenController, Helpers $_helper)
    {
    	$this->accessTokenController = $accessTokenController;
        $this->helper = $_helper;
    }

//    public function authorize(ServerRequestInterface $request)
//    {
//    	$result = $this->accessTokenController->issueToken($request);
//
//    	if($result)
//	    {
//			$client = new Client();
//			$res = $client->post('')
//	    }
//    }

    public function login(Request $request)
    {
        $result = new ApiResource();

        $authenticated = Auth::attempt(['username' => $request['username'], 'password' => $request['password']]);

        if(!$authenticated)
            return $result->setToFail()->throwApiException()->getResponse();

        $user = Auth::user();

        $u = User::with(['detail', 'role', 'clients', 'sessionUser', 'sessionUser.client'])
                ->userId($user->id)
                ->first()
                ->toArray();

        $response = [
            'user' => $this->helper->normalizeLaravelObject($u),
            'token' => $user->createToken('auth')->accessToken
        ];

        return $result->setData($response)
            ->throwApiException()
            ->getResponse();
    }

}
