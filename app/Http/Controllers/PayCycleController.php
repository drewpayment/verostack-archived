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

        return $result->setData(PayCycle::includeClosed($includeClosed)->get())
            ->throwApiException()
            ->getresponse();
    }

    public function updatePayCycle(Request $request, $clientId, $payCycleId)
    {
        $result = new ApiResource();

        $result
            ->checkAccessByClient($clientId, Auth::user()->id)
            ->mergeInto($result);

        if($result->hasError)
            return $result->throwApiException()->getResponse();

        $dto = $request['cycle'];
        $cycle = PayCycle::byPayCycle($request->payCycleId)->first();

        if(is_null($cycle))
            return $result->setToFail()
                ->throwApiException()
                ->getResponse();

        $cycle->start_date = $dto['startDate'];
        $cycle->end_date = $dto['endDate'];
        $cycle->is_pending = $dto['isPending'];
        $cycle->is_closed = $dto['isClosed'];

        $saved = $cycle->save();

        if(!$saved) 
            return $result->setToFail()
                ->throwApiException()
                ->getResponse();

        return $result->setData($cycle)
            ->throwApiException()
            ->getResponse();
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

    public function attachSales(Request $request, $clientId, $payCycleId)
    {
        $result = new ApiResource();

        $result
            ->checkAccessByClient($clientId, Auth::user()->id)
            ->mergeInto($result);

        if($result->hasError)
            return $result->throwApiException()->getResponse();

        $ids = [];
        foreach($request['sales'] as $s) {
            $ids[] = $s['dailySaleId'];
        }

        $dailySales = DailySale::whereIn('daily_sale_id', $ids)->get();

        try {
            foreach($request['sales'] as $s) {

                foreach($dailySales as $d) {
                    if($d->daily_sale_id != $s['dailySaleId']) continue;
                    $d->pay_cycle_id = $s['payCycleId'];
                    $d->save();
                }

            }

            return $result->setData($dailySales)
                ->setToSuccess()
                ->throwApiException()
                ->getResponse();

        } catch (\Exception $ex) {

            return $result->setToFail()
                ->throwApiException($ex->getMessage())
                ->getResponse();
        }
    }

}
