<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RoleType extends Model
{
    
    protected $table = 'roles_type';

    protected $fillable = ['type', 'active', 'created_at', 'updated_at'];

    /**
     * Filters roles by active status with option to include inactive roles.
     * 
     * @param $query \Illuminate\Database\Eloquent\Builder
     * @param $includeInactive boolean
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByActiveStatus($query, $includeInactive = false)
    {
        return $includeInactive
            ? $query
            : $query->where('active', 1);
    }

}
