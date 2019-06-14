<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ScheduledTask extends Model
{
    protected $table = 'scheduled_tasks';

    protected $primaryKey = 'scheduled_task_id';

    protected $fillable = ['scheduled_task_id', 'description', 'created_at', 'updated_at'];

    /**
     * Filter records by client id.
     *
     * @param Illuminate\Database\Query\Builder $query
     * @param int $id
     * @return Illuminate\Database\Query\Builder
     */
    public function scopeByClient($query, $id)
    {
        return $query->where('client_id', $id);
    }
}
