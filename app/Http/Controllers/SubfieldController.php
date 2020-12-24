<?php

namespace App\Http\Controllers;

use App\subfield;
use App\user_subfield;
use Illuminate\Http\Request;

class SubfieldController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function subfieldList()
    {
        return response()->json(subfield::get(), 200);
    }

    public function updateUserSubfield(Request $request)
    {
        if ( $request->user_id && $request->subfield_id ){
            user_subfield::updateOrCreate(['user_id' => $request->user_id],[
                'subfield_id' => $request->subfield_id
            ]);
            return response()->json(['success' => 'sub-bidang berhasil di update'], 200);
        } else {
            user_subfield::where('user_id', $request->user_id)->delete();
            return response()->json(['success' => 'sub-bidang telah dihapus.'], 200);
        }
    }
}
