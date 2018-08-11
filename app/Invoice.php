<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

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
