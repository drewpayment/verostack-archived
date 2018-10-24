<?php

Route::middleware(['auth:api'])->group(function() {

	Route::get('clients/{clientId}/agents', 'AgentController@getAgentsByClient')
		->where(['clientId' => '[0-9]+']);

    Route::get('clients/{clientId}/users/{userId}/agents', 'AgentController@getAgentByUser')
        ->where(['clientId' => '[0-9]+', 'userId' => '[0-9]+']);

});