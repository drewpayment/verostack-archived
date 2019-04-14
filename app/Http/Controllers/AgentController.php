<?php

namespace App\Http\Controllers;

use App\User;
use App\Agent;
use App\Http\Helpers;
use App\Http\AgentService;
use Illuminate\Http\Request;
use App\Http\Resources\ApiResource;
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
	 * Get all agents by active state by client, restricted to Company Admins and System Admins.
	 *
	 * @param bool $activeOnly
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function getAgents($activeOnly = null)
	{
		$result = new ApiResource();

		$activeOnly = is_null($activeOnly) ? true : false;

		$user = Auth::user();
		$user = $user->load(['sessionUser', 'role']);
		$clientId = $user->sessionUser->session_client;

		$query = Agent::with('salesPairings')
			->byClient($clientId)
			->activeOnly($activeOnly);

		// if the user isn't a company admin, they shouldn't be able to make this call... 
		if ($user->role->role == 3 || $user->role->role == 4) {
			$query->byManager($user->id);
		} else if ($user->role->role < 6 && $user->role->role != 5) {
			return response()->json([]);
		}

		$agents = $query->get();

		return $result
			->setData($agents)
			->throwApiException()
			->getResponse();
	}

	/**
	 * Get a list of users (with associated agent entity) by associated client.
	 *
	 * @param $clientId
	 *
	 * @return mixed
	 */
	public function getUserAgentsByClient($clientId)
	{
		$result = new ApiResource();

		$result
			->checkAccessByClient($clientId)
			->mergeInto($result);

		if($result->hasError)
			return $result->throwApiException()
				->getResponse();

		$this->service->getUserAgentsByClient($clientId)
			->mergeInto($result);

		return $result
			->throwApiException()
			->getResponse();
	}

    public function getAgentsByClient($clientId)
    {
        $result = new ApiResource();

        $result
			->checkAccessByClient($clientId, Auth::user()->id)
			->mergeInto($result);

		if($result->hasError)
			return $result->throwApiException()
				->getResponse();

        $users = $this->service->getUserAgentsByClient($clientId)->getData();

        $resultAgents = [];
        $agents = array_filter(array_map(function(array $arr) {
            return $arr['agent'];
        }, $users), function($agent) { return !is_null($agent); });

        foreach($agents as $a) {
            $resultAgents[] = $a;
        }

        return $result->overrideData($resultAgents)
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

		$curr = Agent::byAgentId($agentId)->first();

		$user = Auth::user();
		$clientId = $user->load('sessionUser')->sessionUser->session_client;

		$result->checkAccessByClient($clientId, $user->id)
			->mergeInto($result);

		$result
			->checkAccessByUser($curr->user_id)
			->mergeInto($result);

		if ($result->hasError)
			return $result->throwApiException()
				->getResponse();

		if (!is_null($request->firstName) && $request->firstName != $curr->first_name)
			$curr->first_name = $request->firstName;
		if (!is_null($request->lastName) && $request->lastName != $curr->last_name)
			$curr->last_name = $request->lastName;
		if (!is_null($request->managerId) && $request->managerId != $curr->manager_id)
			$curr->manager_id = $request->managerId;
		if (!is_null($request->isActive) && $request->isActive != $curr->is_active)
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
	public function getAgentByUser($clientId, $userId)
	{
        $result = new ApiResource();

        $result
            ->checkAccessByClient($clientId, Auth::user()->id)
            ->mergeInto($result);

        if($result->hasError)
            return $result;

        $agent = User::with('agent')->userId($userId)->first()->agent;

        if($agent == null)
            return $result->setToFail()->throwApiException()->getResponse();

        return $result->setData($agent)
            ->throwApiException()
            ->getResponse();
	}

}
