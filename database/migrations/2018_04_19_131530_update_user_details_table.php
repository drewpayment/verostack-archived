<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateUserDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_details', function(Blueprint $table) {
			$table->integer('sale_one_id')->unsigned()->nullable();
			$table->integer('sale_one_campaign_id')->unsigned()->nullable();
			$table->foreign('sale_one_campaign_id')->references('campaign_id')->on('campaigns');
			$table->integer('sale_two_id')->unsigned()->nullable();
			$table->integer('sale_two_campaign_id')->unsigned()->nullable();
			$table->foreign('sale_two_campaign_id')->references('campaign_id')->on('campaigns');
			$table->integer('sale_three_id')->unsigned()->nullable();
			$table->integer('sale_three_campaign_id')->unsigned()->nullable();
			$table->foreign('sale_three_campaign_id')->references('campaign_id')->on('campaigns');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_details', function(Blueprint $table) {
        	$table->dropColumn(['sales_one_id', 'sale_two_id', 'sale_three_id']);
        });
    }
}
