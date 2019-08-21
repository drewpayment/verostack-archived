<?php

namespace App\Http\Controllers;

use App\Campaign;
use App\Http\AgentService;
use App\Http\Helpers;
use App\Http\Resources\ApiResource;
use App\Http\ResourceType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CampaignController extends Controller
{

	/**
	 * @var Helpers
	 */
	protected $helper;

	protected $agentService;

	/**
	 * CampaignController constructor.
	 *
	 * @param Helpers $_helper
	 * @param AgentService $agent_service
	 */
	public function __construct(Helpers $_helper, AgentService $agent_service) {
		$this->helper = $_helper;
		$this->agentService = $agent_service;
	}

	/**
	 * Gets all active campaigns for a logged in user.
	 *
	 * @param $clientId
	 *
	 * @param bool $activeOnly
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function getCampaigns($clientId, $activeOnly = null) {
		$result = new ApiResource();
		if(is_null($clientId))
			return $result->setToFail()->getResponse();

		return $result
			->setData(Campaign::with(['utilities', 'utilities.user'])->active($activeOnly)->byClientId($clientId)->get())
			->throwApiException()
			->getResponse();
	}

    public function getCampaignDetail($clientId, $campaignId)
    {
        $result = new ApiResource();

        $result->checkAccessByClient($clientId, Auth::user()->id)
			->mergeInto($result);

        if($result->hasError)
            return $result->throwApiException()
                ->getResponse();

        return $result->setData(Campaign::with(['utilities', 'utilities.user'])->byCampaign($campaignId)->first())
            ->throwApiException()
            ->getResponse();
    }

    /**
     * Get campaigns by client.
     * 
     * @param $clientId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCampaignsByClient($clientId)
    {
        $result = new ApiResource();
        return $result->setData(Campaign::with(['utilities'])->byClientId($clientId)->get())
            ->throwApiException()
            ->getResponse();
    }

	/**
	 * @param $clientId
	 * @param $agentId
	 *
	 * @return mixed
	 */
	public function getCampaignsByAgent($clientId, $agentId)
	{
		$result = new ApiResource();
		if(is_null($clientId))
			return $result->setToFail()->getResponse();

		$result
			->checkAccessByClient($clientId, Auth::user()->id)
			->mergeInto($result);

		$this->agentService->getAgentByAgentId($agentId)
			->mergeInto($result);

		if($result->hasError) return $result->getResponse();

		$campaigns = Campaign::active()
			->byClientId($clientId)
			->get();

		return $result->setData($campaigns)
			->throwApiException()
			->getResponse();
	}

	/**
	 * Check if a campaign exists with the provided name query parameter.
	 *
	 * @param $clientId
	 *
	 * @return mixed
	 */
	public function checkForExistingCampaignName($clientId) {
		$name = request()->input('name');
		$result = new ApiResource();

		if($clientId == null) {
			$result->setToFail();
			return $result->getResponse();
		}

		$exists = Campaign::byClientId($clientId)->byCampaignName($name)->get()->isNotEmpty();

		return $result->setData($exists)
			->throwApiException()
			->getResponse();
	}

	/**
	 * Save a new/existing campaign entity.
	 *
	 * @param Request $request
	 * @param $clientId
	 * @param $campaignId
	 *
	 * @return \Illuminate\Http\JsonResponse
	 * @throws \Exception
	 */
	public function saveCampaign($clientId, $campaignId = null, Request $request)
	{
		$result = new ApiResource();

		// Check to make sure that the user has rights to access and edit this client
		$result
			->checkAccessByClient($clientId, Auth::user()->id)
			->mergeInto($result);
		if($result->hasError)
			return $result->setToFail()->throwApiException()->getResponse();

		$data = $request->dto;

		if($campaignId == null && $data['campaignId'] == null)
		{
			$entity = new Campaign;
			$entity->client_id = $clientId ?? $data['clientId'];
			$entity->name = $data['name'];
			$entity->active = $data['active'];
			$entity->compensation = $data['compensation'];
			$entity->md_details = $data['mdDetails'];
			$entity->md_onboarding = $data['mdOnboarding'];
			$entity->md_other = $data['mdOther'];
		}
		else
		{
			$entity = Campaign::byCampaign($campaignId)->first();
			$entity->active = $data['active'];
			$entity->compensation = $data['compensation'];
			$entity->md_details = $data['mdDetails'];
			$entity->md_onboarding = $data['mdOnboarding'];
			$entity->md_other = $data['mdOther'];
		}

		$s = $entity->save();

		if(!$s) return $result->setToFail()->throwApiException()->getResponse();

		return $result->setData($entity)
			->throwApiException()
			->getResponse();
	}

}
