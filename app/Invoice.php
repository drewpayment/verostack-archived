<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Invoice
 *
 * @property int $invoice_id
 * @property int $agent_id
 * @property int $campaign_id
 * @property string $issue_date
 * @property string $week_ending
 * @property int|null $modified_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice byAgentId($id)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice byCampaignId($id)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice byIssueDate($date)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice whereAgentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice whereCampaignId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice whereInvoiceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice whereIssueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice whereModifiedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Invoice whereWeekEnding($value)
 * @mixin \Eloquent
 */
class Invoice extends Model
{

	protected $table = 'invoices';

	protected $primaryKey = 'invoice_id';

	protected $fillable = [
		'invoice_id',
		'agent_id',
		'agent_sale_id',
		'override_id',
		'expense_id',
		'campaign_id',
		'issue_date',
		'week_ending',
		'modified_by'
	];


	/**
	 * @param $query \Illuminate\Database\Eloquent\Builder
	 * @param $id int
	 *
	 * @return mixed \Illuminate\Database\Eloquent\Builder
	 */
	public function scopeByAgentId($query, $id)
	{
		if($id === 0) return $query->where('agent_id', '<>', 0);
		return $query->where('agent_id', $id);
	}

	/**
	 * @param $query \Illuminate\Database\Eloquent\Builder
	 * @param $id int
	 *
	 * @return mixed \Illuminate\Database\Eloquent\Builder
	 */
	public function scopeByCampaignId($query, $id)
	{
		if($id === 0) return $query->where('campaign_id', '<>', 0);
		return $query->where('campaign_id', $id);
	}

	/**
	 * @param $query \Illuminate\Database\Eloquent\Builder
	 * @param $date string
	 *
	 * @return mixed \Illuminate\Database\Eloquent\Builder
	 */
	public function scopeByIssueDate($query, $date)
	{
		if($date === 0) return $query->where('issue_date', '<>', null);
		return $query->where('issue_date', $date);
	}

}
