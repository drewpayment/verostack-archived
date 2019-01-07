<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePayrollsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payrolls', function (Blueprint $table) {
            $table->increments('payroll_id')->unsigned();
            $table->integer('pay_cycle_id')->unsigned();
            $table->foreign('pay_cycle_id')->references('pay_cycle_id')->on('pay_cycle');
            $table->integer('client_id')->unsigned();
            $table->integer('campaign_id')->unsigned();
            $table->foreign('campaign_id')->references('campaign_id')->on('campaigns');
            $table->datetime('week_ending')->nullable();
            $table->boolean('is_released');
            $table->boolean('is_automated');
            $table->datetime('automated_release')->nullable();
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
        Schema::dropIfExists('payrolls');
    }
}
