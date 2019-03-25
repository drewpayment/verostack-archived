<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Helpers;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Resources\ApiResource;
use Illuminate\Support\Facades\Auth;
use Psr\Http\Message\ServerRequestInterface;
use Laravel\Passport\Http\Controllers\AccessTokenController;

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
            return $result->setToFail()
                ->throwApiException('We were unable to verify that username and password.', Response::HTTP_UNAUTHORIZED)
                ->getResponse();

        $user = Auth::user();

        $u = User::with(['detail', 'role', 'clients', 'sessionUser.client'])
                ->userId($user->id)
                ->first();

        if($u->role->role < 6) {
            $u->load('agent');
        }

        $response = [
            'user' => $this->helper->normalizeLaravelObject($u->toArray()),
            'token' => $user->createToken('auth')->accessToken
        ];

        return $result->setData($response)
            ->throwApiException()
            ->getResponse();
    }

}
