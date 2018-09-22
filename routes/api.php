<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/**
 * Import our external route files
 */
include('core/campaign.php');
include('core/sales-pairings.php');
include('core/invoices.php');
include('core/sales-status.php');
include('core/daily-sale.php');
include('core/agents.php');

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});


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

	Route::post('new-user-agent', 'UserController@saveNewUserAgentEntity');

});


/**
 * Client based routes.
 */
Route::group(['prefix' => 'clients', 'middleware' => 'auth:api'], function() {

	Route::get('users/{userId}', 'ClientController@getClientByUser');

	Route::get('{clientId}', 'ClientController@getClientById');

	Route::post('{clientId}', 'ClientController@saveClient');

	Route::get('{clientId}/client-options', 'ClientController@getClientOptions');

	Route::post('{clientId}/client-options', 'ClientController@updateClientOptions');

//	Route::get('{clientId}/campaigns', 'ClientController@getCampaignsByClient');

});

Route::group(['prefix' => 'utilities', 'middleware' => 'auth:api'], function() {

	Route::get('get-user-roles', 'ApiController@getUserRoles');

	Route::get('get-user-roles/all', 'ApiController@getUserRolesAll');

	Route::get('get-user-roles/inactive', 'ApiController@getUserRolesInactive');

});

Route::group(['prefix' => 'overrides', 'middleware' => 'auth:api'], function() {

	// override controller endpoints

	Route::get('{overrideId}', 'OverrideController@getOverridesByOverrideId');

});

Route::group(['prefix' => 'agents', 'middleware' => 'auth:api'], function() {

	Route::get('/', 'AgentController@getAgents');

	Route::get('statuses/{activeOnly}', 'AgentController@getAgents');

	Route::get('managers/{managerId}', 'AgentController@getAgentsByManagerId');

	Route::get('{agentId}', 'AgentController@getAgentByUserId');

	Route::post('{agentId}', 'AgentController@updateAgent');

});



//Route::post('invoices/{invoiceId?}', 'InvoiceController@saveInvoice')->middleware('auth:api');
//
//Route::get('invoices/{invoiceId}', 'InvoiceController@getInvoice')->middleware('auth:api');

Route::get('agents/{agentId}/campaigns/{campaignId}/issue-dates/{issueDate}', 'InvoiceController@searchInvoice')->middleware('auth:api');

//Route::prefix('invoices')->group(function() {
//
//	// probably get them all here or something
//
//	Route::post('/', 'InvoiceController@saveInvoice');
//
//});