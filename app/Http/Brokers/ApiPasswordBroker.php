<?php

namespace App\Http\Brokers;

use Illuminate\Support\Arr;
use Illuminate\Contracts\Auth\UserProvider;
use App\Contracts\ApiPasswordBroker as PasswordBrokerContract;
use Illuminate\Auth\Passwords\TokenRepositoryInterface;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use UnexpectedValueException;
use Closure;

class ApiPasswordBroker implements PasswordBrokerContract {

    protected $tokens;

    protected $users;

    protected $passwordValidator;

    /**
     * Create a new password broker instance.
     *
     * @param  \App\Contracts\TokenRepositoryInterface  $tokens
     * @param  \Illuminate\Contacts\Auth\UserProvider  $users
     * @return void
     */
    public function __construct(TokenRepositoryInterface $tokens, UserProvider $users) 
    {
        $this->users = $users;
        $this->tokens = $tokens;
    }

    /**
     * Send a password reset link to a user.
     *
     * @param  array  $credentials
     * @return bool
     */
    public function sendResetLink(array $credentials) 
    {
        // First we will check to see if we found a user at the given credentials and
        // if we did not we will redirect back to this current URI with a piece of
        // "flash" data in the session to indicate to the developers the errors.
        $user = $this->getUser($credentials);

        if (is_null($user)) {
            return static::INVALID_USER;
        }

        // Once we have the reset token, we are ready to send the message out to this
        // user with a link to reset their password. We will then redirect back to
        // the current URI having nothing set in the session to indicate errors.
        $user->sendPasswordResetNotification(
            $this->tokens->create($user)
        );

        return static::RESET_LINK_SENT;
    }

    /**
     * Get the user for the given credentials.
     *
     * @param  array  $credentials
     * @return \Illuminate\Contracts\Auth\CanResetPassword|null
     *
     * @throws \UnexpectedValueException
     */
    public function getUser(array $credentials) 
    {
        $credentials = Arr::except($credentials, ['token']);

        $user = $this->users->retrieveByCredentials($credentials);

        if ($user && ! $user instanceof CanResetPasswordContract) {
            throw new UnexpectedValueException('User must implement CanResetPassword interface.');
        }

        return $user;
    }

    public function reset(array $credentials, Closure $callback)
    {
        $user = $this->validateReset($credentials);

        if (! $user instanceof CanResetPasswordContract) {
            return $user;
        }

        $password = $credentials['password'];

        $callback($user, $password);

        $this->tokens->delete($user);

        return static::PASSWORD_RESET;
    }

    protected function validateReset(array $credentials)
    {
        if (is_null($user = $this->getUser($credentials))) {
            return static::INVALID_USER;
        }

        if (! $this->validateNewPassword($credentials)) {
            return static::INVALID_PASSWORD;
        }

        if (! $this->tokens->exists($user, $credentials['token'])) {
            return static::INVALID_TOKEN;
        }

        return $user;
    }

    public function validator(Closure $callback)
    {
        $this->passwordValidator = $callback;
    }

    public function validateNewPassword(array $credentials)
    {
        if (isset($this->passwordValidator)) {
            [$password, $confirm] = [
                $credentials['password'],
                $credentials['password_confirmation']
            ];

            return call_user_func(
                $this->passwordValidator, $credentials
            ) && $password === $confirm;
        }

        return $this->validatePasswordWithDefaults($credentials);
    }

    protected function validatePasswordWithDefaults(array $credentials)
    {
        [$password, $confirm] = [
            $credentials['password'],
            $credentials['password_confirmation'],
        ];

        return $password === $confirm && mb_strlen($password) >= 8;
    }

    public function createToken(CanResetPasswordContract $user)
    {
        return $this->tokens->create($user);
    }

    public function deleteToken(CanResetPasswordContract $user)
    {
        $this->tokens->delete($user);
    }

    public function tokenExists(CanResetPasswordContract $user, $token)
    {
        return $this->tokens->exists($user, $token);
    }

    public function getRepository()
    {
        return $this->tokens;
    }

}