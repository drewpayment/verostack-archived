<?php

namespace App\Http\Middleware;

use Closure;
use Firebase\Auth\Token\Verifier;

class Firebase
{
	protected $verifier;

	public function __construct(Verifier $_verifier)
	{
		$this->verifier = $_verifier;
	}

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
	{
		$hasAuthHeader = $request->hasHeader('authorization');
		$token = $request->bearerToken();

		if (!$hasAuthHeader) {
			return response()->json('Authorizaton header not found.', 401);
		}

		if ($token == null) {
			return response()->json('No token provided', 401);
		} 

		try {
			$token = $this->verifier->verifyIdToken($token);
			return $next($request);
		} catch (\Exception $e) {
			return response()->json('Unauthorized.', 401);
		}
	}
}
