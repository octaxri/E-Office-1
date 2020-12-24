<?php

namespace App\Http\Controllers;

use App\user_permission;
use Illuminate\Http\Request;

class UserPermissionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        $permission = user_permission::with('permissionData')->where('user_id', auth()->user()->id)->get();
        if ($permission->count() < 1) {
            return response()->json(['error' => 'User belum memiliki permission.'], 403);
        } else {
            return response()->json($permission, 200);
        }
    }
}
