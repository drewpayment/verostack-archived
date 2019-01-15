<?php

namespace App;

use App\Agent;
use App\Expense;
use App\Payroll;
use App\Override;
use Illuminate\Database\Eloquent\Model;

class PayrollDetail extends Model
{
    
    protected $primaryKey = 'payroll_details_id';

    public function agent()
    {
        return $this->belongsTo(Agent::class, 'agent_id');
    }

    public function payroll()
    {
        return $this->belongsTo(Payroll::class, 'payroll_id');
    }

    public function expenses()
    {
        return $this->hasMany(Expense::class, 'payroll_details_id');
    }

    public function overrides()
    {
        return $this->hasMany(Override::class, 'payroll_details_id');
    }

}
