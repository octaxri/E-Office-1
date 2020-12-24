<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class user_field extends Model
{
    protected $fillable = [
        'user_id',
        'field_id'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function fieldData()
    {
        return $this->belongsTo(field::class, 'field_id', 'id');
    }
}
