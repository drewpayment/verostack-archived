<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RecreateUserDetailsColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
    	Schema::dropIfExists('user_details');

	    Schema::create('user_details', function (Blueprint $table) {
		    $table->increments('user_detail_id');
		    $table->integer('user_id')->unsigned();
		    $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
		    $table->string('street');
		    $table->string('street2')->nullable();
		    $table->string('city');
		    $table->string('state');
		    $table->integer('zip');
		    $table->integer('ssn')->nullable();
		    $table->integer('phone');
		    $table->date('birthDate');
		    $table->integer('bankRouting')->nullable();
		    $table->integer('bankAccount')->nullable();
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
        Schema::dropIfExists('user_details');
    }
}
