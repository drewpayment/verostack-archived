<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\ApiResource;

class ProcessImportController extends Controller
{
    
    /**
     * Saves a record to keep track that a report event happened to bring sales 
     * records into the system. 
     *
     * @param Request $request
     * @return void
     */
    public function uploadReport(Request $request)
    {
        $result = new ApiResource();
    }

}
