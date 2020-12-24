<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class speech_request_file extends Model
{
    protected $fillable =[
        'speech_request_id',
        'file_name'
    ];

    public function speechRequestFile()
    {
        return $this->belongsTo(speech_request::class, 'speech_request_id', 'id');
    }
}
