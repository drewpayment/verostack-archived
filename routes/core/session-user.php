<?php

/**
 * All of these API endpoints will call functions on the UserController, so be aware of overlapping naming conventions with users.php
 */
Route::middleware(['auth:api'])->group(function() {

    Route::post('user-session', 'UserController@saveNewSessionUser');

});

