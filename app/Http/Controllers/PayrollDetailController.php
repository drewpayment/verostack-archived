<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\ApiResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Services\PayrollDetailsService;
use App\PayrollDetail;
use App\Client;
use App\Http\UserService;

class PayrollDetailController extends Controller
{
    protected $service;
    protected $userService;

    public function __construct(PayrollDetailsService $_service, UserService $_userService) {
        $this->service = $_service;
        $this->userService = $_userService;
    }

    public function getPaychecks(Request $request, $clientId)
    {
        $result = new ApiResource();

        $result
			->checkAccessByClient($clientId, Auth::user()->id)
			->mergeInto($result);

		if($result->hasError)
			return $result->throwApiException()->getResponse();

        $this->service->getPaychecksPaged($request, $clientId)->mergeInto($result);

        return $result->throwApiException()->getResponse();
    }

    public function getHeadlessPaycheckDetail($clientId, $userId, $payrollDetailId, $headless)
    {
        $result = new ApiResource();

        $result
            ->checkAccessByClient($clientId, $userId)
            ->mergeInto($result);

        if($result->hasError)
            return $result->throwApiException()->getResponse();

        $envHead = env('HEADLESS');

        if($envHead != $headless)
            return $result->setToFail()->throwApiException()->getResponse();

        $detail = $this->service->getPaycheck($payrollDetailId)->getData();
        $user = $this->userService->getUserDtoByUser($userId);

        $payload = ['detail' => $detail, 'user' => $user];

        return $result->setData($payload)
            ->throwApiException()->getResponse();
    }

}
