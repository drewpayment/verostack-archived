<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

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
