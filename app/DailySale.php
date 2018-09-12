<?php

namespace App;

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
		return $query->whereBetween('sale_date', [$startDate, $endDate]);
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

}
