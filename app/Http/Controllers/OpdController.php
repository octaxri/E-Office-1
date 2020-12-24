<?php

namespace App\Http\Controllers;

use App\account_request;
use App\opd;
use Illuminate\Http\Request;

class OpdController extends Controller
{
    function acceptedAccount()
    {
        return response()->json(account_request::where('status', '!=' , 0)->take(10)->get());
    }
}
