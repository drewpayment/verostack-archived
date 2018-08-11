<?php

namespace App\Http\Controllers;

use App\Campaign;
use App\Http\Helpers;
use App\Http\Resources\ApiResource;
use App\Http\ResourceType;
use Illuminate\Http\Request;

class CampaignController extends Controller
{

	/**
	 * @var Helpers
	 */
	protected $helper;

	/**
	 * CampaignController constructor.
	 *
	 * @param Helpers $_helper
	 */
	public function __construct(Helpers $_helper) {
		$this->helper = $_helper;
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
	public function getCampaigns($clientId, $activeOnly = true) {
		$activeOnly = is_string($activeOnly)
			? strtolower($activeOnly) === 'true'
			: $activeOnly;
		$result = new ApiResource();
		if($clientId == null) {
			$result->setToFail();
			return $result->getResponse();
		}

		return $result
			->setData(Campaign::active($activeOnly)->byClientId($clientId)->get())
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
		$user = $request->user();

		// Check to make sure that the user has rights to access and edit this client
		$this->helper->checkAccessById(new ResourceType(ResourceType::Client), $user->id, $clientId)
		             ->mergeInto($result);
		if($result->hasError) return $result->throwApiException()->getResponse();

		$data = $request->dto;

		$entity = Campaign::firstOrNew([
			'campaign_id' => $campaignId != null ? $campaignId : $data['campaignId'],
			'client_id' => $clientId != null ? $clientId : $data['clientId']
		]);

		$entity->name = $data['name'];
		$entity->active = $data['active'];
		$entity->save();

		return $result->setData(
			$this->helper->normalizeLaravelObject($entity->toArray())
		)->throwApiException()->getResponse();
	}

}
