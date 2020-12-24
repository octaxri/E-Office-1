<?php

namespace App\Http\Controllers;

use App\notification;
use App\role;
use App\role_permission;
use App\speech;
use App\speech_log;
use App\speech_request;
use App\speech_request_file;
use App\speech_request_log;
use App\speech_request_send_order;
use App\user_role;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class SpeechRequestController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return speech_request::with(['sender.occupation.occupationData','receiver.occupation.occupationData','speechRequestFile'])->where(['to' => auth()->user()->id, 'status' => 0])->get();
    }

    public function speechRequestData(Request $request)
    {
        return speech_request::with(['sender.occupation.occupationData','receiver.occupation.occupationData','origin.occupation.occupationData','speechRequestFile'])->where('id', $request->id)->first();
    }

    public function sendRequestToThis()
    {
        $to = speech_request_send_order::where('refer_to_role_id', auth()->user()->mainRoleData()->role_id)->pluck('to_role_id')->first();
        $to ? $list = user_role::with('roleData', 'userData')->where('role_id', $to)->get() : $list =  'Data Role Tidak ditemukan. Silahkan Hubungi Admin.';
        return response()->json($list, 200);
    }

    public function createSpeechRequest(Request $request)
    {
        try{
            $speech = speech_request::create([
                'theme'    => $request->theme,
                'event'    => $request->event,
                'origin'   => auth()->user()->id,
                'to'       => $request->to,
                'refer_to' => auth()->user()->id,
                'status'   => 0
            ]);

            $log = speech_request_log::create([
                'speech_request_id' => $speech->id ,
                'to_id'             => $request->to,
                'refer_to_id'       => auth()->user()->id,
            ]);

            if ( $request->file('file') ) {
                $file           = $request->file('file');
                $nama_file      = time()."_".str_replace(' ', '', $file->getClientOriginalName());
                speech_request_file::create(['speech_request_id' => $speech->id , 'file_name' => $nama_file ]);
                $file->move('argon/speech-request', $nama_file);
            }

            notification::notifyUser(auth()->user()->id, $request->to, 2, $speech->id);

            return response()->json(['success' => 'Permintaan berhasil di-disposisikan!'], 200);

        }catch(Exception $e){
            return response()->json(['errors' => $e], 401);
        }
    }

    public function dispatchSpeechRequest(Request $request)
    {
        try {
            if($request->id && $request->to)
            {
                $request->message ? $message = $request->message : $message = null;

                $dispatch = speech::create([
                    'speech_request_id'    => $request->id,
                    'to'                   => $request->to,
                    'refer_to'             => auth()->user()->id,
                    'status'               => 1,
                    'speech_send_order_id' => 1,
                    'message'              => $message
                ]);

                speech_log::create([
                    'speech_id'             => $dispatch->id ,
                    'to_id'                 => $request->to,
                    'refer_to_id'           => auth()->user()->id,
                    'status'                => 1,
                    'speech_send_order_id'  => 1,
                    'message'               => $message
                ]);

                speech_request::where('id', $request->id)->update([ 'status' => 1 ]);

                notification::notifyUser(auth()->user()->id, $request->to, 3, $dispatch->id);

                return response()->json(['success' => 'Data berhasil di-disposisikan!'], 200);
            }
            else {
                return response()->json(['error' => 'Anda belum memilih target disposisi!']);
            }
        } catch(Exception $e) {
            return response()->json(['error' => $e], 401);
        }
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
     * @param  \App\speech_request  $speech_request
     * @return \Illuminate\Http\Response
     */
    public function show(speech_request $speech_request)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\speech_request  $speech_request
     * @return \Illuminate\Http\Response
     */
    public function edit(speech_request $speech_request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\speech_request  $speech_request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, speech_request $speech_request)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\speech_request  $speech_request
     * @return \Illuminate\Http\Response
     */
    public function destroy(speech_request $speech_request)
    {
        //
    }
}
