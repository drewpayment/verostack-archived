<?php


Route::prefix(['prefix' => 'clients', 'middleware' => 'auth:api'], function() {

	Route::get('/{clientId}/sales-statuses', 'SalesStatusController@getStatuses');

	Route::post('/{clientId}/sales-statuses', 'SalesStatusController@saveNewStatus');

	Route::post('/{clientId}/sales-statuses/{saleStatusId}', 'SalesStatusController@updateStatus');

});

Route::middleware(['auth:api'])->group(function() {

	Route::get('/clients/{clientId}/sale-statuses', 'SalesStatusController@getStatuses');

	Route::post("/clients/{clientId}/sale-statuses/{saleStatusId}", 'SalesStatusController@updateStatus');

	Route::post('/clients/{clientId}/sale-statuses/all', 'SalesStatusController@createStatuses');

});