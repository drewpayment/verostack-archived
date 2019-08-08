<?php

namespace App\Http\Controllers;

use App\Utility;
use App\Campaign;
use Illuminate\Http\Request;
use App\Http\Resources\ApiResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Services\UtilityService;

class UtilityController extends Controller
{
    protected $service;

    public function __construct(UtilityService $_service)
    {
        $this->service = $_service;
    }

    public function getUtilitiesByClient()
    {
        $result = new ApiResource();
        $user = Auth::user();
        $user->load('sessionUser');
        $clientId = $user->sessionUser->session_client;

        $result->checkAccessByClient($clientId, $user->id)
            ->mergeInto($result);

        if ($result->hasError)
            return $result->throwApiException()->getResponse();

        $result->setData(Utility::byClient($clientId)->get());

        return $result->throwApiException()->getResponse();
    }
    
    public function getUtility($clientId, $utilityId)
    {
        $result = new ApiResource();

        $result
            ->checkAccessByClient($clientId, Auth::user()->id)
            ->mergeInto($result);

        if($result->hasError)
            return $result->throwApiException()->getResponse();

        return $result->setData(Utility::with('campaign')->byUtility($utilityId)->first())
            ->throwApiException()
            ->getResponse();
    }

    public function editUtility(Request $request, $clientId, $utilityId)
    {
        $result = new ApiResource();

        $result
            ->checkAccessByClient($clientId, Auth::user()->id)
            ->mergeInto($result);

        if($result->hasError)
            return $result->throwApiException()->getResponse();

        $this->service->editUtility($request)->mergeInto($result);

        return $result
            ->throwApiException()
            ->getResponse();
    }

    public function saveNewUtility(Request $request, $clientId)
    {
        $result = new ApiResource();

        $result
            ->checkAccessByClient($clientId, Auth::user()->id)
            ->mergeInto($result);

        if($result->hasError)
            return $result->throwApiException()->getResponse();

        $this->service->createUtility($request)->mergeInto($result);

        return $result
            ->throwApiException()
            ->getResponse();
    }

}
