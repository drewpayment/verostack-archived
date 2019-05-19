<?php

namespace App;

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

    protected $fillable = ['import_model_id', 'client_id', 'short_desc', 'full_desc', 'map', 'user_id', 
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
}
