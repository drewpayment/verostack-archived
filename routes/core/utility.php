<?php


Route::middleware(['auth:api'])->group(function() {

    Route::get('clients/{clientId}/utilities/{utilityId}', 'UtilityController@getUtility');

    Route::post('clients/{clientId}/utilities/{utilityId}', 'UtilityController@editUtility');

    Route::post('clients/{clientId}/utilities', 'UtilityController@saveNewUtility');

    Route::get('clients/{clientId}/utilities', 'UtilityController@getUtilitiesByClient');

});