<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\UserDetail
 *
 * @property int $user_detail_id
 * @property int $user_id
 * @property string $street
 * @property string|null $street2
 * @property string $city
 * @property string $state
 * @property int $zip
 * @property string|null $ssn
 * @property string|null $phone
 * @property string $birthDate
 * @property int|null $bankRouting
 * @property int|null $bankAccount
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Campaign $campaign
 * @property-read \App\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail id($userDetailId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail userId($userId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail whereBankAccount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail whereBankRouting($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail whereBirthDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail whereSsn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail whereState($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail whereStreet($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail whereStreet2($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail whereUserDetailId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserDetail whereZip($value)
 * @mixin \Eloquent
 */
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
