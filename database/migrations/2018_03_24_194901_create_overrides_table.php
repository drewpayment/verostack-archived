<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOverridesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('overrides', function (Blueprint $table) {
            $table->increments('override_id');
            $table->integer('invoice_id')->unsigned();
            $table->integer('agent_id')->unsigned();
            $table->foreign('agent_id')->references('agent_id')->on('agents');
            $table->integer('sales');
            $table->decimal('commission', 19, 4)->default(0);
            $table->decimal('total', 19, 4)->default(0);
            $table->dateTime('issue_date');
            $table->dateTime('week_ending');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('overrides');
    }
}
