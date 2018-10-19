<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{

	protected $fillable = [
		'user_id', 'role'
	];

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
