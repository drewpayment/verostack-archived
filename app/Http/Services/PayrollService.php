<?php

namespace App\Http\Services;

use App\Payroll;
use App\Http\Helpers;
use App\Http\Resources\ApiResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Services\PayrollDetailsService;

class PayrollService
{
    protected $helper;
	protected $detailService;

	public function __construct(Helpers $_helper, PayrollDetailsService $_ds)
	{
		$this->helper = $_helper;
        $this->detailService = $_ds;
	}

    /**
     * Saves a payroll entity and then checks if it has any children detail records. 
     * If so, calls the detail service and saved them, returning entire payroll 
     * with its related detail entities. 
     *
     * @param stdClass $payroll
     * @return ApiResource
     */
    public function savePayroll($payroll)
    {
        $result = new ApiResource();

        $p = new Payroll;
        $p->pay_cycle_id = $payroll->payCycleId;
        $p->client_id = $payroll->clientId;
        $p->campaign_id = $payroll->campaignId;
        $p->week_ending = $payroll->weekEnding;
        $p->is_released = $payroll->isReleased;
        $p->is_automated = $payroll->isAutomated;
        $p->automated_release = $payroll->automatedRelease;
        $p->modified_by = isset($payroll->modifiedBy) ? $payroll->modifiedBy : Auth::user()->id;
        $res = $p->save();

        if(!$res) return $result->setToFail('Failed to save the entity.');

        if(!is_null($payroll->details)) {
            $detailResults = [];
            foreach($payroll->details as $detail)
            {
                $dto = (object)$detail;
                $dto->payrollId = $p->payroll_id;
                $dRes = $this->detailService->saveNewPayrollDetails($dto);

                if($dRes->hasError)
                    return $result->setToFail('Failed to save the detail entity.');

                $detailResults[] = $dRes->getData();
            }

            $p->details = $detailResults;
        }

        return $result->setData($p);
    }

}