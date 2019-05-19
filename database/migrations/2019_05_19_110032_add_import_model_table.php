<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddImportModelTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('import_models', function (Blueprint $table) {
            $table->increments('import_model_id');
            $table->integer('client_id')->unsigned();
            $table->foreign('client_id')->references('client_id')->on('clients');
            $table->string('shortDesc');
            $table->string('fullDesc')->nullable();
            $table->string('map');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('import_models');
    }
}
