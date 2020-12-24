<?php

namespace App\Http\Controllers;

use App\account_request;
use App\Mail\AcceptRegistration;
use App\Mail\RejectRegistration;
use App\notification;
use App\User;
use App\user_role;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use PHPUnit\Framework\Constraint\Exception as ConstraintException;

class AccountRequestController extends Controller
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
    public function index(Request $request)
    {
        try {
            if ($request->id == null) {
                return response()->json(account_request::where('status', 0)->get(), 200);
            } else {
                return response()->json(account_request::where('id', $request->id)->first(), 200);
            }
        } catch (ConstraintException $e) {
            return response()->json(['errors' => 'Akses tidak diperbolehkan'], 401);
        }

        // return response()->json(account_request::all(), 200);
    }

    public function acceptAccount(Request $request)
    {
        try {
            $data = account_request::where('id', $request->id)->first();
            $data->update(['status' => 1]);
            $opd = User::create([
                    'name'      => $data->name,
                    'email'     => $data->email,
                    'password'  => $data->password,
                    'type'      => 2
            ]);
            user_role::create([
                    'user_id'   => $opd->id,
                    'role_id'   => 4,
                    'status'    => 1
            ]);

            Mail::to($opd)->queue(new AcceptRegistration());
            // notification::notifyUser(auth()->user()->id, $data['to'], 5, $data['speech_id']);

            return response()->json(['success' => 'Akun telah terdaftar dalam sistem. Email Notifikasi telah dikirimkan!'], 200);
        } catch (ConstraintException $e) {
            return response()->json(['errors' => 'Akses tidak diperbolehkan'], 401);
        }

    }

    public function rejectAccount(Request $request)
    {
        try {
            $data = account_request::where('id', $request->id)->first();
            $data->update(['status' => 2, 'reason' => $request->reason]);
            Mail::to($data)->send(new RejectRegistration($request->reason));

            return response()->json(['success' => 'Akun telah berhasil ditolak!'], 200);
        } catch (ConstraintException $e) {
            return response()->json(['errors' => 'Akses tidak diperbolehkan'], 401);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
     * @param  \App\account_request  $account_request
     * @return \Illuminate\Http\Response
     */
    public function show(account_request $account_request)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\account_request  $account_request
     * @return \Illuminate\Http\Response
     */
    public function edit(account_request $account_request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\account_request  $account_request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, account_request $account_request)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\account_request  $account_request
     * @return \Illuminate\Http\Response
     */
    public function destroy(account_request $account_request)
    {
        //
    }
}
