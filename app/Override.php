<?php

namespace App;

use App\Agent;
use App\PayrollDetail;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Override
 *
 * @property int $override_id
 * @property int $payroll_details_id
 * @property int $agent_id
 * @property int $units
 * @property float $amount
 * @property int $modified_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Agent $agent
 * @property-read \App\PayrollDetail $payrollDetails
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Override byOverride($id)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Override byOverrideList($ids)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Override newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Override newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Override query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Override whereAgentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Override whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Override whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Override whereModifiedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Override whereOverrideId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Override wherePayrollDetailsId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Override whereUnits($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Override whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Override extends Model
{

	protected $table = 'overrides';

	protected $primaryKey = 'override_id';

	protected $fillable = [
		'override_id',
		'invoice_id',
		'agent_id',
		'sales',
		'commission',
		'total',
		'issue_date',
		'week_ending'
	];
    
    public function payrollDetails()
    {
        return $this->belongsTo(PayrollDetail::class, 'payroll_details_id');
    }

    public function agent()
    {
        return $this->hasOne(Agent::class, 'agent_id', 'agent_id');
    }

    public function scopeByOverride($query, $id)
    {
        return $query->where('override_id', $id);
    }

    public function scopeByOverrideList($query, $ids)
    {
        return $query->whereIn('override_id', $ids);
    }

}
