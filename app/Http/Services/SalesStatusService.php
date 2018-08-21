<?php

namespace App\Http\Services;


use App\Http\Helpers;
use App\Http\Resources\ApiResource;
use App\SaleStatus;

class SalesStatusService
{
	private $defaultClient = 0;

	protected $helper;

	public function __construct(Helpers $_helper)
	{
		$this->helper = $_helper;
	}

	public function getStatuses($clientId)
	{
		$result = new ApiResource();

		$statuses = SaleStatus::byClientId($clientId)->get();

		if($statuses->count() < 1)
		{
			$statuses = SaleStatus::byClientId($this->defaultClient)->get();
		}

		return $result
			->setData($statuses);
	}

	/**
	 * @param $dto
	 *
	 * @return ApiResource
	 */
	public function saveStatus($dto)
	{
		$result = new ApiResource();

		$status = new SaleStatus();
		$status->client_id = $dto->clientId;
		$status->name = $dto->name;
		$status->is_active = $dto->isActive;
		$res = $status->save();

		if(!$res)
			return $result->setToFail();

		return $result->setData($status);
	}

	public function updateStatus($dto)
	{
		$result = new ApiResource();
		$changed = false;

		$curr = SaleStatus::bySaleStatusId($dto->saleStatusId)->first();

		if($curr->name != $dto->name)
		{
			$curr->name = $dto->name;
			$changed = true;
		}

		if($curr->is_active != $dto->isActive)
		{
			$curr->is_active = $dto->isActive;
			$changed = true;
		}

		if(!$changed) return $result;

		$saveResult = $curr->save();

		if(!$saveResult) $result->setToFail();

		return $result->setData($curr);
	}

	/**
	 * Creates new entities from a list of entities, assigning them new PKs.
	 *
	 * @param $clientId
	 * @param array $dtoList
	 *
	 * @return ApiResource
	 */
	public function convertDefaultStatuses($clientId, array $dtoList)
	{
		$result = new ApiResource();
		$inserts = [];

		if(!is_array($dtoList))
			return $result->setToFail();

		foreach($dtoList as $d)
		{
			$pending = [
				'name' => $d['name'],
				'client_id' => $clientId,
				'is_active' => $d['isActive']
			];

			$saved = SaleStatus::updateOrCreate($pending);
			array_push($inserts,
				$this->helper->normalizeLaravelObject($saved->toArray())
			);
		}

		return $result->setData($inserts);
	}

}