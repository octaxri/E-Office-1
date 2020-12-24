<?php

namespace App\Http\Controllers;

use App\menu;
use App\menu_permission;
use Illuminate\Http\Request;

class MenuPermissionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['guestMenu']]);
    }

    public function menuData(Request $request)
    {
        $roles = auth()->user()->roleData();
        foreach ($roles['data'] as $role){
            $menu[] = menu_permission::with('menuData')->where('role_id', $role->role_id)->get();
        }
        return response()->json($menu, 200);
    }

    public function guestMenu(Request $request)
    {
        $menu = menu::where('provider', 'guest')->get();
        return response()->json($menu, 200);
    }
}
