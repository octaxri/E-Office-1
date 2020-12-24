<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class speech_request_log extends Model
{
    protected $fillable = [
        'speech_request_id',
        'to_id',
        'refer_to_id'
    ];

    public function receiver()
    {
        return $this->belongsTo(User::class, 'to_id', 'id');
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'refer_to_id', 'id');
    }

    public function userData()
    {
        return collect($this->receiver(), $this->sender());
    }
}
