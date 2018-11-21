<?php

namespace App\Http\Controllers;

use App\PayCycle;
use Illuminate\Http\Request;
use App\Http\Resources\ApiResource;
use Illuminate\Support\Facades\Auth;
use App\DailySale;

class PayCycleController extends Controller
{
    
    public function __construct()
    {
        
    }

    public function getPayCycles($clientId, $includeClosed = false)
    {
        $result = new ApiResource();

        $result
            ->checkAccessByClient($clientId, Auth::user()->id)
            ->mergeInto($result);

        if($result->hasError)
            return $result->throwApiException()->getResponse();

        return $result->setData(PayCycle::includeClosed()->get())
            ->throwApiException()
            ->getresponse();
    }

    public function getSalesByDate(Request $request, $clientId)
    {
        $result = new ApiResource();

        $result
            ->checkAccessByClient($clientId, Auth::user()->id)
            ->mergeInto($result);

        if($result->hasError)
            return $result->throwApiException()->getResponse();

        $sales = DailySale::with('agent')->byClient($clientId)
            ->filterPaid()
            ->byDateRange($request->start, $request->end)
            ->get();

        return $result->setData($sales)
            ->throwApiException()
            ->getResponse();
    }

    public function getPayCycleSales(Request $request, $clientId, $payCycleId)
    {
        $result = new ApiResource();

        $result
            ->checkAccessByClient($clientId, Auth::user()->id)
            ->mergeInto($result);

        if($result->hasError)
            return $result->throwApiException()->getResponse();

        $sales = DailySale::with('agent')
            ->byPayCycleWithNulls($payCycleId)
            ->byDateRange($request->start, $request->end)
            ->get();

        return $result->setData($sales)
            ->throwApiException()
            ->getResponse();
    }

}
