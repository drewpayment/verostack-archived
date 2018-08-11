<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    protected $table = 'campaigns';

    protected $primaryKey = 'campaign_id';

    protected $fillable = [
        'campaign_id',
        'client_id',
        'name',
        'active'
    ];

	/**
	 * Filter by client id.
	 *
	 * @param $query \Illuminate\Database\Eloquent\Builder
	 * @param $clientId
	 *
	 * @return mixed \Illuminate\Database\Eloquent\Builder
	 */
	public function scopeByClientId($query, $clientId)
    {
        return $query->where('client_id', $clientId);
    }

	/**
	 * Filter by active status. Takes "activeOnly" parameter and returns "active only"
	 * records by default.
	 *
	 * @param $query \Illuminate\Database\Eloquent\Builder
	 * @param $activeOnly
	 *
	 * @return \Illuminate\Database\Eloquent\Builder
	 */
    public function scopeActive($query, $activeOnly = true)
    {
    	if($activeOnly) return $query->where('active', $activeOnly);
	    return $query;
    }

	/**
	 * Filter by campaign name.
	 *
	 * @param $query \Illuminate\Database\Eloquent\Builder
	 * @param $name string
	 *
	 * @return \Illuminate\Database\Eloquent\Builder
	 */
    public function scopeByCampaignName($query, $name)
    {
    	return $query->where('name', $name);
    }
}
