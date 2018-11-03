<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

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
