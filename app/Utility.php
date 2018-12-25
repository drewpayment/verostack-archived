<?php

namespace App;

use App\User;
use App\Campaign;
use Illuminate\Database\Eloquent\Model;

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
