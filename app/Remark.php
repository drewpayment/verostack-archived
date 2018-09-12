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
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
	 */
	public function dailySale()
	{
		return $this->belongsToMany(
			DailySale::class,
			'daily_sale_remark',
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
