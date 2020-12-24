<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class user_profile extends Model
{
    protected $fillable = [
        'user_id',
        'profile_pic_url'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
