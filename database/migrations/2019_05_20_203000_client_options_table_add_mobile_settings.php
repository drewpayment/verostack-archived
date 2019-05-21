<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ClientOptionsTableAddMobileSettings extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('client_options', function (Blueprint $table) {
            $table->boolean('use_existing_contacts')->after('has_onboarding');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('client_options', 'use_existing_contacts')) {
            Schema::table('client_options', function (Blueprint $table) {
                $table->dropColumn('use_existing_columns');
            });
        }
    }
}
