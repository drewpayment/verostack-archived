<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\SaleStatus
 *
 * @property int $sale_status_id
 * @property int $client_id
 * @property string $name
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Client $client
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SaleStatus byClientId($clientId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SaleStatus bySaleStatusId($id)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SaleStatus newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SaleStatus newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SaleStatus query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SaleStatus whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SaleStatus whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SaleStatus whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SaleStatus whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SaleStatus whereSaleStatusId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SaleStatus whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class SaleStatus extends Model
{
    protected $table = 'sale_status';

    protected $primaryKey = 'sale_status_id';

	protected $fillable = [
		'sale_status_id', 'client_id', 'name', 'is_active'
	];

	public function getIsActiveAttribute($value)
	{
		return $value == 1;
	}

	public function setIsActiveAttribute($value)
	{
		$this->attributes['is_active'] = $value == true ? 1 : 0;
	}

	/**
	 * Filter entities by agent id.
	 *
	 * @param $query \Illuminate\Database\Eloquent\Builder
	 * @param $id int
	 *
	 * @return mixed \Illuminate\Database\Eloquent\Builder
	 */
	public function scopeBySaleStatusId($query, $id)
	{
		return $query->where('sale_status_id', $id);
	}

	/**
	 * Filter entities by agent id.
	 *
	 * @param $query \Illuminate\Database\Eloquent\Builder
	 * @param $clientId int
	 *
	 * @return mixed \Illuminate\Database\Eloquent\Builder
	 */
	public function scopeByClientId($query, $clientId)
	{
		return $query->where('client_id', $clientId);
	}

	/**
	 * Relationship - has a client relationship.
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasOne
	 */
	public function client()
	{
		return $this->hasOne(Client::class, 'client_id');
	}
}
