<?php

namespace App;

use App\Client;
use App\Utility;
use App\ImportModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProcessImport extends Model
{
    use SoftDeletes;

    protected $table = 'process_imports';

    protected $primaryKey = 'process_import_id';

    protected $fillable = ['process_import_id', 'client_id', 'import_model_id', 'campaign_id', 'utility_id', 'sales', 'user_id'];

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

    public function importModel()
    {
        return $this->hasOne(ImportModel::class, 'import_model_id');
    }

    public function client()
    {
        return $this->hasOne(Client::class, 'client_id');
    }

    public function utility()
    {
        return $this->hasOne(Utility::class, 'utility_id');
    }
}
