<?php

namespace App;

use App\Scopes\ClientScope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DncContact extends Model
{
    use SoftDeletes;

    protected $table = 'dnc_contacts';

    protected $primary_key = 'dnc_contact_id';

    protected $fillable = [
        'dnc_contact_id', 'client_id', 'first_name', 'last_name', 'description', 'address', 'address_cont', 
        'city', 'state', 'zip', 'note', 'lat', 'long', 'geocode'
    ];

    /**
     * Filters all queries of this model by the user's selected client to ensure that they 
     * do not have cross-client interactions.
     *
     * @return void
     */
    protected static function boot() {
        parent::boot();
        static::addGlobalScope(new ClientScope);
    }

    /**
     * Filter by dnc_contact_id.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param int $id
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByDncContactId($query, $id) 
    {
        return $query->where('dnc_contact_id', $id);
    }

    /**
     * Filter by dnc_contact_id list.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param int $id
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByDncContactList($query, $ids) 
    {
        return $query->whereIn('dnc_contact_id', $ids);
    }

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
