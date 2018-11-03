<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AgentSale extends Model
{

	protected $table = 'agent_sales';

	protected $primaryKey = 'agent_sale_id';

	protected $fillable = [
		'agent_sale_id',
		'invoice_id',
		'agent_id',
		'first_name',
		'last_name',
		'address',
		'city',
		'state',
		'postal_code',
		'status_type',
		'amount'
	];

}
