<?php

Route::middleware(['auth:api'])->group(function() {

    Route::get('clients/{$clientId}/contacts', 'ContactController@getContacts');

    Route::post('clients/{$clientId}/contacts', 'ContactController@newContact');

});