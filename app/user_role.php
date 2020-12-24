<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class user_role extends Model
{
    protected $fillable = ['user_id', 'role_id', 'status'];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function userData()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function roleData()
    {
        return $this->belongsTo(role::class, 'role_id', 'id');
    }
}
