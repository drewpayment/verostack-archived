<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreatePaidStatusTypeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('paid_status_type', function (Blueprint $table) {
            $table->integer('paid_status_id')->unsigned();
            $table->string('name');
        });

        DB::beginTransaction();
        DB::insert('insert into paid_status_type (paid_status_id, name) values (?, ?)', [0, 'Unpaid']);
        DB::insert('insert into paid_status_type (paid_status_id, name) values (?, ?)', [1, 'Paid']);
        DB::insert('insert into paid_status_type (paid_status_id, name) values (?, ?)', [2, 'Chargeback']);
        DB::insert('insert into paid_status_type (paid_status_id, name) values (?, ?)', [3, 'Repaid']);
        DB::commit();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('paid_status_type');
    }
}
