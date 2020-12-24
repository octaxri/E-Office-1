<?php

namespace App\Http\Controllers;

use App\speech;
use App\speech_log;
use App\speech_request_log;
use App\User;
use App\user_occupation;
use Illuminate\Http\Request;

class SpeechLogController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['documentLog']]);
    }

    public function speechLogData(Request $request)
    {
        $speech_request_id = speech::where('id', $request->id)->pluck('speech_request_id')->first();
        $speech_log        = speech_log::where('speech_id', $request->id)->get();
        $request_log       = speech_request_log::where('speech_request_id', $speech_request_id)->get();

        $speech_data  = $speech_log->map(function($speech) {
            $sender   = User::profileData($speech->refer_to_id);
            $receiver = User::profileData($speech->to_id);
            return ['speech_data' => $speech, 'sender_data' => $sender, 'receiver_data' => $receiver];
        });

        $request_data = $request_log->map(function($request) {
            $sender   = User::profileData($request->refer_to_id);
            $receiver = User::profileData($request->to_id);
            return ['request_data' => $request, 'sender_data' => $sender, 'receiver_data' => $receiver];
        });

        $data = [
            'speech_log'         => $speech_data,
            'speech_request_log' => $request_data
        ];

        return response()->json($data, 200);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function dispatchHistory()
    {
        // return speech_log::with(
        //     [
        //         'speechData.speechRequest' => function($query){ $query->select('id','theme'); },
        //         'sender.profile' => function($query){ $query->select('name'); },
        //     ])->get();

        return speech_log::with('speechData.speechRequest','receiver.profile')->where('refer_to_id', auth()->user()->id)->orderBy('id','desc')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function lastDispatchTo()
    {
        return speech_log::with('receiver.profile','receiver.role.roleData')->where('refer_to_id', auth()->user()->id)->orderBy('id','desc')->first();
    }

    public function documentLog()
    {
        return speech_log::with('speechData.speechRequest','receiver.profile')->where('refer_to_id', auth()->user()->id)->orderBy('id','desc')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\speech_log  $speech_log
     * @return \Illuminate\Http\Response
     */
    public function show(speech_log $speech_log)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\speech_log  $speech_log
     * @return \Illuminate\Http\Response
     */
    public function edit(speech_log $speech_log)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\speech_log  $speech_log
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, speech_log $speech_log)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\speech_log  $speech_log
     * @return \Illuminate\Http\Response
     */
    public function destroy(speech_log $speech_log)
    {
        //
    }
}
