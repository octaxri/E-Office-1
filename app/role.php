<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class role extends Model
{
    protected $fillable = [

    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function roleData()
    {
        return $this->belongsTo(role::class, 'id', 'role_id');
    }
}
