<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ExpensesTableUpdateAddExpenseDateField extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('expenses', function (Blueprint $table) {
            $table->datetime('expense_date')->after('amount');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('expenses', 'expense_date')) {
            Schema::table('expenses', function (Blueprint $table) {
                $table->dropColumn('expense_date');
            });
        }
    }
}
