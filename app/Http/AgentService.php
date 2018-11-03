<?php
/**
 * Created by PhpStorm.
 * User: drewpayment
 * Date: 7/7/18
 * Time: 11:16 PM
 */

namespace App\Http;


use App\Agent;
use App\Client;
use App\Http\Resources\ApiResource;

class AgentService {

	protected $helper;

	public function __construct(Helpers $_helpers) {
		$this->helper = $_helpers;
	}

	public function saveNewAgentEntity($a)
	{
		$result = new ApiResource();

		$agent = new Agent();
		$agent->user_id = $a['userId'];
		$agent->first_name = $a['firstName'];
		$agent->last_name = $a['lastName'];
		$agent->manager_id = $a['managerId'];
		$agent->is_manager = (bool)$a['isManager'] ? 1 : 0;
		$agent->is_active = true;

		$success = $agent->save();

		if(!$success)
			return $result->setToFail();

		$result->setToSuccess();

		return $result;
	}

	/**
	 * @param $agentId
	 *
	 * Get an agent by their agent id.
	 *
	 * @return ApiResource
	 */
	public function getAgentByAgentId($agentId)
	{
		$result = new ApiResource();
		return $result->setData(Agent::byAgentId($agentId)->first());
	}

	/**
	 * Get agents by an associated client.
	 *
	 * @param $clientId
	 *
	 * @return ApiResource
	 */
	public function getAgentsByClient($clientId)
	{
		$result = new ApiResource();

		$agents = Client::with(['users.agent', 'users.detail', 'users.agent.pairings'])
	                    ->clientId($clientId)
						->first()
						->users;



		return $result->setData($agents);
	}

}