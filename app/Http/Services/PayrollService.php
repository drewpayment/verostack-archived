<?php

namespace App\Http\Services;

use App\Agent;
use App\Payroll;
use App\Http\Helpers;
use App\Http\UserService;
use App\Http\Resources\ApiResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Services\PayrollDetailsService;

class PayrollService
{
    protected $helper;
	protected $detailService;
    protected $userService;

	public function __construct(Helpers $_helper, PayrollDetailsService $_ds, UserService $_us)
	{
		$this->helper = $_helper;
        $this->detailService = $_ds;
        $this->userService = $_us;
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

        if(is_null($res)) return $result->setToFail('Failed to save the entity.');

        $p = Payroll::with('payCycle')->byPayroll($p->payroll_id)->first();

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

    public function getPayrollListByUser($clientId, $userId)
    {
        $result = new ApiResource();

        $payrolls = Payroll::with(['details.agent', 'details.expenses', 'details.overrides', 'payCycle'])->byClient($clientId)->get();

        if(count($payrolls) < 1) return $result;

        $children = Agent::byManager($userId)->get();

        if(count($children) > 0)
        {
            $payrolls = $payrolls->filter(function ($p, $i) use ($children) {
                return $p->details->contains(function ($d, $j) use ($children) {
                    return $children->first(function ($c) use ($d) { 
                            return $c->agent_id == $d->agent_id; 
                        }) != null; 
                });
            });
        }
        
        return $result->setData($payrolls);
    }
}