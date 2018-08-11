<?php

namespace App\Http\Controllers;

use App\Http\Resources\ApiResource;
use App\Http\SalesPairingsService;
use Illuminate\Http\Request;

class SalesPairingsController extends Controller
{

	protected $service;

	public function __construct(SalesPairingsService $sales_pairings_service)
	{
		$this->service = $sales_pairings_service;
	}

//	/**
//	 * @param $agentId
//	 *
//	 * @return mixed
//	 */
//	public function getSalesPairingsByAgent($agentId)
//	{
//		$result = new ApiResource();
//		return $this->service
//			->getSalesPairingsByAgentId($agentId)
//			->mergeInto($result)
//			->throwApiException()
//			->getResponse();
//	}

	/**
	 * @param null $salesPairingsId
	 *
	 * @return ApiResource
	 */
	public function getSalesPairingsBySalesPairingsId($salesPairingsId = null)
	{
		$result = new ApiResource();

		if(isset($salesPairingsId))
		{
			return $this->service
				->getSalesPairingsById($salesPairingsId)
				->mergeInto($result)
				->throwApiException()
				->getResponse();
		}
		else
		{
			return $this->service
				->getAllSalesPairings()
				->mergeInto($result)
				->throwApiException()
				->getResponse();
		}
	}

	/**
	 * @param $clientId
	 *
	 * @return mixed
	 */
	public function getSalesPairingsByClient($clientId)
	{
		$result = new ApiResource();
		return $this->service
			->getSalesPairingsByClientId($clientId)
			->mergeInto($result)
			->throwApiException()
			->getResponse();
	}

	/**
	 * @param $campaignId
	 *
	 * @return mixed
	 */
	public function getSalesPairingsByCampaign($campaignId)
	{
		$result = new ApiResource();
		return $this->service
			->getSalesPairingsByCampaignId($campaignId)
			->mergeInto($result)
			->throwApiException()
			->getResponse();
	}


	/**
	 * Should be most commonly used if finding sales pairings by agent.
	 *
	 * @param $clientId
	 * @param $agentId
	 *
	 * @return mixed
	 */
	public function getSalesPairings($clientId, $agentId)
	{
		$result = new ApiResource();
		return $this->service
			->getSalesPairingsByAgentId($agentId, $clientId)
			->mergeInto($result)
			->throwApiException()
			->getResponse();
	}


	/**
	 * @param Request $r
	 *
	 * @return mixed
	 */
	public function saveAgentSalesPairings(Request $r)
	{
		$result = new ApiResource();
		return $this->service
			->saveSalesPairingsArray($r->pairings)
			->mergeInto($result)
			->throwApiException()
			->getResponse();
	}

	/**
	 * Delete an existing sales pairings entity.
	 *
	 * @param $salesPairingsId
	 *
	 * @return mixed
	 */
	public function deleteAgentSalesPairings($salesPairingsId)
	{
		return $this->service
			->deleteSalesPairings($salesPairingsId)
			->throwApiException()
			->getResponse();
	}

}
