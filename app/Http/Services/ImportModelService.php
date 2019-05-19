<?php

namespace App\Http\Services;

use App\Http\Resources\ApiResource;
use App\ImportModel;

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

}