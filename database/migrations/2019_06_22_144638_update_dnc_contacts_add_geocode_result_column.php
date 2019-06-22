<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateDncContactsAddGeocodeResultColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('dnc_contacts', function (Blueprint $table) {
            $table->longText('geocode')->nullable()->after('long');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('dnc_contacts', 'geocode')) {
            Schema::table('dnc_contacts', function (Blueprint $table) {
                $table->dropColumn('geocode');
            });
        }
    }
}
