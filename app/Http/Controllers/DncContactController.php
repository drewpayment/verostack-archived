<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\ApiResource;
use Illuminate\Support\Facades\Auth;
use App\DncContact;

class DncContactController extends Controller
{
    
    public function getDncContacts()
    {
        $result = new ApiResource();
        $user = ApiResource::getUserInfo();

        $result->setData(DncContact::byClient($user->sessionUser->session_client)->get());

        return $result->throwApiException()
            ->getResponse();
    }

}
