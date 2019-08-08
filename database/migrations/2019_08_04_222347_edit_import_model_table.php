<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EditImportModelTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('import_models', function (Blueprint $table) {
            $table->integer('campaign_id')->unsigned()->default(0)->after('user_id');
            $table->boolean('match_by_agent_code')->default(false)->after('campaign_id');
            $table->boolean('split_customer_name')->default(false)->after('match_by_agent_code');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('import_models', 'campaign_id')) {
            Schema::table('import_models', function (Blueprint $table) {
                $table->dropColumn('campaign_id');
            });
        }

        if (Schema::hasColumn('import_models', 'match_by_agent_code')) {
            Schema::table('import_models', function (Blueprint $table) {
                $table->dropColumn('match_by_agent_code');
            });
        }

        if (Schema::hasColumn('import_models', 'split_customer_name')) {
            Schema::table('import_models', function (Blueprint $table) {
                $table->dropColumn('split_customer_name');
            });
        }
    }
}
