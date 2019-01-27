<?php

namespace App;

use App\PayrollDetail;
use Illuminate\Database\Eloquent\Model;

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

    public function scopeByOverride($query, $id)
    {
        return $query->where('override_id', $id);
    }

    public function scopeByOverrideList($query, $ids)
    {
        return $query->whereIn('override_id', $ids);
    }

}
