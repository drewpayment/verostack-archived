<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDailySaleRemarkTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('daily_sale_remark', function (Blueprint $table) {
            $table->integer('daily_sale_id')->unsigned();
            $table->foreign('daily_sale_id')->references('daily_sale_id')
	            ->on('daily_sale');
            $table->integer('remark_id')->unsigned();
            $table->foreign('remark_id')->references('remark_id')
	            ->on('remarks');
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
        Schema::dropIfExists('daily_sale_remark');
    }
}
