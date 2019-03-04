<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ContactTableAddBusinessProperties extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contacts', function (Blueprint $table) {
            $table->integer('contact_type')->unsigned()->default(1)->after('client_id');
            $table->string('business_name')->nullable()->after('contact_type');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('contacts', 'contact_type')) {
            Schema::table('contacts', function (Blueprint $table) {
                $table->dropColumn('contact_type');
            });
        }

        if (Schema::hasColumn('contacts', 'business_name')) {
            Schema::table('contacts', function (Blueprint $table) {
                $table->dropColumn('business_name');
            });
        }
    }
}
