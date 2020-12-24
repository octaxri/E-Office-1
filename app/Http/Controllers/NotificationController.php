<?php

namespace App\Http\Controllers;

use App\notification;
use App\User;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function getNotifications()
    {
        $data = User::allNotification(auth()->user()->id);
        return response()->json($data, 200);
    }

    public function notificationsCount()
    {
        $notification = notification::where(['notifiable_id' => auth()->user()->id, 'read_at' => null])->get();
        return response()->json($notification->count(), 200);
    }

    public function readNotification(Request $request)
    {
        $notification = notification::where(['id' => $request->id, 'notifiable_id' => auth()->user()->id])->first();
        // return $notification;
        if ($notification && $notification->read_at == null) {
            $notification->update(['read_at' => now()]);
            return response()->json(['success' => 'Notification marked as read.']);
        }
    }
}
