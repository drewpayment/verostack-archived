<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

/**
 * App\User
 *
 * @property int $id
 * @property string $first_name
 * @property string $last_name
 * @property string $username
 * @property string $email
 * @property string $password
 * @property string|null $remember_token
 * @property bool $active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Agent $agent
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Client[] $clients
 * @property-read \App\UserDetail $detail
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read \App\Role $role
 * @property-read \App\SessionUser $sessionUser
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Passport\Token[] $tokens
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User active()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User isActiveByBool($activeOnly = true)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User userId($userId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User username($username)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereUsername($value)
 * @mixin \Eloquent
 */
class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name', 'last_name', 'username', 'email', 'password',
    ];

	/**
	 * Casts column values from sql into the defined types below. Be
	 * aware that you may want to mutate types back before inserting.
	 *
	 * @var array
	 */
    // protected $casts = [
    // 	'active' => 'boolean'
    // ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
	];

    public function getActiveAttribute($value)
    {
        return $value == 1;
    }

    public function setActiveAttribute($value)
    {
        $this->attributes['active'] = $value == true ? 1 : 0;
    }
	
	public function detail() 
	{
		return $this->hasOne(UserDetail::class, 'user_id');
	}

	/**
	 * Get the role associated with the user.
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasOne
	 */
	public function role()
    {
    	return $this->hasOne(Role::class, 'user_id');
    }

	/**
	 * Get the clients associated with the user.
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
	 */
	public function clients()
	{
		return $this->belongsToMany(
			'App\Client',
			'client_user',
			'user_id',
			'client_id',
			'id',
			'client_id'
		)->withTimestamps();
	}

	/**
	 * One-to-one relationship of selected client.
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasOne
	 */
	public function sessionUser()
	{
		return $this->hasOne(SessionUser::class);
	}

	/**
	 * Get related agent entity.
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasOne
	 */
	public function agent()
	{
		return $this->hasOne(Agent::class, 'user_id', 'id');
	}

	/**
	 * Sets the active property on the model back to an integer
	 * so when it is sent to db, it matches the column int.
	 *
	 * @param $value
	 */
	public function setActiveBoolean($value)
	{
		$this->attributes['active'] = ($value) ? 1 : 0;
	}

	/**
	 * Override function for Laravel Passport. This function will accept both email
	 * and username's for the user to login with.
	 *
	 * @param $identifier
	 *
	 * @return mixed
	 */
    public function findForPassport($identifier)
    {
    	return $this->orWhere('email', $identifier)->orWhere('username', $identifier)->first();
    }

	/**
	 * @param $query \Illuminate\Database\Eloquent\Builder
	 * @param $username string
	 *
	 * @return \Illuminate\Database\Eloquent\Builder
	 */
	public function scopeByUsername($query, $username)
    {
    	return $query->where('username', $username);
    }

	/**
	 * @param $query \Illuminate\Database\Eloquent\Builder
	 *
	 * @return mixed \Illuminate\Database\Eloquent\Builder
	 */
	public function scopeActive($query)
    {
    	return $query->where('active', 1);
    }

	/**
	 * @param $query \Illuminate\Database\Eloquent\Builder
	 * @param bool $activeOnly
	 *
	 * @return mixed \Illuminate\Database\Eloquent\Builder
	 */
	public function scopeIsActiveByBool($query, $activeOnly = true)
    {
    	$param = $activeOnly ? 1 : 0;
    	return $query->where('active', $param);
    }

	/**
	 * Scope by user id
	 *
	 * @param $query \Illuminate\Database\Eloquent\Builder
	 * @param $userId
	 *
	 * @return mixed \Illuminate\Database\Eloquent\Builder
	 */
	public function scopeUserId($query, $userId)
    {
    	return $query->where('id', $userId);
	}
	
	/**
	 * Scope by email
	 *
	 * @param \Illuminate\Database\Eloquent\Builder $query
	 * @param string $email
	 * @return void
	 */
	public function scopeByEmail($query, $email)
	{
		return $query->where('email', $email);
    }
    
    public function getFirstNameAttribute() 
    {
        return $this->attributes['first_name'];
    }

    public function getLastNameAttribute()
    {
        return $this->attributes['last_name'];
    }

    public function getCreatedAtAttribute()
    {
        return $this->attributes['created_at'];
    }

    public function getUpdatedAtAttribute()
    {
        return $this->attributes['updated_at'];
    }
}
