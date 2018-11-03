<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DailySaleAddPaidStatusDates extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('daily_sale', function(Blueprint $table) {
        	$table->dateTime('paid_date')->nullable();
        	$table->dateTime('charge_date')->nullable();
        	$table->dateTime('repaid_date')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('daily_sale', function(Blueprint $table) {
        	$table->dropColumn('paid_date');
        	$table->dropColumn('charge_date');
        	$table->dropColumn('repaid_date');
        });
    }
}
