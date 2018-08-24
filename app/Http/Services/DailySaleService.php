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

class DailySaleService {

	protected $helper;

	public function __construct(Helpers $_helper)
	{
		$this->helper = $_helper;
	}

	/**
	 * @param $clientId
	 * @param $startDate
	 * @param $endDate
	 *
	 * @return ApiResource
	 */
	public function getDailySalesByClientId($clientId, $startDate, $endDate)
	{
		$result = new ApiResource();
		return $result
			->setData(DailySale::byClient($clientId)
			                   ->byDateRange($startDate, $endDate)
			                   ->get());
	}

}