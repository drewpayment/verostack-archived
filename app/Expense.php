<?php

namespace App;

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

}
