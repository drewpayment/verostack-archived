<?php

namespace App\Http\Controllers;

use App\RoleType;
use Illuminate\Http\Request;
use App\Http\Resources\ApiResource;

class RoleTypeController extends Controller
{
    
    public function getRoleTypes(Request $request)
    {
        $result = new ApiResource();
        $includeInactive = filter_var($request->inactive, FILTER_VALIDATE_BOOLEAN);
        return $result
            ->setData(RoleType::byActiveStatus($includeInactive)->get())
            ->throwApiException()
            ->getResponse();
    }

}
