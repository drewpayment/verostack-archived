<?php

namespace App;

use App\PayrollDetail;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Expense
 *
 * @property int $expense_id
 * @property int $payroll_details_id
 * @property int $agent_id
 * @property string|null $title
 * @property string|null $description
 * @property float $amount
 * @property string $expense_date
 * @property int|null $modified_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\PayrollDetail $payrollDetails
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Expense byExpense($id)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Expense byPayrollDetailsId($id)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Expense newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Expense newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Expense query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Expense whereAgentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Expense whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Expense whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Expense whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Expense whereExpenseDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Expense whereExpenseId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Expense whereModifiedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Expense wherePayrollDetailsId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Expense whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Expense whereUpdatedAt($value)
 * @mixin \Eloquent
 */
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
