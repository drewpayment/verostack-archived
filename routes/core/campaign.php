<?php


/**
 * CAMPAIGN CONTROLLER ROUTES
 *
 */

Route::group(['prefix' => 'campaigns', 'middleware' => 'auth:api'], function() {

	Route::get('/clients/{clientId}/active/{activeOnly?}', 'CampaignController@getCampaigns');

    Route::get('clients/{clientId}', 'CampaignController@getCampaignsByClient');

	Route::get('/clients/{clientId}/campaign-name', 'CampaignController@checkForExistingCampaignName');

	Route::post('/clients/{clientId}/campaigns/{campaignId?}', 'CampaignController@saveCampaign');

	Route::get('/clients/{clientId}/agents/{agentId}', 'CampaignController@getCampaignsByAgent');

});

Route::middleware(['auth:api'])->group(function() {

    Route::get('clients/{clientId}/campaigns/{campaignId}', 'CampaignController@getCampaignDetail');

});