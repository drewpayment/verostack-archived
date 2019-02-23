<?php

namespace App;

use App\Contact;
use App\PayCycle;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class DailySale extends Model
{
    protected $table = 'daily_sale';

    protected $primaryKey = 'daily_sale_id';

    protected $fillable = [
        'daily_sale_id',
	    'agent_id',
	    'client_id',
	    'campaign_id',
        'contact_id',
	    'pod_account',
	    'first_name',
	    'last_name',
	    'street',
	    'street2',
	    'city',
	    'state',
	    'zip',
	    'status',
	    'paid_status',
	    'sale_date',
	    'last_touch_date'
    ];

	/**
	 * Creates one-to-one relationship with agent.
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function agent()
    {
    	return $this->belongsTo(Agent::class, 'agent_id');
    }

	/**
	 * Gets remark entities related via the intermediate table.
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany|\Illuminate\Database\Eloquent\Relations\HasManyThrough
	 */
	public function remarks()
    {
		return $this->belongsToMany(
			Remark::class,
			'daily_sale_remark',
			'daily_sale_id',
			'remark_id'
		);
    }

    public function contact()
    {
        return $this->belongsTo(Contact::class, 'contact_id', 'contact_id');
    }

    public function payCycle()
    {
        return $this->belongsTo(PayCycle::class, 'pay_cycle_id');
    }

	public function saleStatus()
	{
		return $this->hasOne(SaleStatus::class, 'sale_status_id', 'status');
	}

	public function campaign()
	{
		return $this->hasOne(Campaign::class, 'campaign_id');
	}

    /**
	 * Filter entities by pay cycle id. This query also returns sales that have a null
     * pay cycle id. Primarily used to build a list of sales for selection attaching new sales to 
     * an existing pay cycle.
	 *
	 * @param $query \Illuminate\Database\Eloquent\Builder
	 * @param $payCycleId
	 *
	 * @return mixed \Illuminate\Database\Eloquent\Builder
	 */
    public function scopeByPayCycleWithNulls($query, $payCycleId)
    {
        return $query->where('pay_cycle_id', $payCycleId)
            ->orWhere('pay_cycle_id', null);
    }

	/**
	 * Filter entities by daily sale id.
	 *
	 * @param $query \Illuminate\Database\Eloquent\Builder
	 * @param $dailySaleId
	 *
	 * @return mixed \Illuminate\Database\Eloquent\Builder
	 */
    public function scopeByDailySale($query, $dailySaleId)
    {
    	return $query->where('daily_sale_id', $dailySaleId);
    }

	/**
	 * Filter entities by agent id.
	 *
	 * @param $query \Illuminate\Database\Eloquent\Builder
	 * @param $agentId
	 *
	 * @return mixed \Illuminate\Database\Eloquent\Builder
	 */
	public function scopeByAgentId($query, $agentId)
    {
    	return $query->where('agent_id', $agentId);
    }

	/**
	 * Filter entities by client id.
	 *
	 * @param $query \Illuminate\Database\Eloquent\Builder
	 * @param $clientId
	 *
	 * @return mixed \Illuminate\Database\Eloquent\Builder
	 */
	public function scopeByClient($query, $clientId)
    {
    	return $query->where('client_id', $clientId);
    }

	/**
	 * @param $query \Illuminate\Database\Eloquent\Builder
	 * @param $startDate
	 * @param $endDate
	 *
	 * @return mixed \Illuminate\Database\Eloquent\Builder
	 */
	public function scopeByDateRange($query, $startDate, $endDate)
    {
		return $query->whereBetween('sale_date', [$startDate, Carbon::createFromFormat('Y-m-d', $endDate)->addDay()->toDateString()]);
    }

	/**
	 * @param $query \Illuminate\Database\Eloquent\Builder
	 * @param $campaignId
	 *
	 * @return mixed \Illuminate\Database\Eloquent\Builder
	 */
	public function scopeByCampaign($query, $campaignId)
    {
    	if($campaignId < 1) return $query;
        return $query->where('campaign_id', $campaignId);
    }

	/**
	 * @param $query \Illuminate\Database\Eloquent\Builder
	 * @param $pod
	 *
	 * @return mixed \Illuminate\Database\Eloquent\Builder
	 */
	public function scopeByAccount($query, $pod)
    {
    	return $query->where('pod_account', $pod);
    }

    /**
     * Filters out the sales that have been associated with a pay cycle. 
     * 
     * @param $query \Illuminate\Database\Eloquent\Builder
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFilterPaid($query)
    {
        return $query->where('pay_cycle_id', null);
    }

    /**
     * Filters by given pay cycle.
     * 
     * @param $query \Illuminate\Database\Eloquent\Builder
     * @param $id int
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByPayCycle($query, $id)
    {
        return $query->where('pay_cycle_id', $id);
    }

    /**
     * @param $query \Illuminate\Database\Eloquent\Builder
     * @param $status int
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByPaidStatus($query, $status)
    {
        if(is_array($status)) 
            return $query->whereIn('paid_status', $status);
            
        return $query->where('paid_status', $status);
    }

}
