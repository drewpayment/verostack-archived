<?php

namespace App\Http\Controllers;

use App\Http\Services;
use Illuminate\Http\Request;
use App\Http\Resources\ApiResource;
use App\Http\Services\ImportModelService;

class ImportModelController extends Controller
{
    protected $service;

    public function __construct(ImportModelService $_service)
    {
        $this->service = $_service;
    }

    public function getImportModels() 
    {
        $result = new ApiResource();
            
        $this->service->getImportModels()->mergeInto($result);

        return $result->throwApiException()->getResponse();
    }

    public function saveImportModel()
    {
        $result = new ApiResource();

        
    }
}
