<?php

/**
 * User based routes.
 */
Route::group(['prefix' => 'users', 'middleware' => 'auth:api'], function() {

	Route::get('all/active/{activeOnly}', 'UserController@getUsers');

	Route::get('{username}/session', 'UserController@getUserSession');

	Route::get('{username}', 'ApiController@getUserInfo')->where('username', '[A-Za-z]+');

	Route::get('{id}', 'ApiController@getUserById');

	Route::get('{userId}/detail', 'UserController@getUserDetailByUserId');

	Route::post('{userId}/details/{userDetailId?}', 'UserController@saveUserDetailByUserId');

	Route::post('{userId}/details/{userDetailId}/sale-info', 'UserController@updateUserDetailSaleInfo');

	Route::post('{userId}/details/{userDetailId}/agent-info', 'UserController@updateUserDetailAgentInfo');

	Route::get('clients/{clientId}', 'ApiController@getUsersByClient');

	Route::post('register', 'ApiController@registerNewUser');

//	Route::post('{userId}', 'UserController@updateUser');

	Route::post('{userId:int}', 'UserController@updateUserInfo');

	Route::get('{userId}/roles/{roleId}', 'ApiController@getUsersByUserRole');

	Route::post('{userId}/client-selector/{clientId}', 'ApiController@setSelectedClient');

	Route::post('clients/{clientId}/new-user-agent', 'UserController@saveNewUserAgentEntity');

});

Route::middleware(['auth:api'])->group(function() {

	Route::post('clients/{clientId}/users/{userId}', 'UserController@updateUserAgentDetailEntities');

});