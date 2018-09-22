<?php

Route::middleware(['auth:api'])->group(function() {

	Route::get('clients/{clientId}/agents', 'AgentController@getAgentsByClient')
		->where(['clientId' => '[0-9]+']);

});