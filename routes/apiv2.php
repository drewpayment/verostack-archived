<?php

Route::get('dnc-contacts', 'DncContactController@getDncContacts');

Route::post('dnc-contacts', 'DncContactController@saveNewDncContact');

Route::delete('dnc-contacts', 'DncContactController@deleteDncContacts');