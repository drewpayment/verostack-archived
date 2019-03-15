<?php

namespace App\Http;

use App\Http\Resources\ApiResource;
use App\SalesPairing;

class SalesPairingsService {

	protected $helper;

	public function __construct(Helpers $_helper) {
		$this->helper = $_helper;
	}

	/**
	 * @param $salesPairingsId
	 *
	 * @return ApiResource
	 */
	public function getSalesPairingsById($salesPairingsId)
	{
		$result = new ApiResource();
		return $result
			->setData(SalesPairing::find($salesPairingsId)->first());
	}

	/**
	 * @return ApiResource
	 */
	public function getAllSalesPairings()
	{
		$result = new ApiResource();
		return $result
			->setData(SalesPairing::all());
	}

	/**
	 * @param $campaignId
	 *
	 * @return ApiResource
	 */
	public function getSalesPairingsByCampaignId($campaignId)
	{
		$result = new ApiResource();
		return $result
			->setData(SalesPairing::campaignId($campaignId)->get());
	}

	/**
	 * @param $clientId
	 *
	 * @return ApiResource
	 */
	public function getSalesPairingsByClientId($clientId)
	{
		$result = new ApiResource();
		return $result
			->setData(SalesPairing::clientId($clientId)->get());
	}

	/**
	 * @param $agentId
	 *
	 * @return ApiResource
	 */
	public function getSalesPairingsByAgentId($agentId, $clientId)
	{
		$result = new ApiResource();
		return $result
			->setData(SalesPairing::clientId($clientId)->agentId($agentId)->get());
	}

	/**
	 * @param $pairings
	 *
	 * @return ApiResource
	 */
	public function saveSalesPairingsArray($pairings)
	{
		$result = new ApiResource();
		$resultPairings = [];

		foreach($pairings as $pairing)
		{
			$resultPairings[] = $this->helper->normalizeLaravelObject($this->saveSalesPairing($pairing));
		}

		return $result->setData($resultPairings);
	}

    /**
     * @param $pairing
     * @return ApiResource
     */
    public function saveSalesPairing($pairing)
    {
        $result = new ApiResource();
        $model = SalesPairing::salesPairings($pairing['salesPairingsId'])->first();
        if(is_null($model))
            $model = new SalesPairing;

        $model->agent_id = $pairing['agentId'];
        $model->campaign_id = $pairing['campaignId'];
        $model->commission = $pairing['commission'];
        $model->sales_id = $pairing['salesId'];
        $model->client_id = $pairing['clientId'];

        $success = $model->save();
        if(!$success) return $result->setToFail();
        return $result->setData($model);
    }

	/**
	 * Delete an existing sales pairings entity by id.
	 *
	 * @param $id
	 *
	 * @return ApiResource
	 */
	public function deleteSalesPairings($id)
	{
		$result = new ApiResource();

		$pairing = SalesPairing::salesPairings($id)->first();

		$success = $pairing->delete();

		if($success)
			return $result->setToSuccess();
		else
			return $result->setToFail();
	}

}