<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Role
 *
 * @property int $user_id
 * @property int $role
 * @property bool $is_sales_admin
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Role activeOnly()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Role byRoleId($id)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Role inactiveOnly()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Role newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Role newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Role query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Role userId($userId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Role whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Role whereIsSalesAdmin($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Role whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Role whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Role whereUserId($value)
 * @mixin \Eloquent
 */
class Role extends Model
{

    protected $primaryKey = 'user_id';

	protected $fillable = [
		'user_id', 'role', 'is_sales_admin'
	];

    public function getIsSalesAdminAttribute($value)
    {
        return $value == 1;
    }

    public function setIsSalesAdminAttribute($value)
    {
        $this->attributes['is_sales_admin'] = $value ? 1 : 0;
    }

	public function user()
	{
		return $this->belongsTo(User::class);
	}

    /**
     * WTF? THIS SHOULD NEVER BE DONE.
     */
    public function scopeByRoleId($query, $id)
    {
        return $query->where('role', $id);
    }

	public function scopeUserId($query, $userId)
	{
		return $query->where('user_id', $userId);
	}

	public function scopeActiveOnly($query)
	{
		return $query->where('active', 1);
	}

	public function scopeInactiveOnly($query)
	{
		return $query->where('active', 0);
	}

}
