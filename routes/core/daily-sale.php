<?php

Route::middleware(['auth:api'])->group(function() {

	Route::get('/clients/{clientId}/daily-sales/from/{startDate}/to/{endDate}', 'DailySaleController@getDailySales')
		->where(['clientId' => '[0-9]+']);

	Route::post('/clients/{clientId}/daily-sales', 'DailySaleController@createDailySale')
		->where(['clientId' => '[0-9]+']);

});