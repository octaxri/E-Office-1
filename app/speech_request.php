<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class speech_request extends Model
{
    protected $fillable = [
        'theme',
        'event',
        'to',
        'refer_to',
        'origin',
        'status'
    ];

    public function sender()
    {
        return $this->belongsTo(User::class, 'refer_to', 'id');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'to', 'id');
    }

    public function origin()
    {
        return $this->belongsTo(User::class, 'origin', 'id');
    }

    public function speechRequestFile()
    {
        return $this->hasOne(speech_request_file::class, 'speech_request_id', 'id');
    }

    public function logData()
    {
        return $this->hasMany(speech_request_log::class, 'speech_request_id', 'id');
    }
}
