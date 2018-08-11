<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SessionUser extends Model
{

	protected $table = 'session_user';

	protected $primaryKey = 'id';

	protected $fillable = ['id', 'user_id', 'session_client', 'created_at', 'updated_at'];

	/**
	 * One-to-one, belongs to User.
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function user()
	{
		return $this->belongsTo(User::class);
	}

	/**
	 * One-to-one, has a Client.
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasOne
	 */
	public function client()
	{
		return $this->hasOne(Client::class, 'client_id', 'session_client');
	}

	/**
	 * @param $query \Illuminate\Database\Eloquent\Builder
	 * @param $id
	 *
	 * @return mixed \Illuminate\Database\Eloquent\Builder
	 */
	public function scopeUserId($query, $id)
	{
		return $query->where('user_id', $id);
	}

}
