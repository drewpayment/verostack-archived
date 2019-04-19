<?php

Route::middleware(['auth:api'])->group(function() {

    // Route::get('clients/{clientId}/contacts', 'ContactController@getContacts');

    // Route::post('clients/{clientId}/contacts', 'ContactController@newContact');

	// Route::post('clients/{clientId}/contacts/{$contactId}', 'ContactController@updateContact');
	
	Route::get('get-dnc-contacts', 'DncContactController@getDncContacts');

});