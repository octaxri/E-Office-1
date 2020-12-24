<?php

namespace App\Http\Controllers;

use App\occupation;
use App\user_occupation;
use Illuminate\Http\Request;

class OccupationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function occupationList(Request $request)
    {
        return response()->json(occupation::get(), 200);
    }

    public function updateUserOccupation(Request $request)
    {
        if ( $request->user_id && $request->occupation_id ){
            user_occupation::updateOrCreate(['user_id' => $request->user_id],[
                'occupation_id' => $request->occupation_id
            ]);
            return response()->json(['success' => 'jabatan berhasil di update.'], 200);
        } else {
            user_occupation::where('user_id', $request->user_id)->delete();
            return response()->json(['success' => 'jabatan berhasil di reset.'], 200);
        }
    }
}
