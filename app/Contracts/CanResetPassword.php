<?php

namespace App\Contracts;

interface CanResetPassword
{
    public function getEmailForPasswordReset();

    public function sendPasswordResetNotification($token);
}