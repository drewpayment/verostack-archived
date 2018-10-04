<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CampaignsTableAddDetails extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('campaigns', function(Blueprint $table) {
            $table->double('compensation')->nullable();
            $table->text('md_details')->nullable();
            $table->text('md_onboarding')->nullable();
            $table->text('md_other')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('campaigns', function(Blueprint $table) {
        	$table->dropColumn(['compensation', 'md_details', 'md_onboarding', 'md_other']);
        });
    }
}
