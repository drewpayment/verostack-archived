<?php

namespace App\Providers;

use App\User;
use App\Client;
use App\SessionUser;
use Firebase\Auth\Token\Verifier;
use App\Observers\RelationshipObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
	    //
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if ($this->app->environment() !== 'production') {
            $this->app->register(\Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider::class);
        }

        $this->app->singleton(Verifier::class, function ($app) {
            return new Verifier(config('services.firebase.project_id'));
        });
    }
}
