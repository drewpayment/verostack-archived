<?php


/**
 * SALES PAIRINGS CONTROLLER ROUTES
 *
 */

Route::group(['prefix' => 'sales-pairings', 'middleware' => 'auth:api'], function()
{

	Route::get('{agentId}', 'SalesPairingsController@getSalesPairingsByAgent');

	Route::get('{salesPairingsId?}', 'SalesPairingsController@getSalesPairingsBySalesPairingsId');

	Route::get('clients/{clientId}', 'SalesPairingsController@getSalesPairingsByClient');

	Route::get('campaigns/{campaignId}', 'SalesPairingsController@getSalesPairingsByCampaign');

	Route::delete('{salesPairingsId}', 'SalesPairingsController@deleteAgentSalesPairings');

});

Route::get('clients/{clientId}/agents/{agentId}/sales-pairings', 'SalesPairingsController@getSalesPairings');

Route::post('agents/{agentId}/sales-pairings', 'SalesPairingsController@saveAgentSalesPairings');

