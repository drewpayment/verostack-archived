<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\SessionUser
 *
 * @property int $id
 * @property int $user_id
 * @property int $session_client
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Client $client
 * @property-read \App\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SessionUser bySessionUserId($id)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SessionUser newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SessionUser newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SessionUser query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SessionUser userId($id)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SessionUser whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SessionUser whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SessionUser whereSessionClient($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SessionUser whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SessionUser whereUserId($value)
 * @mixin \Eloquent
 */
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
    public function scopeBySessionUserId($query, $id)
    {
        return $query->where('id', $id);
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
    
    public function getUserIdAttribute()
    {
        return $this->attributes['user_id'];
    }

    public function getSessionClientAttribute()
    {
        return $this->attributes['session_client'];
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
