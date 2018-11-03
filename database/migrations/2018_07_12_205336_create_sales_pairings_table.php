<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSalesPairingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sales_pairings', function (Blueprint $table) {
            $table->increments('sales_pairings_id');
            $table->integer('agent_id')->unsigned();
            $table->foreign('agent_id')->references('agent_id')->on('agents');
            $table->integer('campaign_id')->unsigned();
            $table->foreign('campaign_id')->references('campaign_id')->on('campaigns');
            $table->integer('sales_id')->unsigned();
            $table->integer('client_id')->unsigned();
            $table->foreign('client_id')->references('client_id')->on('clients');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sales_pairings');
    }
}
