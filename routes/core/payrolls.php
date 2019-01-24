<?php


Route::middleware(['auth:api'])->group(function() {

    Route::post('clients/{clientId}/payrolls', 'PayrollController@savePayrollList')
        ->where(['clientId' => '[0-9]+']);

    Route::get('clients/{clientId}/users/{userId}/payrolls', 'PayrollController@getPayrollList')
        ->where(['clientId' => '[0-9]+', 'userId' => '[0-9]+']);

    Route::post('clients/{clientId}/payrolls/auto-release', 'PayrollController@setAutoReleaseSettings')
        ->where(['clientId' => '[0-9]+']);

});