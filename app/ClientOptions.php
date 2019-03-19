<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\ClientOptions
 *
 * @property int $options_id
 * @property int $client_id
 * @property bool $has_onboarding
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Client $client
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ClientOptions clientId($clientId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ClientOptions newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ClientOptions newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ClientOptions query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ClientOptions whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ClientOptions whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ClientOptions whereHasOnboarding($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ClientOptions whereOptionsId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ClientOptions whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ClientOptions extends Model
{
    protected $table = 'client_options';

    protected $primaryKey = 'options_id';

    protected $fillable = ['options_id', 'client_id', 'has_onboarding'];

    /**
     * One-to-one relationship to client.
     * 
     */
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function scopeClientId($query, $clientId)
    {
        return $query->where('client_id', $clientId);
    }
}
