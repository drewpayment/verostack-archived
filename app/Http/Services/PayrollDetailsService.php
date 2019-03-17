<?php

namespace App\Http\Services;

use App\PayCycle;
use App\Http\Helpers;
use App\PayrollDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

    // public function getPaychecksByDetailPaged($payrollDetailsId, $page = 1)
    // {
    //     $result = new ApiResource();

    //     $details = PayrollDetail::with(['payroll.payCycle', 'agent', 'overrides', 'expenses'])
    //         ->byPayrollDetailsId($payrollDetailsId)
    //         ->paginate(10);

    //     return $result->setData($details);
    // }

    public function getPaychecksPaged(Request $request, $clientId)
    {
        $result = new ApiResource();

        /**
         * Need to update this so that the user can pass in filtering options to filter by a range of dates of the pay cycle.
         * However, the start/end dates are on the pay cycle object which is a relationship through the Payroll entity. In order to check this,
         * we're going to need to write a fairly complex conditional where clause using this: 
         * https://laravel.com/docs/5.7/eloquent-relationships#querying-relationship-existence
         * 
         * UPDATE: This is working for now... feels like EGG SHELLS. 
         */
        $filterByDates = !is_null($request->startDate) && !is_null($request->endDate);

        $details = PayrollDetail::with(['payroll.payCycle', 'agent', 'overrides.agent', 'expenses'])
            ->select('payroll_details.*', 
                DB::raw('
                    (SELECT p.release_date 
                    FROM payrolls p
                    WHERE p.client_id = ?
                    AND p.payroll_id = payroll_details.payroll_id) AS release_date
                '))
            ->setBindings([$clientId])
            ->latest('release_date', 'desc')
            ->when($filterByDates, function($qry) use ($request) {
                $qry->whereHas('payroll', function($pq) use ($request) {
                    $pq->whereBetween('release_date', [$request->startDate, $request->endDate]);
                });
            })
            // TODO: ->whereNotNull('release_date') needs to make sure we're getting only released payrolls back
            ->paginate($request->resultsPerPage, ['*'], 'page', $request->page);

        return $result->setData($details);
    }
}