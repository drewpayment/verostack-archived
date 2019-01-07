<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePayrollDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payroll_details', function (Blueprint $table) {
            $table->increments('payroll_details_id')->unsigned();
            $table->integer('payroll_id')->unsigned();
            $table->foreign('payroll_id')->references('payroll_id')->on('payrolls');
            $table->integer('agent_id')->unsigned();
            $table->foreign('agent_id')->references('agent_id')->on('agents');
            $table->integer('sales')->unsigned();
            $table->decimal('taxes')->nullable();
            $table->decimal('gross_total');
            $table->decimal('net_total');
            $table->integer('modified_by')->unsigned();
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
        Schema::dropIfExists('payroll_details');
    }
}
