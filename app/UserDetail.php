<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserDetail extends Model
{
    
    protected $table = 'user_details';

    protected $primaryKey = 'user_detail_id';

    protected $fillable = [
        'user_detail_id',
        'user_id',
        'street',
        'street2',
        'city',
        'state',
        'zip',
        'ssn',
        'phone',
        'birthDate',
        'bankRouting',
        'bankAccount',
        'created_at',
        'updated_at'
    ];

    public function user()
    {
        return $this->hasOne(User::class);
    }

    public function campaign()
    {
    	return $this->hasOne(Campaign::class);
    }

	/**
	 * Filter user detail entities by user detail id.
	 *
	 * @param $query \Illuminate\Database\Eloquent\Builder
	 * @param $userDetailId
	 *
	 * @return mixed \Illuminate\Database\Eloquent\Builder
	 */
	public function scopeId($query, $userDetailId)
    {
    	return $query->where('user_detail_id', $userDetailId);
    }

	/**
	 * Filter user detail entities by user id.
	 *
	 * @param $query \Illuminate\Database\Eloquent\Builder
	 * @param $userId
	 *
	 * @return mixed \Illuminate\Database\Eloquent\Builder
	 */
	public function scopeUserId($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

}
