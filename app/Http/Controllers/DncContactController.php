<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\ApiResource;
use Illuminate\Support\Facades\Auth;
use App\DncContact;
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
     *
     * @return Array(DncContact)
     */
    public function getDncContacts()
    {
        $result = new ApiResource();
        $user = ApiResource::getUserInfo();

        $result->setData(DncContact::byClient($user->sessionUser->session_client)->get());

        return $result->throwApiException()
            ->getResponse();
    }

    /**
     * ~/api/dnc-contacts
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

        return $result->getResponse();
    }

}
