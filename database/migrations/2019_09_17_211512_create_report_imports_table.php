<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReportImportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('report_imports', function (Blueprint $table) {
            $table->increments('report_import_id')->unsigned();
            $table->string('name');
            $table->integer('import_model_id')->unsigned();
            $table->foreign('import_model_id')->references('import_model_id')->on('import_models');
            $table->integer('client_id')->unsigned();
            $table->foreign('client_id')->references('client_id')->on('clients');
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
        Schema::dropIfExists('report_imports');
    }
}
