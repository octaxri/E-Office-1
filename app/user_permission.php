<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class user_permission extends Model
{
    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function permissionData()
    {
        return $this->belongsTo(permission::class, 'permission_id', 'id');
    }
}
