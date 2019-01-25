<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\ApiResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Services\PayrollService;

class PayrollController extends Controller
{
    protected $service;

    public function __construct(PayrollService $_service)
    {
        $this->service = $_service;
    }

    /**
     * Saves a list of payroll entities and their child detail entities. 
     *
     * @param Request $request
     * @param int $clientId
     * @return JsonResponse
     */
    public function savePayrollList(Request $request, $clientId)
    {
        $result = new ApiResource();

        $result
			->checkAccessByClient($clientId, Auth::user()->id)
			->mergeInto($result);

		if($result->hasError)
			return $result->throwApiException()->getResponse();

        $cycleId = 0;
        $payrolls = [];
        foreach($request->all() as $req)
        {
            $req = (object)$req;
            if($cycleId == 0) $cycleId = $req->payCycleId;

            $payroll = (object)[
                'payrollId' => null,
                'payCycleId' => $req->payCycleId,
                'campaignId' => $req->campaignId,
                'clientId' => $clientId,
                'weekEnding' => $req->weekEnding,
                'isReleased' => $req->isReleased,
                'isAutomated' => $req->isAutomated,
                'automatedRelease' => !isset($req->automatedRelease) ? null : $req->automatedRelease,
                'modifiedBy' => !isset($req->modifiedBy) ? null : $req->modifiedBy,
                'details' => $req->details
            ];
            
            $res = $this->service->savePayroll($payroll);

            if($res->hasError)
                return $result->setToFail('Fatal error. Please try again later.');

            $payrolls[] = $res->getData();
        }

        if(!is_array($payrolls) || !(count($payrolls) > 0))
            return $result->setToFail('Fatal error. Please try again later.');

        return $result->setData($payrolls)
            ->throwApiException()
            ->getResponse();
    }

    public function getPayrollList($clientId, $userId)
    {
        $result = new ApiResource();

        $result
			->checkAccessByClient($clientId, Auth::user()->id)
			->mergeInto($result);

		if($result->hasError)
			return $result->throwApiException()->getResponse();

        $this->service->getPayrollListByUser($clientId, $userId)
            ->mergeInto($result);

        return $result->throwApiException()
            ->getResponse();
    }

    /**
     * Ability to set a collection of payroll entities to "auto release" on a specific day.
     *
     * @param Request $request
     * @param int $clientId
     * @return Array<Payroll>
     */
    public function setAutoReleaseSettings(Request $request, $clientId)
    {
        $result = new ApiResource();

        $date = $request->date;
        $payrollIds = $request->payrollIds;

        $result
			->checkAccessByClient($clientId, Auth::user()->id)
			->mergeInto($result);

		if($result->hasError)
			return $result->throwApiException()->getResponse();

        $this->service->saveAutoReleaseSettings($clientId, $payrollIds, $date)
            ->mergeInto($result);

        return $result->throwApiException()->getResponse();
    }

    public function removeAutoReleaseSettings($clientId, $payrollId)
    {
        $result = new ApiResource();

        $result
			->checkAccessByClient($clientId, Auth::user()->id)
			->mergeInto($result);

		if($result->hasError)
			return $result->throwApiException()->getResponse();

        $this->service->removeAutoRelease($payrollId)
            ->mergeInto($result);

        return $result->throwApiException()->getResponse();
    }

}
