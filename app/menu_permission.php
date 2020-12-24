<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class menu_permission extends Model
{
    public function menuData()
    {
        return $this->belongsTo(menu::class, 'menu_id', 'id');
    }
}
