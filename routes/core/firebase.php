<?php

Route::middleware(['auth:firebase'])->group(function() {

	/**
	 * Test endpoint to make sure Firebase Authentication middleware is working.
	 */
	Route::get('me', function(Request $request) {
		return (array) $request->user();
	});

});