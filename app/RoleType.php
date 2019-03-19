<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\RoleType
 *
 * @property int $id
 * @property string $type
 * @property bool $active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\RoleType byActiveStatus($includeInactive = false)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\RoleType newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\RoleType newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\RoleType query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\RoleType whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\RoleType whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\RoleType whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\RoleType whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\RoleType whereUpdatedAt($value)
 * @mixin \Eloquent
 */
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
