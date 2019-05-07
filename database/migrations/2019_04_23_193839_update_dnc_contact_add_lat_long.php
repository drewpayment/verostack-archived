<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateDncContactAddLatLong extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('dnc_contacts', function (Blueprint $table) {
            $table->decimal('lat', 10, 8)->after('note');
            $table->decimal('long', 11, 8)->after('lat');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('dnc_contacts', 'lat')) {
            Schema::table('dnc_contacts', function (Blueprint $table) {
                $table->removeColumn('lat');
            });
        }

        if (Schema::hasColumn('dnc_contacts', 'long')) {
            Schema::table('dnc_contacts', function (Blueprint $table) {
                $table->removeColumn('long');
            });
        }
    }
}
