<?php

namespace App;

use App\Agent;
use Illuminate\Database\Eloquent\Model;

class SalesPairing extends Model
{

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'campaign_id', 'sales_id', 'client_id', 'agent_id'
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
