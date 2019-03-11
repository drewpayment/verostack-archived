<?php

namespace App;

use App\Payroll;
use App\DailySale;
use Illuminate\Database\Eloquent\Model;

class PayCycle extends Model
{
    
    protected $table = 'pay_cycle';

    protected $primaryKey = 'pay_cycle_id';

    protected $fillable = ['pay_cycle_id', 'client_id', 'start_date', 'end_date', 'is_pending', 'is_locked', 'is_closed'];

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
