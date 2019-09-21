<?php

namespace App;

use App\ImportModel;
use App\Scopes\ClientScope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ReportImport extends Model
{
    use SoftDeletes;

    protected $table = 'report_imports';

    protected $primaryKey = 'report_import_id';

    protected $fillable = [
        'report_import_id', 'name', 'import_model_id', 'client_id', 'created_at', 'updated_at', 'deleted_at'
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

    public function importModel()
    {
        return $this->hasOne(ImportModel::class, 'import_model_id', 'importModelId');
    }

    public function getReportImportIdAttribute()
    {
        return $this->attributes['report_import_id'];
    }

    public function getImportModelIdAttribute()
    {
        return $this->attributes['import_model_id'];
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

    public function getDeletedAtAttribute()
    {
        return $this->attributes['deleted_at'];
    }

}
