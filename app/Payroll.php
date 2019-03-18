<?php

namespace App;

use App\Agent;
use App\Campaign;
use App\PayCycle;
use App\PayrollDetail;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Payroll extends Model
{
    use SoftDeletes;

    protected $primaryKey = 'payroll_id';

    protected $fillable = ['is_released'];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function getIsReleasedAttribute($value)
    {
        return $value == 1;
    }

    public function setIsReleasedAttribute($value)
    {
        $this->attributes['is_released'] = $value == true ? 1 : 0;
    }

    public function getIsAutomatedAttribute($value)
    {
        return $value == 1;
    }

    public function setIsAutomatedAttribute($value)
    {
        $this->attributes['is_automated'] = $value == true ? 1 : 0;
    }

    public function payCycle()
    {
        return $this->belongsTo(PayCycle::class, 'pay_cycle_id');
    }

    public function details()
    {
        return $this->hasMany(PayrollDetail::class, 'payroll_id');
    }

    public function campaign()
    {
        return $this->hasOne(Campaign::class, 'campaign_id');
    }

    /**
     * Filters query by payroll id.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param int $payrollId
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByPayroll($query, $payrollId)
    {
        return $query->where('payroll_id', $payrollId);
    }

    public function scopeByPayrollList($query, $payrollIds)
    {
        return $query->whereIn('payroll_id', $payrollIds);
    }

    public function scopeByClient($query, $clientId)
    {
        return $query->where('client_id', $clientId);
    }

    public function scopeByPayCycleId($query, $payCycleId)
    {
        return $query->where('pay_cycle_id', $payCycleId);
    }

    /**
     * Save the model and return it with the Pay Cycle relationship.
     * I DON'T KNOW IF THIS IS GOING TO WORK.
     *
     * @return Payroll
     */
    public function saveWithPayCycle()
    {
        $res = $this->save();
        if(!$res) return null;
        $result = Payroll::with('payCycle')->byPayroll($this->attributes['payroll_id'])->first();
        return $result;
    }
}
