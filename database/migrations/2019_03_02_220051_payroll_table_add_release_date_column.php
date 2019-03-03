<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PayrollTableAddReleaseDateColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('payrolls', function (Blueprint $table) {
            $table->dateTime('release_date')->nullable()->after('is_released');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('payrolls', 'release_date')) {
            Schema::table('payrolls', function (Blueprint $table) {
                $table->dropColumn('release_date');
            });
        }
    }
}
