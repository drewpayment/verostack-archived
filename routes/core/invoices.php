<?php


/**
 *
 * INVOICE CONTROLLER ROUTES
 *
 */

Route::group(['prefix' => 'invoices', 'middleware' => 'auth:api'], function() {

	Route::post('{invoiceId?}', 'InvoiceController@saveInvoice');

	Route::get('{invoiceId}', 'InvoiceController@getInvoice');

});


Route::post('clients/{clientId}/agents/{agentId}/invoices', 'InvoiceController@saveNewInvoice')
	->middleware('auth:api');