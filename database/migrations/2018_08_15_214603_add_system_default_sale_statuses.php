<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Carbon\Carbon;

class AddSystemDefaultSaleStatuses extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('sale_status')->insert([
        	['client_id' => 0, 'name' => 'Accepted', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
	        ['client_id' => 0, 'name' => 'Customer Not Eligible', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
	        ['client_id' => 0, 'name' => 'Arrears', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
	        ['client_id' => 0, 'name' => 'Name and Address Mismatch', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
	        ['client_id' => 0, 'name' => '12-month Crossover Rule', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
	        ['client_id' => 0, 'name' => 'POD Invalid', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()]
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('sale_status')
	        ->where('client_id', 0)
	        ->delete();
    }
}
