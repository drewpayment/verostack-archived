<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContactsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->increments('contact_id');
            $table->integer('client_id')->unsigned();
            $table->foreign('client_id')->references('client_id')->on('clients');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('middle_name')->nullable();
            $table->string('prefix', 10)->nullable();
            $table->string('suffix', 10)->nullable();
            $table->integer('ssn')->unsigned()->nullable();
            $table->date('dob')->nullable();
            $table->string('street');
            $table->string('street2')->nullable();
            $table->string('city');
            $table->string('state');
            $table->string('zip');
            $table->integer('phone_country')->unsigned()->default(1);
            $table->integer('phone')->unsigned()->nullable();
            $table->string('email')->nullable();
            $table->integer('fax_country')->unsigned()->default(1);
            $table->integer('fax')->unsigned()->nullable();
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
        Schema::dropIfExists('contacts');
    }
}
