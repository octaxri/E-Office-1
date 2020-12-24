<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class field extends Model
{
    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
