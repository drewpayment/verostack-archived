<?php

namespace App\Http\Services;

use App\PayCycle;
use Carbon\Carbon;
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

    public function getPaycheck($payrollDetailId)
    {
        $result = new ApiResource();
        $detail = PayrollDetail::with(['payroll.campaign', 'payroll.payCycle', 'agent', 'overrides.agent', 'expenses'])
            ->byPayrollDetailsId($payrollDetailId)
            ->first();

        return $result->setData($detail);
    }

    public function getPaychecksPaged(Request $request, $clientId)
    {
        $result = new ApiResource();
        
        $filterByDates = !is_null($request->startDate) && !is_null($request->endDate);

        $details = PayrollDetail::with(['payroll.payCycle', 'agent', 'overrides.agent', 'expenses', 'payroll'])
            ->whereHas('payroll', function($q) use ($request, $clientId, $filterByDates) {
                if ($filterByDates) {
                    $start = Carbon::parse($request->startDate)->startOfDay()->toDateTimeString();
                    $end = Carbon::parse($request->endDate)->endOfDay()->toDateTimeString();
                    $q->whereBetween('release_date', [$start, $end]);
                }

                $q->where([
                    ['client_id', $clientId],
                    ['is_released', 1]
                ]);
            })
            ->select('payroll_details.*', 
                DB::raw('
                    (SELECT p.release_date 
                    FROM payrolls p
                    WHERE p.client_id = '.$clientId.'
                    AND p.payroll_id = payroll_details.payroll_id) AS release_date
                ')
            )
            /**
             * TODO: THIS BINDING IS REPLACING START DATE FOR SOME REASON AND END DATE IS GETTING USED AS CLIENT ID... 
             * WORKAROUND IS TO INTERPOLATE CLIENT ID STRING VALUE IN DB:RAW ALTHOUGH THAT IS POTENTIALLY UNSAFE. 
             */
            // ->addBinding($clientId) 
            ->latest('release_date', 'desc')
            ->paginate($request->resultsPerPage, ['*'], 'page', $request->page);

        return $result->setData($details);
    }

    public function getAgentPaychecks(Request $params, $clientId, $agentId)
    {
        $result = new ApiResource();

        $filterByDates = !is_null($params->startDate) && !is_null($params->endDate);

        $details = PayrollDetail::with(['payroll.payCycle', 'agent.pairings', 'overrides.agent', 'expenses'])
            ->select('payroll_details.*', 
                DB::raw('
                    (SELECT p.release_date 
                    FROM payrolls p
                    WHERE p.client_id = ?
                    AND p.payroll_id = payroll_details.payroll_id) AS release_date
                '))
            ->setBindings([$clientId])
            ->byAgentId($agentId)
            ->latest('release_date', 'desc')
            ->when($filterByDates, function($qry) use ($params) {
                $qry->whereHas('payroll', function($pq) use ($params) {
                    $pq->where('is_released', 1)
                        ->whereBetween('release_date', [$params->startDate, $params->endDate]);
                });
            })
            ->paginate($params->resultsPerPage, ['*'], 'page', $params->page);

        return $result->setData($details);
    }
}