<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

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
