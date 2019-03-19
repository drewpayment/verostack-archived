<?php

namespace App;

use App\Agent;
use App\Expense;
use App\Payroll;
use App\Override;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\PayrollDetail
 *
 * @property int $payroll_details_id
 * @property int $payroll_id
 * @property int $agent_id
 * @property int $sales
 * @property float|null $taxes
 * @property float $gross_total
 * @property float $net_total
 * @property int $modified_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Agent $agent
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Expense[] $expenses
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Override[] $overrides
 * @property-read \App\Payroll $payroll
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayrollDetail byPayrollDetailsId($id)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayrollDetail byPayrollId($id)
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayrollDetail newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayrollDetail newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\PayrollDetail onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayrollDetail query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayrollDetail whereAgentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayrollDetail whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayrollDetail whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayrollDetail whereGrossTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayrollDetail whereModifiedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayrollDetail whereNetTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayrollDetail wherePayrollDetailsId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayrollDetail wherePayrollId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayrollDetail whereSales($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayrollDetail whereTaxes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PayrollDetail whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\PayrollDetail withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\PayrollDetail withoutTrashed()
 * @mixin \Eloquent
 */
class PayrollDetail extends Model
{
    use SoftDeletes;

    protected $primaryKey = 'payroll_details_id';

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function agent()
    {
        return $this->belongsTo(Agent::class, 'agent_id');
    }

    public function payroll()
    {
        return $this->belongsTo(Payroll::class, 'payroll_id');
    }

    public function expenses()
    {
        return $this->hasMany(Expense::class, 'payroll_details_id');
    }

    public function overrides()
    {
        return $this->hasMany(Override::class, 'payroll_details_id');
    }

    public function scopeByPayrollDetailsId($query, $id)
    {
        return $query->where('payroll_details_id', $id);
    }

    public function scopeByPayrollId($query, $id)
    {
        return $query->where('payroll_id', $id);
    }

}
