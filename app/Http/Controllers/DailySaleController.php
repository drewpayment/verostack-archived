<?php

namespace App\Http\Controllers;

use App\DailySale;
use App\Http\Helpers;
use Illuminate\Http\Request;
use App\Http\Resources\ApiResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Services\ContactService;
use App\Http\Services\DailySaleService;

class DailySaleController extends Controller
{
	protected $helper;
	protected $service;
    protected $contactService;

	public function __construct(Helpers $_helper, DailySaleService $_service, ContactService $_contactService)
	{
		$this->helper = $_helper;
		$this->service = $_service;
        $this->contactService = $_contactService;
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
     * Get daily sales entities scoped to client, campaign and pay cycle. 
     *
     * @param $clientId int
     * @param $payCycleId int
     * @param $campaignId int
     * @return ApiResource
     */
    public function getSalesByPayCycle($clientId, $campaignId, $payCycleId = null)
    {
        $result = new ApiResource();

        $result
            ->checkAccessByClient($clientId, Auth::user()->id)
            ->mergeInto($result);

        if($result->hasError)
            return $result->throwApiException()->getResponse();

        return $this->service->getSalesByPayCycle($clientId, $payCycleId, $campaignId)
            ->mergeInto($result)
            ->throwApiException()
            ->getResponse();
    }

	/**
	 * Get a list of daily sales specifically by the related pay cycle entity.
	 *
	 * @param int $clientId
	 * @param int $payCycleId
	 * @return ApiResource
	 */
	public function getPaycheckDetailSales($clientId, $payCycleId)
	{
		$result = new ApiResource();

		$result
            ->checkAccessByClient($clientId, Auth::user()->id)
            ->mergeInto($result);

        if($result->hasError)
            return $result->throwApiException()->getResponse();

		return $this->service->getSalesRelatedByPayCycle($payCycleId)
			->mergeInto($result)
			->throwApiException()
			->getResponse();
	}

	/**
	 * @param $clientId
	 * @param $agentId
	 * @param $startDate
	 * @param $endDate
	 *
	 * @return mixed
	 */
	public function getDailySalesByAgent($clientId, $agentId, $startDate, $endDate)
	{
		$result = new ApiResource();

		$result
			->checkAccessByClient($clientId, Auth::user()->id)
			->mergeInto($result);

		if($result->hasError)
			return $result->throwApiException()
				->getResponse();

		$this->service->getDailySalesByAgent($agentId, $startDate, $endDate)
			->mergeInto($result);

		return $result
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
	 * @param $pod
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function checkUniquePodAccount($pod)
	{
		$existing = DailySale::byAccount($pod)->first();
		$result = is_null($existing);
		return response()->json($result);
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

    public function saveDailySaleWithContact(Request $request, $clientId, $campaignId)
    {
        $result = new ApiResource();

        $result
			->checkAccessByClient($clientId, Auth::user()->id)
			->mergeInto($result);

		if($result->hasError)
			return $result->throwApiException()->getResponse();

        $contact = null;

        if(is_null($request['contact']['contactId']) || $request['contact']['contactId'] == 0) {
            /** save/update our contact before we can do anything with the save because contact id is a dependency */
            $contactResult = $this->contactService->saveContact($request['contact']);

            if($contactResult->hasError)
                return $result
                    ->setToFail()
                    ->throwApiException()
                    ->getResponse();

            $res = $contactResult->getData();

            /** not entirely sure why, but the primary key seems to be defaulting to "id" instead of "contact_id"... */
            $request['contactId'] = $res['id'];
            $contact = $contactResult->getData();
        } else {
            $request['contactId'] = $request['contact']['contactId'];
            $contact = $request['contact'];
        }

        if(!is_null($request['dailySaleId']) && $request['dailySaleId'] > 0)
            $dailySaleRequest = $this->service->updateDailySale($request);
        else
            $dailySaleRequest = $this->service->saveNewDailySale($request);

        if($dailySaleRequest->hasError)
            return $result
                ->setToFail()
                ->throwApiException()
                ->getResponse();

        $sale = $dailySaleRequest->getData();
        $sale['contact'] = $contact;

        return $result->setData($sale)
            ->throwApiException()
            ->getResponse();
    }

}
