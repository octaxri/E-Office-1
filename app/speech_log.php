<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class speech_log extends Model
{
    protected $fillable = [
        'speech_id',
        'to_id',
        'refer_to_id',
        'status',
        'speech_send_order_id',
        'message'
    ];

    public function receiver()
    {
        return $this->belongsTo(User::class, 'to_id', 'id');
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'refer_to_id', 'id');
    }

    public function speechData()
    {
        return $this->belongsTo(speech::class, 'speech_id', 'id');
    }
}
