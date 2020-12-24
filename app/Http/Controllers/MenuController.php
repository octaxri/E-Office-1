<?php

namespace App\Http\Controllers;

use App\menu;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function index(Request $request)
    {
        $menus = menu::orderBy('created_at', 'DESC')->limit(20)->offset($request->offset)->get();
        // $menus = $menus->map(function($menu){
        //     return $menu;
        // });

        return $menus;
    }

    function store(Request $request)
    {
        $data = $request->all();
        menu::create($data);
        $response = [
            'message' => 'Registered successfully',
            'success' => true
        ];

        return response()->json($response, 201);
    }
}
