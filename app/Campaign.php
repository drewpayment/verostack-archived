<?php

namespace App;

use App\Payroll;
use App\Utility;
use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    protected $table = 'campaigns';

    protected $primaryKey = 'campaign_id';

    protected $fillable = [
        'campaign_id',
        'client_id',
        'name',
        'active',
	    'compensation',
	    'md_details',
	    'md_onboarding',
	    'md_other'
    ];

    protected $casts = [
        'active' => 'boolean'
    ];

	/**
	 * Set's the campaign's active attribute.
	 *
	 * @param boolean $value
	 * @return void
	 */
	public function setActiveAttribute($value)
    {
    	$this->attributes['active'] = $value ? 1 : 0;
    }

    public function utilities()
    {
        return $this->hasMany(Utility::class, 'campaign_id');
    }

    public function payrolls()
    {
        return $this->belongsToMany(Payroll::class, 'payrolls', 'campaign_id');
    }

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
    public function scopeActive($query, $activeOnly = false)
    {
    	if(is_null($activeOnly))
	    {
	    	$activeOnly = false;
	    }
	    else if (is_string($activeOnly))
	    {
	    	$activeOnly = (strtolower($activeOnly) === 'true');
	    }
    	if($activeOnly === true) return $query->where('active', $activeOnly);
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

	/**
	 * @param $query \Illuminate\Database\Eloquent\Builder
	 * @param $id
	 *
	 * @return mixed \Illuminate\Database\Eloquent\Builder
	 */
	public function scopeByCampaign($query, $id)
    {
    	return $query->where('campaign_id', $id);
    }



}
