<?php

namespace App\Http\Controllers;

use App\account_request;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\notification;
use App\role;
use App\User;
use Carbon\Exceptions\Exception as Exception;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','opdLogin','OPDregister']]);
    }

    /**
     * Get a JWT token via given credentials.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $check = User::where(['email' => $request->email])->first();

        if ( $check && $check->type == $request->type ){
            $credentials = $request->only('email', 'password');

            if ($token = $this->guard()->attempt($credentials)) {
                return $this->respondWithToken($token);
            }
            return response()->json(['error' => 'Email atau Password Salah']);

        } else {
            return response()->json(['error' => 'Akun tidak dapat ditemukan atau Form salah!']);
        }
    }

    public function opdLogin(Request $request)
    {
        $check = User::where(['email' => $request->email])->first();

        if ( $check && $check->type == $request->type ){
            $credentials = $request->only('email', 'password');

            if ($token = $this->guard()->attempt($credentials)) {
                return $this->respondWithToken($token);
            }
            return response()->json(['error' => 'Email atau Password Salah']);

        } else {
            return response()->json(['error' => 'Akun tidak dapat ditemukan atau Form salah!']);
        }
    }

    public function OPDregister(Request $request)
    {
        try{
            $file           = $request->file('file');
            $nama_file      = time()."_".str_replace(' ', '', $file->getClientOriginalName());

            $register = account_request::create([
                'name'      => $request->name ,
                'email'     => $request->email,
                'password'  => Hash::make($request->password),
                'file'      => $nama_file,
                'status'    => 0
            ]);

            if ( $register ) {

                $leader = User::with(['role'])->whereHas('role.roleData', function ($query) {
                    $query->where('id','=', 1);
                })->first();

                if ( $leader ) {
                    $file->move('argon/request',$nama_file);
                    notification::notifyUser(null, $leader->id, 1, $register->id);

                    return response()->json(['success' => 'Registrasi Berhasil'], 200);
                }
                else {
                    return response()->json(['error' => 'Registrasi Gagal. Kepala Badan belum di set oleh sistem!'], 200);
                }
            } else {
                return response()->json(['error' => 'Registrasi Gagal. Silahkan periksa kembali form anda'], 200);
            }

        }catch(Exception $e){
            return response()->json(['error' => $e], 401);
        }
    }

    /**
     * Get the authenticated User
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {

        return response()->json(
            collect(
                    $this->guard()->user(),
                    auth()->user()->roles,
                    auth()->user()->occupation,
                    auth()->user()->field,
                    auth()->user()->subfield
                    // auth()->user()->userRoles()
                )
            );
    }

    /**
     * Change User Password
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function changePassword(Request $request)
    {
        User::where('id', auth()->user()->id)->update([
            'password' => Hash::make($request->password)
        ]);
    }

    /**
     * Log the user out (Invalidate the token)
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        $this->guard()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken($this->guard()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $this->guard()->factory()->getTTL() * 60,
            'user' => collect([
                'me'           => $this->guard()->user(),
                'role'         => auth()->user()->mainRoleData(),
                'occupation'   => auth()->user()->occupationData(),
                'field'        => auth()->user()->fieldData(),
                'subfield'     => auth()->user()->subfieldData()
            ])
        ]);
    }

    /**
     * Get the guard to be used during authentication.
     *
     * @return \Illuminate\Contracts\Auth\Guard
     */
    public function guard()
    {
        return Auth::guard();
    }
}
