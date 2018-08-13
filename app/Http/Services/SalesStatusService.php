<?php

namespace App\Http\Services;


use App\Http\Helpers;
use App\Http\Resources\ApiResource;
use App\SaleStatus;

class SalesStatusService
{
	private $defaultClient = -1;

	protected $helper;

	public function SalesStatusService(Helpers $_helper)
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

	public function saveStatus($dto)
	{
		$result = new ApiResource();

		$status = new SaleStatus();
		$status->client_id = $dto->clientId;
		$status->name = $dto->name;
		$status->is_active = true;
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

		if(!$changed)
			return $result->setToFail();

		$curr->save();
		return $result->setData($curr);
	}

}