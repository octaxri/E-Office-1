<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class user_certificate extends Model
{
    protected $fillable = [
        'user_id',
        'ca',
        'status'
    ];

    public function certificateOwner()
    {
        return $this->hasOne(user::class, 'id', 'user_id');
    }
}
