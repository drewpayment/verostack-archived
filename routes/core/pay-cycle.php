<?php


Route::middleware(['auth:api'])->group(function() {

    Route::get('clients/{clientId}/pay-cycles/include-closed/{includeClosed?}', 'PayCycleController@getPayCycles');

    Route::get('clients/{clientId}/pay-cycles/daily-sales', 'PayCycleController@getSalesByDate');

    Route::get('clients/{clientId}/pay-cycles/{payCycleId}', 'PayCycleController@getPayCycleSales');

});