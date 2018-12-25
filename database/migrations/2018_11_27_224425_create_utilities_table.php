<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUtilitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('utilities', function (Blueprint $table) {
            $table->increments('utility_id');
            $table->integer('campaign_id')->unsigned()->nullable();
            $table->foreign('campaign_id')->references('campaign_id')->on('campaigns');
            $table->string('commodity')->nullable();
            $table->integer('agent_company_id')->nullable();
            $table->string('agent_company_name');
            $table->string('utility_name')->nullable();
            $table->string('meter_number')->nullable();
            $table->string('classification')->nullable();
            $table->double('price')->nullable();
            $table->string('unit_of_measure')->nullable();
            $table->integer('term')->nullable();
            $table->boolean('is_active');
            $table->integer('modified_by');
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
        Schema::dropIfExists('utilities');
    }
}
