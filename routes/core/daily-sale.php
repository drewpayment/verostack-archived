<?php

Route::middleware(['auth:api'])->group(function() {

	Route::get('/clients/{clientId}/daily-sales/campaigns/{campaignId}/from/{startDate}/to/{endDate}', 'DailySaleController@getDailySales')
		->where(['clientId' => '[0-9]+', 'campaignId' => '[0-9]+']);

	Route::post('/clients/{clientId}/daily-sales', 'DailySaleController@createDailySale')
		->where(['clientId' => '[0-9]+']);

	Route::post('/clients/{clientId}/daily-sales/{dailySaleId}', 'DailySaleController@updateDailySale')
		->where(['clientId' => '[0-9]+', 'dailySaleId' => '[0-9]+']);

	Route::delete('/clients/{clientId}/daily-sales/{dailySaleId}', 'DailySaleController@deleteDailySale')
		->where(['clientId' => '[0-9]+', 'dailySaleId' => '[0-9]+']);

});