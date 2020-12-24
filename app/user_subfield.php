<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class user_subfield extends Model
{
    protected $fillable = [
        'user_id',
        'subfield_id'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function subfieldData()
    {
        return $this->belongsTo(subfield::class, 'subfield_id', 'id');
    }
}
