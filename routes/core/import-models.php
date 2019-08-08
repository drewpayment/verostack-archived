<?php

Route::middleware(['auth:api'])->group(function() {

    Route::get('import-models', 'ImportModelController@getImportModels');
    
    Route::post('import-models', 'ImportModelController@saveImportModel');

});