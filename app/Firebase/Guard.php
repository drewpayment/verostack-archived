<?php

namespace App\Firebase;

use Closure;
use Illuminate\Http\Request;
use Firebase\Auth\Token\Verifier;
use Symfony\Component\HttpKernel\Exception\HttpException;

class Guard
{
	protected $verifier;

	public function __construct(Verifier $_verifier)
	{
		$this->verifier = $_verifier;
	}

	public function user($request)
	{
		$token = $request->bearerToken();

		try {
			$token = $this->verifier->verifyIdToken($token);
			return new User($token->getClaims());
		} catch (\Exception $e) {
			return;
		}
	}
}