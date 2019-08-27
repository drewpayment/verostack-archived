<?php

namespace App;

use App\Contact;
use App\Utility;
use App\Campaign;
use App\PayCycle;
use Carbon\Carbon;
use App\SaleStatus;
use App\Scopes\ClientScope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\DailySale
 *
 * @property int $daily_sale_id
 * @property int $agent_id
 * @property int $client_id
 * @property int $utility_id
 * @property int $campaign_id
 * @property int $contact_id
 * @property string $pod_account
 * @property int $status
 * @property int $paid_status
 * @property int|null $pay_cycle_id
 * @property string $sale_date
 * @property string $last_touch_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property string|null $paid_date
 * @property string|null $charge_date
 * @property string|null $repaid_date
 * @property-read \App\Agent $agent
 * @property-read \App\Campaign $campaign
 * @property-read \App\Contact $contact
 * @property-read \App\PayCycle|null $payCycle
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Remark[] $remarks
 * @property-read \App\SaleStatus $saleStatus
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale byAccount($pod)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale byAgentId($agentId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale byCampaign($campaignId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale byClient($clientId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale byDailySale($dailySaleId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale byDateRange($startDate, $endDate)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale byPaidStatus($status)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale byPayCycle($id)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale filterPaid()
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\DailySale onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale whereAgentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale whereCampaignId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale whereChargeDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale whereContactId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale whereDailySaleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale whereLastTouchDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale wherePaidDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale wherePaidStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale wherePayCycleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale wherePodAccount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale whereRepaidDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale whereSaleDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySale whereUtilityId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\DailySale withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\DailySale withoutTrashed()
 * @mixin \Eloquent
 */
class DailySale extends Model
{
    use SoftDeletes;

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
        'last_touch_date',
        'paid_date',
        'charge_date',
        'repaid_date'
    ];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];
    
    /**
     * Filters all queries of this model by the user's selected client to ensure that they 
     * do not have cross-client interactions.
     *
     * @return void
     */
    protected static function boot() {
        parent::boot();
        static::addGlobalScope(new ClientScope);
    }
	
	/**
	 * Boolean column mutators.
	 *
	 * @param int $value
	 * @return void
	 */
	public function getHasGeo($value)
    {
        return $value == 1;
    }

    public function setHasGeo($value)
    {
        $this->attributes['has_geo'] = $value == true ? 1 : 0;
    }

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
		return $this->hasOne(Campaign::class, 'campaign_id', 'campaign_id');
    }

    public function utility()
    {
        return $this->hasOne(Utility::class, 'utility_id', 'utility_id');
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
    protected function scopeByPayCycleWithNulls($query, $payCycleId)
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
	
	/**
	 * Filters to return only records that haven't been ran through the geocoding service.
	 *
	 * @param \Illuminate\Database\Eloquent\Builder $query
	 * @return \Illuminate\Database\Eloquent\Builder
	 */
	public function scopeByNonGeocodedSales($query)
	{
		return $query->where('has_geo', 0);
    }
    
    public function getDailySaleIdAttribute()
    {
        return $this->attributes['daily_sale_id'];
    }

    public function getAgentIdAttribute()
    {
        return $this->attributes['agent_id'];
    }

    public function getClientIdAttribute()
    {
        return $this->attributes['client_id'];
    }

    public function getUtilityIdAttribute()
    {
        return $this->attributes['utility_id'];
    }

    public function getCampaignIdAttribute()
    {
        return $this->attributes['campaign_id'];
    }

    public function getContactIdAttribute()
    {
        return $this->attributes['contact_id'];
    }

    public function getPodAccountAttribute()
    {
        return $this->attributes['pod_account'];
    }

    public function getPaidStatusAttribute()
    {
        return $this->attributes['paid_status'];
    }

    public function getPayCycleIdAttribute()
    {
        return $this->attributes['pay_cycle_id'];
    }

    public function getHasGeoAttribute()
    {
        return $this->attributes['has_geo'];
    }

    public function getSaleDateAttribute()
    {
        return $this->attributes['sale_date'];
    }

    public function getLastTouchDateAttribute()
    {
        return $this->attributes['last_touch_date'];
    }

    public function getCreatedAtAttribute()
    {
        return $this->attributes['created_at'];
    }

    public function getUpdatedAtAttribute()
    {
        return $this->attributes['updated_at'];
    }

    public function getPaidDateAttribute()
    {
        return $this->attributes['paid_date'];
    }

    public function getChargeDateAttribute()
    {
        return $this->attributes['charge_date'];
    }

    public function getRepaidDateAttribute()
    {
        return $this->attributes['repaid_date'];
    }

}
