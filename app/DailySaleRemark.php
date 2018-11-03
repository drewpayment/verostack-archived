<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

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
