<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class speech_file extends Model
{
    protected $fillable = [
        'speech_id',
        'file_name',
        'uploader_id',
        'status',
        'signed'
    ];

    public function speechUploader()
    {
        return $this->belongsTo(User::class, 'uploader_id', 'id');
    }
}
