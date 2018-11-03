<?php

namespace App;

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



}
