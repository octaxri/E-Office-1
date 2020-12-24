<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Requests\UserRequest;
use App\Mail\ADMCreateAccount;
use App\role;
use App\role_permission;
use App\speech;
use App\speech_log;
use App\user_field;
use App\user_occupation;
use App\user_permission;
use App\user_profile;
use App\user_role;
use App\user_subfield;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class UserController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }
    /**
     * Display a listing of the users
     *
     * @param  \App\User  $model
     * @return \Illuminate\View\View
     */
    public function index()
    {
        return response()->json(User::with('occupation.occupationData','field.fieldData','subfield.subfieldData','role.roleData','profile')->where('type', 1)->get());
    }

    public function roleData()
    {
        return auth()->user()->roleData();
    }

    public function occupationData()
    {
        return auth()->user()->occupationData();
    }

    public function fieldData()
    {
        return auth()->user()->fieldData();
    }

    public function subfieldData()
    {
        return auth()->user()->subfieldData();
    }

    // get profile by Auth Token
    public function userProfileData()
    {
        return response()->json(
            collect([
                'me'           => auth()->user(),
                'role'         => auth()->user()->mainRoleData(),
                'occupation'   => auth()->user()->occupationData(),
                'field'        => auth()->user()->fieldData(),
                'subfield'     => auth()->user()->subfieldData()
            ])
        );
        // return User::profileData(auth()->user()->id);
    }

    // get profile by specific id
    public function userDetail(Request $request)
    {
        return User::profileData($request->id);
    }

    public function userBiography()
    {
        return user_profile::where('user_id', auth()->user()->id)->first();
    }

    public function rolePermissionData()
    {
        // return auth()->user()->mainRoleData()->role_id;
        return response()->json(role_permission::with('permissionData')->where('role_id', auth()->user()->mainRoleData()->role_id)->get(), 200);
    }

    public function uploadPhoto(Request $request)
    {
        $file           = $request->file('photo');
        $file_name      = time()."_".str_replace(' ', '', $file->getClientOriginalName());

        user_profile::updateOrCreate(['user_id' => auth()->user()->id ], ['profile_pic_url' => $file_name]);

        $file->move('argon/img/profile', $file_name);

        return response()->json(['success' => 'Foto Berhasil di upload'], 200);
    }

    public function writer(Request $request)
    {
        $list = User::with(['role','profile'])->whereHas('role.roleData', function ($query) {
            $query->where('id','=', 2);
        })->get();

        foreach ($list as $user) {
            $speech     = speech_log::with(['speechData.speechRequest'])->where(['refer_to_id' => $user->id])->get()->keyBy('speech_id')->values()->count();
            $data[]     = collect(['user_data' => $user, 'speech_written' => $speech]);
            // $list->where('speech_id', $key->id)->first()
        }
        return response()->json($data, 200);
        // return $writers;
    }

    public function addUser(Request $request)
    {
        $check = user_permission::where(['user_id' => auth()->user()->id, 'permission_id' => 17])->first();

        if( $check ){
            $password = Str::random(6);
            User::create([
                'name'      => $request->name,
                'email'     => $request->email,
                'password'  => Hash::make($password),
                'type'      => 1
            ]);
            Mail::to($request->email)->send(new ADMCreateAccount($password));
            return response()->json(['success' => 'User telah ditambahkan ke dalam sistem & password:'.$password], 200);
        } else {
            return response()->json(['error' => 'Anda tidak memilki akses!'], 403);
        }
    }
}
