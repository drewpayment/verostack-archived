<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * App\DailySaleRemark
 *
 * @property int $daily_sale_id
 * @property int $remark_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\DailySale $dailySale
 * @property-read \App\Remark $remark
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySaleRemark newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySaleRemark newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySaleRemark query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySaleRemark whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySaleRemark whereDailySaleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySaleRemark whereRemarkId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\DailySaleRemark whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class DailySaleRemark extends Model
{
    protected $table = 'daily_sale_remark';

    // override for defining the primary key on a table with composite keys
    protected function setKeysForSaveQuery( Builder $query ) {
	    $query
		    ->where('daily_sale_id', '=', $this->getAttribute('daily_sale_id'))
		    ->where('remark_id', '=', $this->getAttribute('remark_id'));
    }

	/**
	 * Returns the related daily sale entity.
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasOne
	 */
	public function dailySale()
    {
    	return $this->hasOne(DailySale::class);
    }

	/**
	 * Returns the related remark entity.
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasOne
	 */
	public function remark()
    {
    	return $this->hasOne(Remark::class);
    }
}
