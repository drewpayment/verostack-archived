<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{

	protected $table = 'clients';

	protected $primaryKey = 'client_id';

	protected $fillable = [
		'client_id',
		'name',
		'street',
		'city',
		'state',
		'zip',
		'phone',
		'taxid',
		'active',
		'modified_by'
	];

	protected $casts = [
		'active' => 'boolean'
	];

	public function users()
	{
		return $this->belongsToMany(
			'App\User',
			'client_user',
			'client_id',
			'user_id',
			'client_id'
		)->withTimestamps();
	}

	/**
	 * One-to-one, belongs to SessionUser.
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function sessionUser()
	{
		return $this->belongsTo(SessionUser::class, 'session_client', 'client_id');
	}

	/**
	 * One-to-one, has one ClientOptions.
	 * 
	 * @return \Illuminate\Database\Eloquent\Relations\HasOne
	 */
	public function clientOption()
	{
		return $this->hasOne(ClientOptions::class, 'client_id');
	}

	/**
	 * Scope by client id.
	 *
	 * @param $query \Illuminate\Database\Eloquent\Builder
	 * @param $clientId
	 *
	 * @return mixed \Illuminate\Database\Eloquent\Builder
	 */
	public function scopeClientId($query, $clientId)
	{
		return $query->where('client_id', $clientId);
	}

}
