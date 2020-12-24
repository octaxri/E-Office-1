<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class role_permission extends Model
{
    protected $fillable = [
        'role_id',
        'permission_id'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function permissionData()
    {
        return $this->belongsTo(permission::class, 'permission_id', 'id');
    }
}
