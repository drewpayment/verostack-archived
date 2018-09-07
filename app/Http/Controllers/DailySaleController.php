<?php

namespace App\Http\Controllers;

use App\Http\Helpers;
use App\Http\Resources\ApiResource;
use App\Http\Services\DailySaleService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DailySaleController extends Controller
{
	protected $helper;
	protected $service;

	public function __construct(Helpers $_helper, DailySaleService $_service)
	{
		$this->helper = $_helper;
		$this->service = $_service;
	}

	/**
	 * Get daily sales entities by client id.
	 *
	 * @param $clientId
	 * @param $campaignId
	 * @param $startDate
	 * @param $endDate
	 *
	 * @return mixed
	 */
	public function getDailySales($clientId, $campaignId, $startDate, $endDate)
	{
		$result = new ApiResource();

		$result
			->checkAccessByClient($clientId, Auth::user()->id)
			->mergeInto($result);

		if($result->hasError)
			return $result->getResponse();

		return $this->service->getDailySalesByClientId($clientId, $campaignId, $startDate, $endDate)
			->mergeInto($result)
			->throwApiException()
			->getResponse();
	}

	/**
	 * Create a new daily sale entity.
	 *
	 * @param Request $request
	 * @param $clientId
	 *
	 * @return mixed
	 */
	public function createDailySale(Request $request, $clientId)
	{
		$result = new ApiResource();

		$result
			->checkAccessByClient($clientId, Auth::user()->id)
			->mergeInto($result);

		if($result->hasError)
			return $result->getResponse();

		return $this->service->saveNewDailySale($request)
			->mergeInto($result)
			->throwApiException()
			->getResponse();
	}

	/**
	 * Update an existing daily sale entity.
	 *
	 * @param Request $request
	 * @param $clientId
	 * @param $dailySaleId
	 *
	 * @return mixed
	 */
	public function updateDailySale(Request $request, $clientId, $dailySaleId)
	{
		$result = new ApiResource();

		$result
			->checkAccessByClient($clientId, Auth::user()->id)
			->mergeInto($result);

		if($dailySaleId < 1)
			return $result
				->setToFail()
				->throwApiException()
				->getResponse();

		if($result->hasError)
			return $result->getResponse();

		return $this->service->updateDailySale($request)
			->mergeInto($result)
			->throwApiException()
			->getResponse();
	}

	/**
	 * Delete an existing daily sale.
	 *
	 * @param $clientId
	 * @param $dailySaleId
	 *
	 * @return mixed
	 */
	public function deleteDailySale($clientId, $dailySaleId)
	{
		$result = new ApiResource();

		$result
			->checkAccessByClient($clientId, Auth::user()->id)
			->mergeInto($result);

		if($result->hasError)
			return $result->getResponse();

		return $this->service->deleteDailySale($dailySaleId)
			->mergeInto($result)
			->throwApiException()
			->getResponse();
	}

}
