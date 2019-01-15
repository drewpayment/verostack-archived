<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Services\PayrollDetailsService;
use App\Http\Resources\ApiResource;

class PayrollDetailController extends Controller
{
    
    protected $service;


    public function __construct(PayrollDetailsService $_service) {
        $this->service = $_service;
    }

    // public function getExpensesAndOverrides($clientId, $payrollDetailsId)
    // {
    //     $result = new ApiResource();

    //     $expenses = Expense::

    //     return $result->throwApiException()
    //         ->getResponse();
    // }

}
