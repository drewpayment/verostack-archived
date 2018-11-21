<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePayCycleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pay_cycle', function (Blueprint $table) {
            $table->increments('pay_cycle_id')->unsigned();
            $table->date('start_date');
            $table->date('end_date');
            $table->boolean('is_pending');
            $table->boolean('is_closed');
            $table->timestamps();
        });
        
        if (Schema::hasTable('pay_cycle') && !Schema::hasColumn('daily_sale', 'pay_cycle_id')) {
            Schema::table('daily_sale', function(Blueprint $table) {
                $table->integer('pay_cycle_id')->unsigned()->nullable()->after('paid_status');
                $table->foreign('pay_cycle_id')->references('pay_cycle_id')->on('pay_cycle');
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pay_cycle');
        if (Schema::hasColumn('daily_sale', 'pay_cycle_id')) {
            Schema::table('daily_sale', function (Blueprint $table) {
                $table->dropForeign(['pay_cycle_id']);
            });
        }
    }
}
