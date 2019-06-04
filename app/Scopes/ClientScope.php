<?php

namespace App\Scopes;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Database\Eloquent\Builder;

class ClientScope implements Scope { 

	protected $clientId;

	public function __construct()
	{
		$user = Auth::user();
		$user->load('sessionUser');
		$this->clientId = $user->sessionUser->session_client;
	}

	public function apply(Builder $builder, Model $model) 
	{
		$builder->where('client_id', $this->clientId);
	}

}