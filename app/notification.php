<?php

namespace App;

use App\Notifications\Notify;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class notification extends Model
{
    use Notifiable;
    public $incrementing = false;

    protected $fillable = ['read_at'];

    protected $casts = [
        'data' => 'array',
        'read_at' => 'datetime',
    ];

    static function notifyUser($sender_id, $receiver_id, $type, $key)
    {
        $receiver   = User::find($receiver_id);
        $content    = notification_type::find($type);
        $data       = [
                        'sender_id' => $sender_id,
                        'message'   => $content->message,
                        'type'      => $type,
                        'icon'      => $content->icon,
                        'url'       => $content->url,
                        'key'       => $key
                      ];

        $receiver->notify(new Notify($data));
    }

    public function notificationSenderData()
    {
        return $this->belongsTo(User::class, 'sender_id', 'id');
    }
}
