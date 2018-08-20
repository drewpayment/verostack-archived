<?php


//Route::prefix(['prefix' => 'clients', 'middleware' => 'auth:api'], function() {
//
//	Route::get('/{clientId}/sales-statuses', 'SalesStatusController@getStatuses');
//
//	Route::post('/{clientId}/sales-statuses', 'SalesStatusController@saveNewStatus');
//
//	Route::post('/{clientId}/sales-statuses/{saleStatusId}', 'SalesStatusController@updateStatus');
//
//});

Route::middleware(['auth:api'])->group(function() {

	Route::get('/clients/{clientId}/sale-statuses', 'SalesStatusController@getStatuses')
		->where(['clientId' => '[0-9]+']);

	Route::post('/clients/{clientId}/sale-statuses/{saleStatusId}', 'SalesStatusController@updateStatus')
		->where(['saleStatusId' => '[0-9]+', 'clientId' => '[0-9]+']);

	Route::post('/clients/{clientId}/sale-statuses/all', 'SalesStatusController@createStatuses')
		->where(['clientId' => '[0-9]+']);

});