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

		return $result->setData(ImportModel::all());
    }
    
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

    public function saveExistingImportModel(Request $r) 
    {
        // TODO: need to do this.. lol 
    }

}