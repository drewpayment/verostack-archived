<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DailySaleAddCampaign extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('daily_sale', function(Blueprint $table) {
            $table->integer('campaign_id')
                ->unsigned()
                ->after('client_id')
	            ->default(2);

            $table->foreign('campaign_id')
                ->references('campaign_id')
	            ->on('campaigns');
        });

        Schema::table('daily_sale', function(Blueprint $table) {
        	$table->integer('campaign_id')
		        ->unsigned()
		        ->after('client_id')
		        ->default(null)
		        ->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('daily_sale', function(Blueprint $table) {
        	$table->dropForeign(['campaign_id']);
        	$table->dropColumn('campaign_id');
        });
    }
}
