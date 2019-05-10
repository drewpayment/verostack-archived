<?php

namespace App\Http\Controllers;

use App\DncContact;
use Illuminate\Http\Request;
use App\Http\Resources\ApiResource;
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
        $uid = $request->fbid;

        if ($uid != null) {
            $auth = app()->firebase->getAuth();
            $fbUser = $auth->getUser($uid);
            $user = ApiResource::getUserInfoByFirebase($fbUser->email);
        } else {
            $user = Auth::user();
            $user->load('sessionUser');
        }

        $clientId = $user->sessionUser->session_client;
        $contacts = DncContact::byClient($clientId)->get();

        return $result->setData($contacts)
            ->throwApiException()
            ->getResponse();
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
