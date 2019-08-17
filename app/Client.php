<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Client
 *
 * @property int $client_id
 * @property string $name
 * @property string $street
 * @property string $city
 * @property string $state
 * @property int $zip
 * @property float $phone
 * @property int $taxid
 * @property bool $active
 * @property int $modified_by
 * @property string|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\ClientOptions $clientOption
 * @property-read \App\SessionUser $sessionUser
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\User[] $users
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client clientId($clientId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client whereModifiedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client whereState($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client whereStreet($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client whereTaxid($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Client whereZip($value)
 * @mixin \Eloquent
 */
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
    
    public function getClientIdAttribute()
    {
        return $this->attributes['client_id'];
    }

    public function getModifiedByAttribute()
    {
        return $this->attributes['modified_by'];
    }

}
