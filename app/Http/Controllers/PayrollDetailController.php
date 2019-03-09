<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\ApiResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Services\PayrollDetailsService;
use App\PayrollDetail;

class PayrollDetailController extends Controller
{
    protected $service;

    public function __construct(PayrollDetailsService $_service) {
        $this->service = $_service;
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

}
