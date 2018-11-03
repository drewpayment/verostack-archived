<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFkConstraintsSalesOverridesExpenses extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('overrides', function(Blueprint $table) {
        	$table->foreign('invoice_id')->references('invoice_id')->on('invoices');
        });

        Schema::table('expenses', function(Blueprint $table) {
        	$table->foreign('invoice_id')->references('invoice_id')->on('invoices');
        });

        Schema::table('agent_sales', function(Blueprint $table) {
        	$table->foreign('invoice_id')->references('invoice_id')->on('invoices');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('overrides', function(Blueprint $table) {
        	$table->dropForeign(['invoice_id']);
        });

        Schema::table('expenses', function(Blueprint $table) {
        	$table->dropForeign(['invoice_id']);
        });

        Schema::table('agent_sales', function(Blueprint $table) {
        	$table->dropForeign(['invoice_id']);
        });
    }
}
