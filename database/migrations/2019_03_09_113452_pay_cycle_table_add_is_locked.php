<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PayCycleTableAddIsLocked extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('pay_cycle', function (Blueprint $table) {
            $table->boolean('is_locked')->after('is_closed');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('pay_cycle', 'is_locked')) {
            Schema::table('pay_cycle', function (Blueprint $table) {
                $table->dropColumn('is_locked');
            });
        }
    }
}
