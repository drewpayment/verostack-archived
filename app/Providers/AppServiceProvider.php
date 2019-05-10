<?php

namespace App\Providers;

use App\User;
use App\Client;
use App\SessionUser;
use Kreait\Firebase;
use Firebase\Auth\Token\Verifier;
use App\Observers\RelationshipObserver;
use Illuminate\Support\ServiceProvider;
use Kreait\Firebase\ServiceAccount;
use Kreait\Firebase\Factory as FirebaseFactory;
use function GuzzleHttp\json_encode;

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
            $projectId = config('services.firebase.project_id');
            return new Verifier($projectId);
        });

        $this->app->singleton(Firebase::class, function() {
            return (new FirebaseFactory())
                ->withServiceAccount(ServiceAccount::fromJsonFile(storage_path().'/google-services.json'))
                ->create();
        });

        $this->app->alias(Firebase::class, 'firebase');
    }
}
