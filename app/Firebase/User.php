<?php

namespace App\Firebase;

use Illuminate\Contracts\Auth\Authenticatable;

class User implements Authenticatable
{
	private $claims;

	public function __construct($claims)
	{
		$this->claims = $claims;
	}

	public function getAuthIdentifierName()
	{
		return 'sub';
	}

	public function getAuthIdentifier()
	{
		return (string) $this->claims['sub'];
	}

	public function getAuthPassword()
	{
		throw new \Exception('No password for Firebase User.');
	}

	public function getRememberToken()
	{
		throw new \Exception('No remember token for Firebase User.');
	}

	public function setRememberToken($value)
	{
		throw new \Exception('No remember token for Firebase User.');
	}

	public function getRememberTokenName()
	{
		throw new \Exception('No remember token for Firebase User.');
	}
}