<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ProcessImportCreateTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('process_imports', function (Blueprint $table) {
            $table->increments('process_import_id')->unsigned();
            $table->integer('client_id')->unsigned();
            $table->foreign('client_id')->references('client_id')->on('clients');
            $table->integer('import_model_id')->unsigned();
            $table->foreign('import_model_id')->references('import_model_id')->on('import_models');
            $table->integer('campaign_id')->unsigned();
            $table->foreign('campaign_id')->references('campaign_id')->on('campaigns');
            $table->integer('utility_id')->unsigned();
            $table->foreign('utility_id')->references('utility_id')->on('utilities');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');
            $table->longText('sales')->nullable();
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
        Schema::dropIfExists('process_imports');
    }
}
