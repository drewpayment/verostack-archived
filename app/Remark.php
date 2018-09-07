<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Remark extends Model
{
    protected $table = 'remarks';

    protected $primaryKey = 'remark_id';

    protected $fillable = [
    	'remark_id',
	    'description',
	    'modified_by'
    ];


	/**
	 * @return \Illuminate\Database\Eloquent\Relations\HasManyThrough
	 */
	public function dailySale()
	{
		return $this->hasManyThrough(
			DailySale::class,
			DailySaleRemark::class,
			'remark_id',
			'daily_sale_id',
			'remark_id',
			'daily_sale_id'
		);
	}

	/**
	 * Get the user entity that created the note or modified it last.
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasOne
	 */
	public function user()
	{
		return $this->hasOne(User::class, 'id', 'modified_by');
	}
}
