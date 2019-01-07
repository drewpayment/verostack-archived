<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateOverridesTablePayrollRelationship extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('overrides', function (Blueprint $table) {
            $table->integer('payroll_details_id')->unsigned()->after('override_id');
            $table->foreign('payroll_details_id')->references('payroll_details_id')->on('payroll_details');
            $table->dropForeign(['invoice_id']);
            $table->dropColumn('invoice_id');
            $table->dropColumn('sales');
            $table->integer('units')->unsigned();
            $table->dropColumn('commission');
            $table->dropColumn('total');
            $table->decimal('amount');
            $table->integer('modified_by')->unsigned();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('overrides', function (Blueprint $table) {
            $table->dropForeign(['payroll_details_id']);
            $table->dropColumn('payroll_details_id');
            $table->integer('invoice_id')->unsigned();
            $table->foreign('invoice_id')->references('invoice_id')->on('invoices');
            $table->integer('sales')->unsigned();
            $table->dropColumn('units');
            $table->double('commission');
            $table->double('total');
            $table->dropColumn('amount');
            $table->dropColumn('modified_by');
            $table->dropTimestamps();
        });
    }
}
