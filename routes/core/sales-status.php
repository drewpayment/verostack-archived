<?php


Route::prefix(['prefix' => 'clients', 'middleware' => 'auth:api'], function() {

	Route::get('/{clientId}/sales-statuses', 'SalesStatusController@getStatuses');

	Route::post('/{clientId}/sales-statuses', 'SalesStatusController@saveNewStatus');

	Route::post('/{clientId}/sales-statuses/{saleStatusId}', 'SalesStatusController@updateStatus');

});