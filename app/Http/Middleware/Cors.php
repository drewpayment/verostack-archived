<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Response;

class Cors
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
//    	header("Allow-Control-Allow-Origin: *");
//
//    	$headers = [
//    		'Allow-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS',
//		    'Allow-Control-Allow-Headers' => 'Content-Type, X-Auth-Token, Origin, Authorization'
//	    ];
//
//    	if($request->getMethod() == 'OPTIONS')
//	    {
//	    	return Response::make('OK', 200, $headers);
//	    }
//
//	    $response = $next($request);
//    	foreach($headers as $k => $v)
//    		$response->header($k, $v);
//    	return $response;

        return $next($request)
            ->headers('Access-Control-Allow-Origin', '*')
            ->headers('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    }
}
