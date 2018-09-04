<?php
/**
 * Created by PhpStorm.
 * User: drewpayment
 * Date: 8/22/18
 * Time: 11:11 PM
 */

namespace App\Http\Services;


use App\DailySale;
use App\Http\Helpers;
use App\Http\Resources\ApiResource;
use Carbon\Carbon;

class DailySaleService {

	protected $helper;

	public function __construct(Helpers $_helper)
	{
		$this->helper = $_helper;
	}

	/**
	 * @param $clientId
	 * @param $campaignId
	 * @param $startDate
	 * @param $endDate
	 *
	 * @return ApiResource
	 */
	public function getDailySalesByClientId($clientId, $campaignId, $startDate, $endDate)
	{
		$result = new ApiResource();
		$startDate = Carbon::createFromFormat('Y-m-d', $startDate)->toDateTimeString();
		$endDate = Carbon::createFromFormat('Y-m-d', $endDate)->toDateTimeString();
		return $result
			->setData(DailySale::byClient($clientId)
				->byCampaign($campaignId)
                ->byDateRange($startDate, $endDate)
	            ->get());
	}

	/**
	 * Save a new daily sale entity.
	 *
	 * @param $sale
	 *
	 * @return ApiResource
	 */
	public function saveNewDailySale($sale)
	{
		$result = new ApiResource();

		$s = new DailySale;
		$s->agent_id = $sale->agentId;
		$s->client_id = $sale->clientId;
		$s->campaign_id = $sale->campaignId;
		$s->pod_account = $sale->podAccount;
		$s->first_name = $sale->firstName;
		$s->last_name = $sale->lastName;
		$s->street = $sale->street;
		$s->street2 = $sale->street2;
		$s->city = $sale->city;
		$s->state = $sale->state;
		$s->zip = $sale->zip;
		$s->status = $sale->status;
		$s->sale_date = $sale->saleDate;
		$s->last_touch_date = Carbon::now();
		$s->notes = $sale->notes;
		$s->updated_at = Carbon::now();
		$s->created_at = Carbon::now();

		$saved = $s->save();

		if($saved)
			return $result->setData($s);
		else
			return $result->setToFail();
	}

	/**
	 * @param $dailySaleId
	 *
	 * @return ApiResource
	 */
	public function deleteDailySale($dailySaleId)
	{
		$result = new ApiResource();

		$sale = DailySale::find($dailySaleId)->first();
		$deleted = $sale->delete();

		if($deleted)
			return $result->setToSuccess();
		else
			return $result->setToFail();
	}

}