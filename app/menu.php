<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class menu extends Model
{
    protected $fillable = ['name','icon','url','has_notification'];
}
