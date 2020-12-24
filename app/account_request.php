<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class account_request extends Model
{
    protected $fillable = ['name', 'email', 'password', 'file','status','reason'];
}
