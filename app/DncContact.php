<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DncContact extends Model
{
    use SoftDeletes;

    protected $table = 'dnc_contacts';

    protected $primary_key = 'dnc_contact_id';

    protected $fillable = [
        'dnc_contact_id', 'client_id', 'first_name', 'last_name', 'description', 'address', 'address_cont', 
        'city', 'state', 'zip', 'note'
    ];

    /**
     * Filter DncContacts by Client ID.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param int $clientId
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByClient($query, $clientId) {
        return $query->where('client_id', $clientId);
    }
}
