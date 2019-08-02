<?php

namespace App\Contracts;

use Closure;

interface ApiPasswordBroker
{
    const RESET_LINK_SENT = true;

    const PASSWORD_RESET = true;

    const INVALID_USER = 'invalid_user';

    const INVALID_PASSWORD = 'invalid_password';

    const INVALID_TOKEN = 'invalid_token';

    public function sendResetLink(array $credentials);

    public function reset(array $credentials, Closure $callback);

    public function validator(Closure $callback);

    public function validateNewPassword(array $credentials);
}