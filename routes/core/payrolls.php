<?php


Route::middleware(['auth:api'])->group(function() {

    Route::post('clients/{clientId}/payrolls', 'PayrollController@savePayrollList')
        ->where(['clientId' => '[0-9]+']);

});