<?php

namespace App;

use App\User;
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

    protected $fillable = ['import_model_id', 'client_id', 'shortDesc', 'fullDesc', 'map', 'user_id', 
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
        return $this->hasOne(User::class, 'id');
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

    public function getMatchByAgentCodeAttribute($value)
    {
        return $value == 1;
    }

    public function setMatchByAgentCodeAttribute($value)
    {
        $this->attributes['match_by_agent_code'] = $value == true ? 1 : 0;
    }

    public function getSplitCustomerNameAttribute($value)
    {
        return $value == 1;
    }

    public function setSplitCustomerNameAttribute($value)
    {
        $this->attributes['split_customer_name'] = $value == true ? 1 : 0;
    }
}
