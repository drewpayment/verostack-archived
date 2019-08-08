<?php

namespace App\Http\Services;

use App\Http\Resources\ApiResource;
use App\ImportModel;
use Illuminate\Http\Request;

class ImportModelService 
{

	/**
	 * Get import models.
	 *
	 * @return ApiResource
	 */
	public function getImportModels() {
		$result = new ApiResource();

		return $result->setData(ImportModel::with('user')->get());
    }
    
    /**
     * Save a new Import Model.
     *
     * @param Request $r
     * @return \App\Http\Resources\ApiResource
     */
    public function saveNewImportModel(Request $r) 
    {
        $result = new ApiResource();

        $mappings = json_encode($r->map);

        $m = new ImportModel([
            'client_id' => $r->clientId,
            'shortDesc' => $r->shortDesc,
            'fullDesc' => $r->fullDesc,
            'map' => $mappings,
            'user_id' => $r->userId
        ]);

        $saved = $m->save();

        if (!$saved) {
            return $result->setToFail();
        }

        return $result->setData($m);
    }

    /**
     * Update an existing ImportModel.
     *
     * @param Request $r
     * @return App\Http\Resources\ApiResource
     */
    public function saveExistingImportModel(Request $r) 
    {
        $result = new ApiResource();

        $m = ImportModel::find($r->importModelId);
        $m->shortDesc = $r->shortDesc;
        $m->fullDesc = $r->fullDesc;
        $m->map = json_encode($r->map);
        $m->user_id = $r->userId;

        $saved = $m->save();

        if (!$saved) return $result->setToFail();

        return $result->setData($m);
    }

}