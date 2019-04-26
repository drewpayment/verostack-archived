<?php

namespace App\Http\Middleware;

use Closure;

class Firebase
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
	{
		$authorization = null;
		$authHeaders = $request->headers->all();

		foreach($authHeaders as $k => $v) {
			if (trim($k) === 'authorization') {
				$authorization = $v;
			}
		}

		if ($authorization == null) {
			return response()->json('Authorizaton header not found.', 401);
		}

		$rawToken = $authHeaders[0];
		$rawTokenArr = explode(" ", $rawToken);
		$token = $rawTokenArr[1];

		if ($token == null) {
			return response()->json('No token provided', 401);
		} 

		try {
			$token = $this->verifier->verifyIdToken($token);
			return $next($request);
		} catch (\Exception $e) {
			return new HttpException(401, 'Unauthorized.');
		}
	}
}
