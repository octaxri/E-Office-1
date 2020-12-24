<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class user_occupation extends Model
{
    protected $fillable = [
        'user_id',
        'occupation_id'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function occupationData()
    {
        return $this->belongsTo(occupation::class, 'occupation_id', 'id');
    }

    public function userData()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
