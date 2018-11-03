<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * ### IMPORTANT ###
     * If changing this field, it is CRITICAL that the same protected field is changed
     * on the RegisterController as well as the ResetPasswordController so that all
     * three places redirect the user back to the same place on login from their respective
     * controllers.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
        $this->setRedirectTo(getenv('LOGIN_REDIRECT_TO') ?? '/');
    }

	/**
	 * Override function to tell Laravel to use the returned value as the login
	 * username instead of the default - email.
	 *
	 * @return string
	 */
    public function username()
    {
    	return 'username';
    }

	/**
	 * @return string
	 */
	public function getRedirectTo(): string {
		return $this->redirectTo;
	}

	/**
	 * @param string $redirectTo
	 */
	public function setRedirectTo( string $redirectTo ) {
		$this->redirectTo = $redirectTo;
	}
}
