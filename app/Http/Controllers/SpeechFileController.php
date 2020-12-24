<?php

namespace App\Http\Controllers;

use App\speech_file;
use Illuminate\Http\Request;

class SpeechFileController extends Controller
{
    public function fileList(Request $request)
    {
        return speech_file::with('speechUploader.profile')->where(['speech_id' => $request->id])->get();
    }
}
