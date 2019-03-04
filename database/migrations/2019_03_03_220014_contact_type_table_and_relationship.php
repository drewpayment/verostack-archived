<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ContactTypeTableAndRelationship extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contact_type', function (Blueprint $table) {
            $table->increments('contact_type_id');
            $table->string('name');
            $table->timestamps();
        });

        $now = Carbon::now();
        DB::insert('insert into contact_type (contact_type_id, name, created_at, updated_at) values (?, ?, ?, ?)', [1, 'residential', $now, $now]);
        DB::insert('insert into contact_type (contact_type_id, name, created_at, updated_at) values (?, ?, ?, ?)', [2, 'business', $now, $now]);

        Schema::table('contacts', function (Blueprint $table) {
            $table->foreign('contact_type')->references('contact_type_id')->on('contact_type');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasTable('contact_type')) {
            Schema::table('contacts', function (Blueprint $table) {
                $table->dropForeign(['contact_type']);
            });
            Schema::disableForeignKeyConstraints();
            Schema::drop('contact_type');       
            Schema::enableForeignKeyConstraints();
        }
    }
}
