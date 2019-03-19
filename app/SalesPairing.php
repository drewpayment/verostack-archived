<?php

namespace App;

use App\Agent;
use Illuminate\Database\Eloquent\Model;

/**
 * App\SalesPairing
 *
 * @property int $sales_pairings_id
 * @property int $agent_id
 * @property int $campaign_id
 * @property float|null $commission
 * @property int $sales_id
 * @property int $client_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Agent $agent
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SalesPairing agentId($id)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SalesPairing campaignId($campaignId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SalesPairing clientId($clientId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SalesPairing newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SalesPairing newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SalesPairing query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SalesPairing salesPairings($id)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SalesPairing whereAgentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SalesPairing whereCampaignId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SalesPairing whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SalesPairing whereCommission($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SalesPairing whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SalesPairing whereSalesId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SalesPairing whereSalesPairingsId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SalesPairing whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class SalesPairing extends Model
{

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'sales_pairings_id', 'campaign_id', 'commission', 'sales_id', 'client_id', 'agent_id'
	];

	protected $table = 'sales_pairings';

	protected $primaryKey = 'sales_pairings_id';

    
    public function agent()
    {
        return $this->belongsTo(Agent::class, 'agent_id');
    }

	/**
	 * @param $query \Illuminate\Database\Eloquent\Builder
	 * @param $campaignId
	 *
	 * @return mixed \Illuminate\Database\Eloquent\Builder
	 */
	public function scopeCampaignId($query, $campaignId)
	{
		return $query->where('campaign_id', $campaignId);
	}

	/**
	 * @param $query \Illuminate\Database\Eloquent\Builder
	 * @param $clientId
	 *
	 * @return mixed \Illuminate\Database\Eloquent\Builder
	 */
	public function scopeClientId($query, $clientId)
	{
		return $query->where('client_id', $clientId);
	}

	/**
	 * @param $query \Illuminate\Database\Eloquent\Builder
	 * @param $id
	 *
	 * @return mixed \Illuminate\Database\Eloquent\Builder
	 */
	public function scopeSalesPairings($query, $id)
	{
		return $query->where('sales_pairings_id', $id);
	}

	/**
	 * @param $query \Illuminate\Database\Eloquent\Builder
	 * @param $id
	 *
	 * @return mixed \Illuminate\Database\Eloquent\Builder
	 */
	public function scopeAgentId($query, $id)
	{
		return $query->where('agent_id', $id);
	}

}
