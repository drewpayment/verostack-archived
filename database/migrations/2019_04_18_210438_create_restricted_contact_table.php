<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRestrictedContactTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dnc_contacts', function (Blueprint $table) {
            $table->increments('dnc_contact_id');
            $table->integer('client_id')->unsigned();
            $table->foreign('client_id')->references('client_id')->on('clients');
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('description')->nullable();
            $table->string('address');
            $table->string('address_cont')->nullable();
            $table->string('city');
            $table->string('state');
            $table->string('zip');
            $table->string('note')->nullable();
            $table->softDeletes();
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
        Schema::dropIfExists('dnc_contacts');
    }
}
