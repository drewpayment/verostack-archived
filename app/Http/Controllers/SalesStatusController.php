<?php

namespace App\Http\Controllers;

use App\Http\Resources\ApiResource;
use App\Http\Services\SalesStatusService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SalesStatusController extends Controller
{

	protected $user;
	protected $service;

	public function __construct(SalesStatusService $_service)
	{
		$this->service = $_service;
		$this->user = Auth::user();
	}

	/**
	 * @param $clientId
	 *
	 * @return mixed
	 */
	public function getStatuses($clientId)
	{
		$result = new ApiResource();

		$user = Auth::user();

		$result
			->checkAccessByClient($clientId, $user->id)
			->mergeInto($result);

		if($result->hasError)
			return $result->getResponse();

		return $this->service
			->getStatuses($clientId)
			->mergeInto($result)
			->throwApiException()
			->getResponse();
	}

	/**
	 * @param Request $request
	 * @param $clientId
	 *
	 * @return ApiResource|mixed
	 */
	public function saveNewStatus(Request $request, $clientId)
	{
		$result = new ApiResource();
		$user = Auth::user();

		$result
			->checkAccessByClient($clientId, $this->$user->id)
			->mergeInto($result);

		if($result->hasError)
			return $result->getResponse();

		return $this->service
			->saveStatus($request->dto)
			->mergeInto($result);
	}

	/**
	 * @param Request $request
	 * @param $clientId
	 * @param $saleStatusId
	 *
	 * @return ApiResource|mixed
	 */
	public function updateStatus(Request $request, $clientId, $saleStatusId)
	{
		$result = new ApiResource();

		$result
			->checkAccessByClient($clientId, $this->user->id)
			->mergeInto($result);

		if($saleStatusId == null || $saleStatusId < 1)
			$result->setToFail();

		if($result->hasError)
			return $result->setToFail();

		return $this->service
			->updateStatus($request->dto)
			->mergeInto($result)
			->throwApiException()
			->getResponse();
	}

}
