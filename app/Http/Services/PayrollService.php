<?php

namespace App\Http\Services;

use App\Agent;
use App\Expense;
use App\Payroll;
use App\Override;
use Carbon\Carbon;
use App\Http\Helpers;
use App\PayrollDetail;
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

    public function saveAutoReleaseSettings($clientId, $payrollIds, $date)
    {
        $result = new ApiResource();
        $updatedPayrolls = [];
        $formattedDt = Carbon::parse($date)->toDateTimeString();

        $payrolls = Payroll::with(['details.agent', 'details.expenses', 'details.overrides', 'payCycle'])
            ->byPayrollList($payrollIds)
            ->byClient($clientId)
            ->get();

        if(count($payrolls) < 1) return $result;

        foreach($payrolls as $p)
        {
            $p->is_automated = true;
            $p->automated_release = $formattedDt;
            $res = $p->save();

            $result->setStatus($res);
            if($result->hasError) break;
            $updatedPayrolls[] = $this->helper->normalizeLaravelObject(array_filter($p->toArray()));
        }

        if($result->hasError) return $result;

        return $result->setData($updatedPayrolls);
    }

    public function removeAutoRelease($payrollId)
    {
        $result = new ApiResource();

        $payroll = Payroll::with(['details.agent', 'details.expenses', 'details.overrides', 'payCycle'])
                        ->byPayroll($payrollId)
                        ->first();

        $payroll->is_automated = false;
        $payroll->automated_release = null;

        $res = $payroll->save();

        if(!$res) return $result->setToFail();

        return $result->setData($payroll);
    }

    public function savePayrollDetails($clientId, $dto)
    {
        $result = new ApiResource();

        $payroll = Payroll::with('campaign')->byPayroll($dto->payrollId)->first();
        $commission = !is_null($payroll->campaign) ? $payroll->campaign->compensation : 0;
        $grossTotal = $dto->sales * $commission;

        if(is_null($dto->payrollDetailsId) || $dto->payrollDetailsId < 1)
            $detail = new PayrollDetail;
        else 
            $detail = PayrollDetail::byPayrollDetailsId($dto->payrollDetailsId)->first();

        $detail->payroll_id = $dto->payrollId;
        $detail->agent_id = $dto->agentId;
        $detail->sales = $dto->sales;
        $detail->taxes = $dto->taxes;
        $detail->modified_by = Auth::user()->id;

        $overrides = [];
        foreach($dto->overrides as $ovr)
        {
            if(is_null($ovr['overrideId']))
                $o = new Override;
            else
                $o = Override::byOverride($ovr['overrideId'])->first();

            $o->payroll_details_id = $dto->payrollDetailsId;
            $o->agent_id = $ovr['agentId'];
            $o->units = $ovr['units'];
            $o->amount = $ovr['amount'];
            $o->modified_by = Auth::user()->id;
            $overrides[] = $o;

            $grossTotal += ($o->units * $o->amount);
        }

        $expenses = [];
        foreach($detail->expenses as $exp)
        {
            if(is_null($exp['expenseId']))
                $e = new Expense;
            else
                $e = Expense::byExpense($exp['expenseId'])->first();

            $e->payroll_details_id = $dto->payrollDetailsId;
            $e->agent_id = $dto->agentId;
            $e->title = $exp['title'];
            $e->description = $exp['description'];
            $e->amount = $exp['amount'];
            $e->expense_date = $exp['expenseDate'];
            $e->modified_by = Auth::user()->id;
            $expenses[] = $e;

            $grossTotal += $e->amount;
        }

        $res = $detail->save();

        if(!$res) return $result->setToFail();

        $overrides = $detail->overrides()->saveMany($overrides);
        $expenses = $detail->expenses()->saveMany($expenses);

        $this->getPayrollListByUser($clientId, Auth::user()->id)->mergeInto($result);

        return $result;
    }
}