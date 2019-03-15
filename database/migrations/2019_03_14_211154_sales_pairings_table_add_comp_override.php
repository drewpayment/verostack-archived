<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SalesPairingsTableAddCompOverride extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('sales_pairings', function (Blueprint $table) {
            $table->decimal('commission', 19, 4)->nullable()->after('campaign_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('sales_pairings', 'commission')) {
            Schema::table('sales_pairings', function (Blueprint $table) {
                $table->dropColumn('commission');
            });
        }
    }
}
