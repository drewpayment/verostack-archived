<?php

namespace App\Http\Controllers\Auth;

use App\Role;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/';

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

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
        $this->setRedirectTo(getenv('LOGIN_REDIRECT_TO') ?? '/');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
    	$nameString = explode(' ', $data['name']);
    	$firstName = trim($nameString[0], ' ');
    	$lastName = trim($nameString[1], ' ');

        $user = User::create([
            'first_name' => $firstName,
            'last_name' => $lastName,
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        if($user->id > 0)
        {
        	Role::create([
        		'user_id' => $user->id,
		        'role' => 1
	        ]);
        }

        return $user;
    }
}
