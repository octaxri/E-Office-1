<?php

namespace App\Http\Controllers;

use App\role;
use App\user_role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function roleList(Request $request)
    {
        return role::get();
    }

    public function updateUserRole(Request $request)
    {
        if ( $request->user_id && $request->role_id ){
            user_role::updateOrCreate(['user_id' => $request->user_id],[
                'role_id' => $request->role_id,
                'status'  => 1
            ]);
            return response()->json(['success' => 'role berhasil di update'], 200);
        } else {
            user_role::where('user_id', $request->user_id)->delete();
            return response()->json(['success' => 'role berhasil di update'], 200);
        }
    }
}
