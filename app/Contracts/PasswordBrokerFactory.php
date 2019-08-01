<?php

namespace App\Contracts;

interface PasswordBrokerFactory
{
    public function broker($name = null);
}