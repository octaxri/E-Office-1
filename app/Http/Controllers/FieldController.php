<?php

namespace App\Http\Controllers;

use App\field;
use App\user_field;
use Illuminate\Http\Request;

class FieldController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function fieldList()
    {
        return response()->json(field::get(), 200);
    }

    public function updateUserField(Request $request)
    {
        if ( $request->user_id && $request->field_id ){
            user_field::updateOrCreate(['user_id' => $request->user_id],[
                'field_id' => $request->field_id,
                'status'  => 1
            ]);
            return response()->json(['success' => 'bidang berhasil di update'], 200);
        } else {
            user_field::where('user_id', $request->user_id)->delete();
            return response()->json(['success' => 'bidang telah dihapus.'], 200);
        }
    }
}
