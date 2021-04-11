<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class speech extends Model
{
    protected $fillable = [
        'to',
        'refer_to',
        'speech_request_id',
        'status',
        'speech_send_order_id',
        'sign_permission',
        'message',
        'uuid',
        'document_number'
    ];

    public function log()
    {
        return $this->hasMany(speech_log::class, 'speech_id', 'id');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'to', 'id');
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'refer_to', 'id');
    }

    public function speechRequest()
    {
        return $this->belongsTo(speech_request::class, 'speech_request_id', 'id');
    }

    public static function speechMainFile( $id )
    {
        $main = speech_file::with(['speechUploader.profile'])->where(['speech_id' => $id, 'status' => 1])->first();
        return $main;
        // return $this->hasOne(speech_file::class, 'speech_id', 'id');
    }

    public function files()
    {
        return $this->hasMany(speech_file::class, 'speech_id', 'id');
    }

}
