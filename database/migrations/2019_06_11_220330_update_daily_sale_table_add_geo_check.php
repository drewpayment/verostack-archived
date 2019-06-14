<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateDailySaleTableAddGeoCheck extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('daily_sale', function (Blueprint $table) {
            $table->boolean('has_geo')->after('pay_cycle_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('daily_sale', 'has_geo')) {
            Schema::table('daily_sale', function (Blueprint $table) {
                $table->dropColumn('has_geo');
            });
        }
    }
}
