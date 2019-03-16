<?php


Route::middleware(['auth:api'])->group(function() {

    Route::get('clients/{clientId}/pay-cycles/include-closed/{includeClosed?}', 'PayCycleController@getPayCycles');

    Route::get('clients/{clientId}/pay-cycles/daily-sales', 'PayCycleController@getSalesByDate');

    Route::get('clients/{clientId}/pay-cycles/{payCycleId}', 'PayCycleController@getPayCycleSales')
        ->where(['clientId' => '[0-9]+', 'payCycleId' => '[0-9]+']);

    Route::delete('clients/{clientId}/pay-cycles/{payCycleId}/payrolls', 'PayCycleController@deletePayrollsByPayCycle')
        ->where(['clientId' => '[0-9]+', 'payCycleId' => '[0-9]+']);

    Route::post('clients/{clientId}/pay-cycles/{payCycleId}', 'PayCycleController@updatePayCycle')
        ->where(['payCycleId' => '[0-9]+']);

    Route::post('clients/{clientId}/pay-cycles', 'PayCycleController@newPayCycle');

    Route::post('clients/{clientId}/pay-cycles/{payCycleId}/sales', 'PayCycleController@attachSales');

    Route::get('clients/{clientId}/pay-cycles/last', 'PayCycleController@getLastPaycycle');

});