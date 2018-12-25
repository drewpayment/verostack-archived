<?php

namespace App\Http\Services;

use App\Utility;
use App\Http\Resources\ApiResource;
use Illuminate\Support\Facades\Auth;

class UtilityService 
{

    /**
     * Edit an existing Utility entity.
     *
     * @param Utility $u
     * @return ApiResource
     */
    public function editUtility($u)
    {
        $result = new ApiResource();

        $curr = Utility::byUtility($u['utilityId'])->first();

        if(is_null($curr)) return $result;

        $curr = $this->initUtility($u, $curr);

        $saved = $curr->save();

        if(!$saved) 
            return $result->setToFail()
                ->throwApiException('Failed to update the specified resource. Please try again.')
                ->getResponse();

        return $result->setData($curr);
    }

    /**
     * Create a new Utility entity.
     *
     * @param Utility $u
     * @return ApiResource
     */
    public function createUtility($u)
    {
        $result = new ApiResource();

        $curr = $this->initUtility($u);

        $saved = $curr->save();

        if(!$saved)
            return $result->setToFail()
                ->throwApiException('Failed to update the specified resource. Please try again.')
                ->getResponse();

        return $result->setData($curr);
    }

    /**
     * Creates/sets a Utility entity.
     *
     * @param Utility $u
     * @param Utility $curr
     * @return Utility
     */
    public function initUtility($u, $curr = null)
    {
        $result = new ApiResource();

        if(is_null($curr))
            $curr = new Utility;

        $curr->campaign_id = $u['campaignId'];
        $curr->commodity = $u['commodity'];
        $curr->agent_company_id = $u['agentCompanyId'];
        $curr->agent_company_name = $u['agentCompanyName'];
        $curr->utility_name = $u['utilityName'];
        $curr->meter_number = $u['meterNumber'];
        $curr->classification = $u['classification'];
        $curr->price = $u['price'];
        $curr->unit_of_measure = $u['unitOfMeasure'];
        $curr->term = $u['term'];
        $curr->is_active = $u['isActive'];
        $curr->modified_by = Auth::user()->id;

        return $curr;
    }

}