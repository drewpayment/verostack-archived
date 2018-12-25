<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DailySaleTableAddUtilityColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('daily_sale', function (Blueprint $table) {
            $table->integer('utility_id')->unsigned()->after('client_id');
            // $table->foreign('utility_id')->references('utility_id')->on('utilities');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('daily_sale', 'utility_id')) {
            Schema::table('daily_sale', function (Blueprint $table) {
                // $table->dropForeign(['utility_id']);
                $table->dropColumn('utility_id');
            });
        }
    }
}
