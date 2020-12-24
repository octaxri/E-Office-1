<?php

namespace App\Http\Controllers;

use App\speech_request_log;
use Illuminate\Http\Request;

class SpeechRequestLogController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function speechRequestLogData(Request $request)
    {
        return speech_request_log::with(['sender', 'receiver'])->where('speech_request_id', $request->id)->get();
    }
}
