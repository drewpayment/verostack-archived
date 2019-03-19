<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Contact
 *
 * @property int $contact_id
 * @property int $client_id
 * @property int $contact_type
 * @property string|null $business_name
 * @property string $first_name
 * @property string $last_name
 * @property string|null $middle_name
 * @property string|null $prefix
 * @property string|null $suffix
 * @property int|null $ssn
 * @property string|null $dob
 * @property string $street
 * @property string|null $street2
 * @property string $city
 * @property string $state
 * @property string $zip
 * @property int $phone_country
 * @property int|null $phone
 * @property string|null $email
 * @property int $fax_country
 * @property int|null $fax
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\DailySale[] $sales
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact byClient($clientId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact byContact($contactId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereBusinessName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereContactId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereContactType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereDob($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereFax($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereFaxCountry($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereMiddleName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact wherePhoneCountry($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact wherePrefix($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereSsn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereState($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereStreet($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereStreet2($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereSuffix($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contact whereZip($value)
 * @mixin \Eloquent
 */
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
