<?php

namespace App\Console\Commands;

use App\DailySale;
use Carbon\Carbon;
use App\DncContact;
use App\ScheduledTask;
use Illuminate\Console\Command;
use App\Http\Resources\ApiResource;
use App\Http\Services\DncContactService;

class GeocodeSales extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'geocode:sales';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Gets all existing sales without geocode data and gets geolocation info from Google Maps API.';

    /**
     * Dependency Injected services
     */
    protected $dncContactService;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(DncContactService $_dncContactService)
    {
        parent::__construct();

        $this->dncContactService = $_dncContactService;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $result = new ApiResource();
        $sales = DailySale::with('contact')->byNonGeocodedSales()->get();
        $tasks = collect();

        $this->info('Number of sales: '.$sales->count());

        foreach($sales as $s) 
        {
            $res = $this->dncContactService->getGeolocation($s->contact->street, $s->contact->city, $s->contact->state);

            $this->info(json_encode($res->getData()));

            if (!$res->hasError) {
                $geo = $res->getData();

                $clientId = $s->client_id;
                $contactDesc = $s->contact->first_name . ' ' . $s->contact->last_name; 

                $dnc = new DncContact([
                    'client_id' => $s->client_id,
                    'first_name' => $s->contact->first_name,
                    'last_name' => $s->contact->last_name,
                    'description' => '',
                    'address' => $s->contact->street,
                    'addess_cont' => $s->contact->street2,
                    'city' => $s->contact->city,
                    'state' => $s->contact->state,
                    'zip' => $s->contact->zip,
                    'lat' => $geo->lat,
                    'long' => $geo->lng
                ]);
                $dnc_saved = $dnc->save();
                $s->has_geo = true;
                $daily_sale_updated = $s->save();

                if ($dnc_saved && $daily_sale_updated) {
                    $this->info('Updated '.$dnc->dnc_contact_id);
                    $result->setToSuccess();

                    $t = new ScheduledTask();
                    $t->client_id = $clientId;
                    $t->description = 'Added '.$contactDesc.' to the restricted list.';
                    $t->updated_at = Carbon::now();
                    $t->created_at = Carbon::now();
                    $tasks->push($t);
                    
                } else {
                    $result->setTofail();
                }

                if ($tasks->count() > 0) {
                    ScheduledTask::insert($tasks->toArray());
                }
            }

            sleep(1);
        }
        
    }
}
