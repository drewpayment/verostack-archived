<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\AgentSale
 *
 * @property int $agent_sale_id
 * @property int $invoice_id
 * @property int $agent_id
 * @property string|null $first_name
 * @property string|null $last_name
 * @property string|null $address
 * @property string|null $city
 * @property string|null $state
 * @property string|null $postal_code
 * @property int $status_type
 * @property float $amount
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AgentSale newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AgentSale newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AgentSale query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AgentSale whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AgentSale whereAgentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AgentSale whereAgentSaleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AgentSale whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AgentSale whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AgentSale whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AgentSale whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AgentSale whereInvoiceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AgentSale whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AgentSale wherePostalCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AgentSale whereState($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AgentSale whereStatusType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\AgentSale whereUpdatedAt($value)
 * @mixin \Eloquent
 */
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
