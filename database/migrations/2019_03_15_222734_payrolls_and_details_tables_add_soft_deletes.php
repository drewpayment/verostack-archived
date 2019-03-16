<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PayrollsAndDetailsTablesAddSoftDeletes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('payrolls', function (Blueprint $table) {
            $table->softDeletes()->after('updated_at');
        });

        Schema::table('payroll_details', function (Blueprint $table) {
            $table->softDeletes()->after('updated_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('payrolls', 'deleted_at')) {
            Schema::table('payrolls', function (Blueprint $table) {
                $table->dropColumn('deleted_at');
            });
        }

        if (Schema::hasColumn('payroll_details', 'deleted_at')) {
            Schema::table('payroll_details', function (Blueprint $table) {
                $table->dropColumn('deleted_at');
            });
        }
    }
}
