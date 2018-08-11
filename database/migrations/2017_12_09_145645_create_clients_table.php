<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->increments('client_id');
            $table->string('name');
            $table->string('street');
            $table->string('city');
            $table->string('state');
            $table->mediumInteger('zip')->unsigned();
            $table->double('phone', 10, 0)->unsigned();
            $table->integer('taxid')->unsigned();
            $table->boolean('active');
	        $table->integer('modified_by');
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
        Schema::dropIfExists('clients');
    }
}
