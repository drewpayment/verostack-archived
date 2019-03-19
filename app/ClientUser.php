<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\ClientUser
 *
 * @property int $client_id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ClientUser byClient($clientId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ClientUser byUser($userId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ClientUser newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ClientUser newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ClientUser query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ClientUser whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ClientUser whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ClientUser whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ClientUser whereUserId($value)
 * @mixin \Eloquent
 */
class ClientUser extends Model
{
    protected $table = 'client_user';

    protected $fillable = ['client_id', 'user_id'];

    public function scopeByClient($query, $clientId)
    {
        return $query->where('client_id', $clientId);
    }

    public function scopeByUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }
}
