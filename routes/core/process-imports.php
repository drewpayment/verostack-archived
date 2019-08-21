<?php

Route::middleware(['auth:api'])->group(function() {

    Route::post('imports/report-uploaded', 'ProcessImportController@uploadReport');

});