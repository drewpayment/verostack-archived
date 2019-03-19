<?php

namespace App;

use App\Agent;
use App\Campaign;
use App\PayCycle;
use App\PayrollDetail;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Payroll
 *
 * @property int $payroll_id
 * @property int $pay_cycle_id
 * @property int $client_id
 * @property int $campaign_id
 * @property string|null $week_ending
 * @property bool $is_released
 * @property string|null $release_date
 * @property bool $is_automated
 * @property string|null $automated_release
 * @property int $modified_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Campaign $campaign
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\PayrollDetail[] $details
 * @property-read \App\PayCycle $payCycle
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll byClient($clientId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll byPayCycleId($payCycleId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll byPayroll($payrollId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll byPayrollList($payrollIds)
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\Payroll onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll whereAutomatedRelease($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll whereCampaignId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll whereIsAutomated($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll whereIsReleased($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll whereModifiedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll wherePayCycleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll wherePayrollId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll whereReleaseDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Payroll whereWeekEnding($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Payroll withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Payroll withoutTrashed()
 * @mixin \Eloquent
 */
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
