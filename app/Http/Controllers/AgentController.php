<?php

namespace App\Http\Controllers;

use App\Agent;
use App\Http\AgentService;
use App\Http\Helpers;
use App\Http\Resources\ApiResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AgentController extends Controller
{
	protected $service;
	protected $helpers;

	public function __construct(Helpers $_helpers, AgentService $agent_service)
	{
		$this->service = $agent_service;
		$this->helpers = $_helpers;
	}

	/**
	 * Get all agents by active state.
	 *
	 * @param bool $activeOnly
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function getAgents($activeOnly = null)
	{
		$result = new ApiResource();

		$activeOnly = is_null($activeOnly) ? true : false;

		return $result
			->setData(Agent::activeOnly($activeOnly)->get())
			->throwApiException()
			->getResponse();
	}

	/**
	 * Get a list of agents by associated client.
	 *
	 * @param $clientId
	 *
	 * @return mixed
	 */
	public function getAgentsByClient($clientId)
	{
		$result = new ApiResource();

		$result
			->checkAccessByClient($clientId, Auth::user()->id)
			->mergeInto($result);

		if($result->hasError)
			return $result->throwApiException()
				->getResponse();

		$this->service->getAgentsByClient($clientId)
			->mergeInto($result);

		return $result
			->throwApiException()
			->getResponse();
	}


	/**
	 * Update an agent entity.
	 *
	 * @param Request $request
	 * @param $agentId
	 *
	 * @return mixed
	 */
	public function updateAgent(Request $request, $agentId)
	{
		$result = new ApiResource();

		$curr = Agent::id($agentId)->first();

		$result
			->checkAccessByUser($curr->user_id)
			->mergeInto($result);

		$curr->first_name = $request->firstName;
		$curr->last_name = $request->lastName;
		$curr->manager_id = $request->managerId;
		$curr->is_active = $request->isActive;

		$saved = $curr->save();

		if(!$saved)
			return $result->setToFail()->getResponse();

		return $result
			->setData($curr)
			->throwApiException()
			->getResponse();
	}


	/**
	 * @param $managerId
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function getAgentsByManagerId($managerId)
	{
		$agents = Agent::activeOnly()->managerId($managerId)->get();

		$agents = $this->helpers->normalizeLaravelObject($agents->toArray());

		return response()->json($agents);
	}


	/**
	 * @param $userId
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function getAgentByUserId($userId)
	{
		$agents = Agent::userId($userId)->get();

		$agents = $this->helpers->normalizeLaravelObject($agents->toArray());

		return response()->json($agents);
	}

}
