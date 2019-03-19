<?php

namespace App;

use App\User;
use App\Campaign;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Utility
 *
 * @property int $utility_id
 * @property int|null $campaign_id
 * @property string|null $commodity
 * @property int|null $agent_company_id
 * @property string $agent_company_name
 * @property string|null $utility_name
 * @property string|null $meter_number
 * @property string|null $classification
 * @property float|null $price
 * @property string|null $unit_of_measure
 * @property int|null $term
 * @property bool $is_active
 * @property int $modified_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Campaign|null $campaign
 * @property-read \App\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility byActiveStatus($isActive)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility byCampaign($campaignId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility byUtility($utilityId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility whereAgentCompanyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility whereAgentCompanyName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility whereCampaignId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility whereClassification($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility whereCommodity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility whereMeterNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility whereModifiedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility whereTerm($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility whereUnitOfMeasure($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility whereUtilityId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Utility whereUtilityName($value)
 * @mixin \Eloquent
 */
class Utility extends Model
{
    
    protected $table = 'utilities';

    protected $primaryKey = 'utility_id';

    protected $fillable = [
        'utility_id', 'campaign_id', 'commodity', 'agent_company_id', 'agent_company_name', 'utility_name', 'meter_number', 'classification', 
        'price', 'unit_of_measure', 'term', 'is_active', 'modified_by'
    ];

    /** RELATIONSHIPS */

    public function campaign()
    {
        return $this->belongsTo(Campaign::class, 'campaign_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'modified_by');
    }

    /** QUERIES */

    public function scopeByUtility($query, $utilityId)
    {
        return $query->where('utility_id', $utilityId);
    }

    public function scopeByCampaign($query, $campaignId)
    {
        return $query->where('campaign_id', $campaignId);
    }

    public function scopeByActiveStatus($query, $isActive)
    {
        return $query->where('is_active', $isActive);
    }

    /** MUTATORS */

    public function getIsActiveAttribute($value)
    {
        return $value == 1;
    }

    public function setIsActiveAttribute($value)
    {
        $this->attributes['is_active'] = $value == true ? 1 : 0;
    }

}
