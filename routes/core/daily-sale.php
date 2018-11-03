<?php

Route::middleware(['auth:api'])->group(function() {

	Route::get('/clients/{clientId}/daily-sales/campaigns/{campaignId}/from/{startDate}/to/{endDate}', 'DailySaleController@getDailySales')
		->where(['clientId' => '[0-9]+', 'campaignId' => '[0-9]+']);

	Route::get('/clients/{clientId}/daily-sales/agents/{agentId}/from/{startDate}/to/{endDate}', 'DailySaleController@getDailySalesByAgent')
		->where(['clientId' => '[0-9]+', 'agentId' => '[0-9]+']);

	Route::post('/clients/{clientId}/daily-sales', 'DailySaleController@createDailySale')
		->where(['clientId' => '[0-9]+']);

	Route::post('/clients/{clientId}/daily-sales/{dailySaleId}', 'DailySaleController@updateDailySale')
		->where(['clientId' => '[0-9]+', 'dailySaleId' => '[0-9]+']);

	Route::delete('/clients/{clientId}/daily-sales/{dailySaleId}', 'DailySaleController@deleteDailySale')
		->where(['clientId' => '[0-9]+', 'dailySaleId' => '[0-9]+']);

	Route::get('/pods/{pod}', 'DailySaleController@checkUniquePodAccount')
		->where(['pod' => '[0-9]+']);

});