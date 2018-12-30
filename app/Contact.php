<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $table = 'contacts';

    protected $primary_key = 'contact_id';

    protected $fillable = [
        'contact_id',
        'client_id',
        'first_name',
        'last_name',
        'middle_name',
        'prefix',
        'suffix',
        'ssn',
        'dob',
        'street',
        'street2',
        'city',
        'state',
        'zip',
        'phone_country',
        'phone',
        'email',
        'fax_country',
        'fax'
    ];

    public function sales()
    {
        return $this->hasMany(DailySale::class, 'contact_id');
    }

    /**
     * @param $query \Illuminate\Database\Eloquent\Builder
     * @param $contactId
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByContact($query, $contactId)
    {
        return $query->where('contact_id', $contactId);
    }

    /**
     * @param $query \Illuminate\Database\Eloquent\Builder
     * @param $clientId
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByClient($query, $clientId)
    {
        return $query->where('client_id', $clientId);
    }
}
