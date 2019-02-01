<?php

namespace App\Http\Services;

use App\Http\Helpers;
use App\PayrollDetail;
use App\Http\Resources\ApiResource;
use Illuminate\Support\Facades\Auth;

class PayrollDetailsService 
{
    protected $helper;

    public function __construct(Helpers $_helper)
    {
        $this->helper = $_helper;
    }

    /**
     * Save a new detail that is a related dependent of a payroll entity. 
     * Must have a valid payroll id accompanying it as the FK. 
     *
     * @param object $details
     * @return ApiResource
     */
    public function saveNewPayrollDetails($details)
    {
        $result = new ApiResource();

        $d = new PayrollDetail;
        $d->payroll_id = $details->payrollId;
        $d->agent_id = $details->agentId;
        $d->sales = $details->sales;

        /** TODO: ADD FEATURE TO HANDLE IF CLIENT HAS TAX INFORMATION ON FILE */
        $d->taxes = $details->taxes;
        $d->gross_total = $details->grossTotal;
        $d->net_total = $details->netTotal;
        $d->modified_by = isset($details->modifiedBy) ? $details->modifiedBy : Auth::user()->id;

        $res = $d->save();

        if(!$res) return $result->setToFail('Failed to save the entity.');

        return $result->setData($d);
    }

    public function getPaychecksByDetailPaged($payrollDetailsId, $page = 1)
    {
        $result = new ApiResource();

        $details = PayrollDetail::with(['payroll.payCycle', 'agent', 'overrides', 'expenses'])
            ->byPayrollDetailsId($payrollDetailsId)
            ->paginate(10);

        return $result->setData($details);
    }

    public function getPaychecksPaged($page, $resultsPerPage)
    {
        $result = new ApiResource();

        $details = PayrollDetail::with(['payroll.payCycle', 'agent', 'overrides', 'expenses'])
            ->paginate($resultsPerPage, ['*'], 'page', $page);

        return $result->setData($details);
    }
}