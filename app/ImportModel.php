<?php

namespace App;

use App\User;
use App\Client;
use App\Campaign;
use App\Scopes\ClientScope;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;

class ImportModel extends Model
{
    use SoftDeletes;

    protected $table = 'import_models';

    protected $primaryKey = 'import_model_id';

    protected $fillable = ['import_model_id', 'client_id', 'shortDesc', 'fullDesc', 'map', 'user_id', 'campaign_id',
        'created_at', 'updated_at', 'deleted_at'];

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

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function client()
    {
        return $this->hasOne(Client::class, 'client_id');
    }

    public function campaign()
    {
        return $this->hasOne(Campaign::class, 'campaign_id');
    }

    /**
     * Filters query by user id.
     *
     * @param [type] $query
     * @param [type] $id
     * @return void
     */
    public function scopeByUser($query, $id) {
        $query->where('user_id', $id);
    }

    public function getMatchByAgentCodeAttribute()
    {
        return $this->attributes['match_by_agent_code'] == 1;
    }

    public function setMatchByAgentCodeAttribute($value)
    {
        $this->attributes['match_by_agent_code'] = $value == true ? 1 : 0;
    }

    public function getSplitCustomerNameAttribute($value)
    {
        return $this->attributes['split_customer_name'] == 1;
    }

    public function setSplitCustomerNameAttribute($value)
    {
        $this->attributes['split_customer_name'] = $value == true ? 1 : 0;
    }

    public function getImportModelIdAttribute()
    {
        return $this->attributes['import_model_id'];
    }

    public function getClientIdAttribute()
    {
        return $this->attributes['client_id'];
    }

    public function getUserIdAttribute()
    {
        return $this->attributes['user_id'];
    }

    public function getCampaignIdAttribute()
    {
        return $this->attributes['campaign_id'];
    }

    public function getCreatedAtAttribute()
    {
        return $this->attributes['created_at'];
    }

    public function getUpdatedAtAttribute()
    {
        return $this->attributes['updated_at'];
    }

}
