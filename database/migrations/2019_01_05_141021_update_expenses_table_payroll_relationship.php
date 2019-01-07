<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateExpensesTablePayrollRelationship extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('expenses', function (Blueprint $table) {
            $table->dropForeign(['invoice_id']);
            $table->dropColumn('invoice_id');
            $table->integer('payroll_details_id')->unsigned()->after('expense_id');
            $table->foreign('payroll_details_id')->references('payroll_details_id')->on('payroll_details');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('expenses', function (Blueprint $table) {
            $table->integer('invoice_id')->unsigned();
            $table->foreign('invoice_id')->references('invoice_id')->on('invoices');
            $table->dropForeign(['payroll_details_id']);
            $table->dropColumn('payroll_details_id');
        });
    }
}
