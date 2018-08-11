<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Laravel\Passport\Http\Controllers\AccessTokenController;
use Psr\Http\Message\ServerRequestInterface;

class AuthController extends Controller
{
    protected $accessTokenController;

    public function __construct(AccessTokenController $accessTokenController)
    {
    	$this->accessTokenController = $accessTokenController;
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
}
