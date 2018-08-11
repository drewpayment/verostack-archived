<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDailySaleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('daily_sale', function (Blueprint $table) {
        	$table->increments('daily_sale_id')->unsigned();
        	$table->integer('agent_id')->unsigned();
        	$table->foreign('agent_id')->references('agent_id')->on('agents')->onDelete('cascade');
        	$table->integer('pod_account')->unsigned()->unique();
        	$table->string('first_name', 60);
        	$table->string('last_name', 60);
        	$table->string('street', 255);
        	$table->string('street2', 255)->nullable();
        	$table->string('city', 100);
        	$table->string('state', 10);
        	$table->integer('zip');
        	$table->integer('status');
        	$table->dateTime('sale_date');
        	$table->dateTime('last_touch_date');
        	$table->string('notes', 5000);
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
        Schema::dropIfExists('daily_sale');
    }
}
