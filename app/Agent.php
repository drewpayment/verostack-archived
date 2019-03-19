<?php

namespace App;

use App\Payroll;
use App\PayrollDetail;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Agent
 *
 * @property int $agent_id
 * @property int|null $user_id
 * @property string $first_name
 * @property string $last_name
 * @property int|null $manager_id
 * @property bool $is_manager
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Agent[] $children
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\SalesPairing[] $pairings
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\PayrollDetail[] $payrollDetails
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Payroll[] $payrolls
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\DailySale[] $sales
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\SalesPairing[] $salesPairings
 * @property-read \App\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Agent activeOnly($activeOnly)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Agent byActiveType($activeType)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Agent byAgentId($agentId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Agent byManager($managerId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Agent byUser($userId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Agent managerId($managerId)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Agent newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Agent newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Agent query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Agent whereAgentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Agent whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Agent whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Agent whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Agent whereIsManager($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Agent whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Agent whereManagerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Agent whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Agent whereUserId($value)
 * @mixin \Eloquent
 */
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
