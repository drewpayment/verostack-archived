<?php

namespace App;

use App\Payroll;
use App\Utility;
use App\Scopes\ClientScope;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Campaign
 *
 * @property int $campaign_id
 * @property int $client_id
 * @property string $name
 * @property bool $active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property float|null $compensation
 * @property string|null $md_details
 * @property string|null $md_onboarding
 * @property string|null $md_other
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Payroll[] $payrolls
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Utility[] $utilities
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign active($activeOnly = false)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign byCampaign($id)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign byCampaignName($name)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign byClientId($clientId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign whereCampaignId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign whereCompensation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign whereMdDetails($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign whereMdOnboarding($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign whereMdOther($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Campaign whereUpdatedAt($value)
 * @mixin \Eloquent
 */
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
        'md_other',
        'created_at',
        'updated_at'
    ];

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

    public function getActiveAttribute()
    {
        return $this->attributes['active'] == 1;
    }

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

    public function getCampaignIdAttribute()
    {
        return $this->attributes['campaign_id'];
    }

    public function getClientIdAttribute()
    {
        return $this->attributes['client_id'];
    }

    public function getCreatedAtAttribute()
    {
        return $this->attributes['created_at'];
    }

    public function getUpdatedAtAttribute()
    {
        return $this->attributes['updated_at'];
    }

    public function getMdDetailsAttribute()
    {
        return $this->attributes['md_details'];
    }

    public function getMdOnboardingAttribute()
    {
        return $this->attributes['md_onboarding'];
    }

    public function getMdOtherAttribute()
    {
        return $this->attributes['md_other'];
    }

}
