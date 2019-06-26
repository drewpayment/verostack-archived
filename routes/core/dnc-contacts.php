<?php

Route::middleware(['auth:api'])->group(function() {
	
	Route::get('dnc-contacts', 'DncContactController@getDncContacts');

	Route::post('dnc-contacts', 'DncContactController@saveNewDncContact');

	Route::post('dnc-contacts/{dncContactId}', 'DncContactController@updateDncContact');

	Route::delete('dnc-contacts', 'DncContactController@deleteDncContacts');

});
