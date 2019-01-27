<?php

namespace App;

use App\PayrollDetail;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{

	protected $table = 'expenses';

	protected $primaryKey = 'expense_id';

	protected $fillable = [
		'expense_id',
		'invoice_id',
		'agent_id',
		'title',
		'description',
		'amount',
		'modified_by'
	];

    public function payrollDetails()
    {
        return $this->belongsTo(PayrollDetail::class, 'payroll_details_id');
    }

    public function scopeByPayrollDetailsId($query, $id)
    {
        return $query->where('payroll_details_id', $id);
    }

    public function scopeByExpense($query, $id)
    {
        return $query->where('expense_id', $id);
    }

}
