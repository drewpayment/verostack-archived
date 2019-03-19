<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Remark
 *
 * @property int $remark_id
 * @property string $description
 * @property int $modified_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\DailySale[] $dailySale
 * @property-read \App\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Remark newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Remark newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Remark query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Remark whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Remark whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Remark whereModifiedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Remark whereRemarkId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Remark whereUpdatedAt($value)
 * @mixin \Eloquent
 */
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
