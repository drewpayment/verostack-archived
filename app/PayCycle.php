<?php

namespace App;

use App\Payroll;
use App\DailySale;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\PayCycle
 *
 * @property int $pay_cycle_id
 * @property int $client_id
 * @property string $start_date
 * @property string $end_date
 * @property bool $is_pending
 * @property bool $is_closed
 * @property bool $is_locked
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\DailySale[] $dailySales
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Payroll[] $payrolls
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayCycle byClient($id)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayCycle byDates($start, $end)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayCycle byPayCycle($id)
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayCycle includeClosed($include = false)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayCycle newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayCycle newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\PayCycle onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayCycle query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayCycle whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayCycle whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayCycle whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayCycle whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayCycle whereIsClosed($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayCycle whereIsLocked($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayCycle whereIsPending($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayCycle wherePayCycleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayCycle whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayCycle whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\PayCycle withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\PayCycle withoutTrashed()
 * @mixin \Eloquent
 */
class PayCycle extends Model
{
    use SoftDeletes;
    
    protected $table = 'pay_cycle';

    protected $primaryKey = 'pay_cycle_id';

    protected $fillable = ['pay_cycle_id', 'client_id', 'start_date', 'end_date', 'is_pending', 'is_locked', 'is_closed'];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function getIsPendingAttribute($value)
    {
        return $value == 1;
    }

    public function setIsPendingAttribute($value)
    {
        $this->attributes['is_pending'] = $value == true ? 1 : 0;
    }

    public function getIsClosedAttribute($value)
    {
        return $value == 1;
    }

    public function setIsClosedAttribute($value)
    {
        $this->attributes['is_closed'] = $value == true ? 1 : 0;
    }

    public function getIsLockedAttribute($value)
    {
        return $value == 1;
    }

    public function setIsLockedAttribute($value)
    {
        $this->attributes['is_locked'] = $value == true ? 1 : 0;
    }

    /**
     * Get a list of related daily sales. 
     *
     * @return Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function dailySales()
    {
        return $this->hasMany(DailySale::class, 'pay_cycle_id');
    }

    public function payrolls()
    {
        return $this->hasMany(Payroll::class, 'pay_cycle_id');
    }

    /** QUERY HELPERS */

    public function scopeByClient($query, $id)
    {
        return $query->where('client_id', $id);
    }

    /**
     * Filters return from sql by pay_cycle_id column.
     *
     * @param Illuminate\Database\Eloquent\Builder $query
     * @param int $id
     * @return Illuminate\Database\Eloquent\Builder
     */
    public function scopeByPayCycle($query, $id)
    {
        return $query->where('pay_cycle_id', $id);
    }

    public function scopeByDates($query, $start, $end)
    {
        return $query->whereDate('start_date', '>=', $start)
            ->whereDate('end_date', '<=', $end);
    }

    /**
     * Scope to include/exclude closed cycles.
     * 
     * @param $query \Illuminate\Database\Eloquent\Builder
     * @param $incluce boolean
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeIncludeClosed($query, $include = false)
    {
        if($include)
            return $query->where('is_closed', 1)
                ->orWhere('is_closed', 0);
        else
            return $query->where('is_closed', 0);
    }

}
