<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;

class DBBridge
{

  public function send($notifiable, Notify $notification)
  {
    $data = $notification->toDatabase($notifiable);

    return $notifiable->routeNotificationFor('database')->create([
        'id'            => $notification->id,
        'sender_id'     => $data['sender_id'], //<-- comes from toDatabase() Method below
        // 'notifiable_id' => $data['receiver_id'],
        'type'          => get_class($notification),
        'data'          => [
                                'message'   => $data['data']['message'],
                                'icon'      => $data['data']['icon'],
                                'type'      => $data['data']['type'],
                                'url'       => $data['data']['url'],
                                'key'       => $data['data']['key']
                           ],
        'read_at'       => null
    ]);
  }

}
