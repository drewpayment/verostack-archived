<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AgentsTableUpdateAddClientidCol extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('agents', function (Blueprint $table) {
            $table->integer('client_id')->unsigned()->after('agent_id')->default(1);
            $table->foreign('client_id')->references('client_id')->on('clients');
        });

        Schema::table('agents', function (Blueprint $table) {
            $table->integer('client_id')->unsigned()->after('agent_id')->default(null)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('agents', 'client_id')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropForeign(['client_id']);
                $table->dropColumn('client_id');
            });
        }
    }
}
