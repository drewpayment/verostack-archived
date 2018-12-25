<?php

namespace App\Http\Controllers;

use App\Contact;
use Illuminate\Http\Request;
use App\Http\Resources\ApiResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Services\ContactService;

class ContactController extends Controller
{
    protected $service;

    public function __construct(ContactService $_service)
    {
        $this->service = $_service;
    }
    
    /**
     * @param $clientId
     * @return ApiResource
     */
    public function getContacts($clientId)
    {
        $result = new ApiResource();

        $result
			->checkAccessByClient($clientId, Auth::user()->id)
			->mergeInto($result);

        if($result->hasError)
            return $result
                ->throwApiException()
                ->getResponse();

        return $result
            ->setData(Contact::byClient($clientId)->get())
            ->throwApiException()
            ->getResponse();
    }

    /**
     * Save a new contact entity.
     *
     * @param Request $request
     * @param [int] $clientId
     * @return JsonResponse
     */
    public function newContact(Request $request, $clientId)
    {
        $result = new ApiResource();

        $result
			->checkAccessByClient($clientId, Auth::user()->id)
			->mergeInto($result);

        $this->service->saveContact($request)
            ->mergeInto($result);

        return $result
            ->throwApiException()
            ->getResponse();
    }

    /**
     * Update an existing Contact entity. 
     *
     * @param Request $request
     * @param [int] $clientId
     * @param [int] $contactId
     * @return JsonResponse
     */
    public function updateContact(Request $request, $clientId, $contactId)
    {
        $result = new ApiResource();

        $result
			->checkAccessByClient($clientId, Auth::user()->id)
			->mergeInto($result);

        $this->service->saveContact($request)
            ->mergeInto($result);

        return $result
            ->throwApiException()
            ->getResponse();
    }

}
