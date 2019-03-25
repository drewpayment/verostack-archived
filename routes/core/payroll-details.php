<?php

/**
 * Some of the calls from paycheck.service.ts get caught here... 
 */
Route::middleware(['auth:api'])->group(function() {

    // Route::get('clients/{clientId}/payroll-details/{payrollDetailsId}/expenses-and-overrides', 'PayrollDetailsController@getExpensesAndOverrides')
    //     ->where(['clientId' => '[0-9]+', 'payrollDetailsId' => '[0-9]+']);

    // Route::get('clients/{clientId}/payroll-details/{payrollDetailsId}', 'PayrollDetailController@getPaychecksByDetail')
    //     ->where(['clientId' => '[0-9]+', 'payrollDetailsId' => '[0-9]+']);

    Route::get('clients/{clientId}/payroll-details', 'PayrollDetailController@getPaychecks');

    Route::get('clients/{clientId}/payroll-details/{payrollDetailsId}/generate-pdf', 'PayrollDetailController@runHeadlessDetailScript');

    Route::post('clients/{clientId}/agents/{agentId}/earnings', 'PayrollDetailController@getPaycheckList');

});

Route::get('clients/{clientId}/users/{userId}/payroll-details/{payrollDetailId}/{headless}', 
    'PayrollDetailController@getHeadlessPaycheckDetail');