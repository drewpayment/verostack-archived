<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class FixDailySaleContactRelationship extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasColumn('daily_sale', 'first_name') || 
            Schema::hasColumn('daily_sale', 'last_name') ||
            Schema::hasColumn('daily_sale', 'street') ||
            Schema::hasColumn('daily_sale', 'street2') ||
            Schema::hasColumn('daily_sale', 'city') ||
            Schema::hasColumn('daily_sale', 'state') ||
            Schema::hasColumn('daily_sale', 'zip') 
        ){
            Schema::table('daily_sale', function (Blueprint $table) {
                $table->dropColumn(['first_name', 'last_name', 'street', 'street2', 'city', 'state', 'zip']);
                $table->integer('contact_id')->after('campaign_id');
                $table->foreign('contact_id')->references('contact_id')->on('contacts');
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
        //
    }
}
