<?php

namespace App;

use App\Payroll;
use App\PayrollDetail;
use Illuminate\Database\Eloquent\Model;

class Agent extends Model
{

	protected $table = 'agents';

	protected $primaryKey = 'agent_id';

	protected $fillable = [
		'agent_id',
		'user_id',
		'first_name',
		'last_name',
		'manager_id',
		'is_manager',
		'is_active'
	];

	public function getIsActiveAttribute($value)
	{
		return $value == 1;
	}

	public function setIsActiveAttribute($value)
	{
		$this->attributes['is_active'] = $value == true ? 1 : 0;
	}

	public function getIsManagerAttribute($value)
	{
		return $value == 1;
	}

	public function setIsManagerAttribute($value)
	{
		$this->attributes['is_manager'] = $value == true ? 1 : 0;
	}

	/**
	 * Filter entities by agent id.
	 *
	 * @param $query \Illuminate\Database\Eloquent\Builder
	 * @param $agentId int
	 *
	 * @return mixed \Illuminate\Database\Eloquent\Builder
	 */
	public function scopeByAgentId($query, $agentId)
	{
		return $query->where('agent_id', $agentId);
	}

    public function scopeByUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

	/**
	 * Get a list of agents by their manager's agent_id.
	 *
	 * @param $query \Illuminate\Database\Eloquent\Builder
	 * @param $managerId int
	 *
	 * @return mixed \Illuminate\Database\Eloquent\Builder
	 */
	public function scopeManagerId($query, $managerId)
	{
		return $query->where('manager_id', $managerId);
	}

    /**
     * Same as scopeManagerId, but for some reason I used terrible naming convention.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param int $managerId
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByManager($query, $managerId)
    {
        return $query->where('manager_id', $managerId);
    }

	/**
	 * Filter agents by active status.
	 *
	 * @param $query \Illuminate\Database\Eloquent\Builder
	 * @param $activeType
	 *
	 * @return mixed \Illuminate\Database\Eloquent\Builder
	 */
	public function scopeByActiveType($query, $activeType)
	{
		$activeType = $activeType ? 1 : 0;
		return $query->where('is_active', $activeType);
	}

	/**
	 *
	 *
	 * @param $query \Illuminate\Database\Eloquent\Builder
	 * @param $activeOnly
	 *
	 * @return mixed \Illuminate\Database\Eloquent\Builder
	 */
	public function scopeActiveOnly($query, $activeOnly)
	{
		if($activeOnly)
		{
			return $query->where('is_active', 1);
		}
		else
		{
			return $query;
		}
	}

	public function salesPairings()
	{
		return $this->hasMany(SalesPairing::class);
	}

    public function pairings()
    {
        return $this->hasMany(SalesPairing::class, 'agent_id');
    }

	/**
	 * Agent has one user record.
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasOne
	 */
	public function user()
	{
		return $this->hasOne(User::class, 'id', 'user_id');
	}

    /**
     * Manager of the following agents...
     *
     * @return void
     */
    public function children()
    {
        return $this->hasMany(Agent::class, 'manager_id', 'user_id');
    }

    public function payrollDetails()
    {
        return $this->hasMany(PayrollDetail::class, 'payroll_details_id');
    }

    public function payrolls()
    {
        return $this->hasManyThrough(Payroll::class, PayrollDetail::class);
    }

	public function sales()
	{
		return $this->hasMany(DailySale::class, 'agent_id');
	}

}
