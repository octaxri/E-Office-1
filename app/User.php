<?php

namespace App;

use Exception;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password','api_token','type'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'email_verified_at', 'created_at', 'updated_at', 'api_token'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Rest omitted for brevity

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    function userId(){
        return auth()->user()->id;
    }

    public function roleData()
    {
        try{
            $data = user_role::with('roleData')->where('user_id', $this->userId())->get();
            if ( count($data) == 0 ) {
                return ['error' => 'data tidak ditemukan'];
            } else {
                return ['success' => 'data tersedia', 'data' => $data];
            }
        }
        catch(Exception $e){
            return $e;
        }
    }

    public function mainRoleData()
    {
        try{
            $data = user_role::with('roleData')->where(['user_id' => $this->userId(), 'status' => 1])->first();
            if ( !$data) {
                return ['error' => 'data tidak ditemukan'];
            } else {
                return $data;
            }
        }
        catch(Exception $e){
            return $e;
        }
    }

    public function occupationData()
    {
        try{
            $data = user_occupation::with('occupationData')->where('user_id', $this->userId())->first();
            if ( !$data ) {
                return ['error' => 'data tidak ditemukan'];
            } else {
                return ['success' => 'data tersedia', 'data' => $data];
            }
        }
        catch(Exception $e){
            return $e;
        }
    }

    public function fieldData()
    {
        try{
            $data = user_field::with('fieldData')->where('user_id', $this->userId())->first();
            if ( !$data ) {
                return ['error' => 'data tidak ditemukan'];
            } else {
                return ['success' => 'data tersedia', 'data' => $data];
            }
        }
        catch(Exception $e){
            return $e;
        }
    }

    public function subfieldData()
    {
        try{
            $data = user_subfield::with('subfieldData')->where('user_id', $this->userId())->first();
            if ( !$data ) {
                return ['error' => 'data tidak ditemukan'];
            } else {
                return ['success' => 'data tersedia', 'data' => $data];
            }
        }
        catch(Exception $e){
            return $e;
        }
    }

    // public function role()
    // {
    //     return $this->hasMany(user_role::class, 'user_id', 'id');
    // }

    public function occupation()
    {
        return $this->hasOne(user_occupation::class, 'user_id', 'id');
    }

    public function field()
    {
        return $this->hasOne(user_field::class, 'user_id', 'id');
    }

    public function subfield()
    {
        return $this->hasOne(user_subfield::class, 'user_id', 'id');
    }

    public function role()
    {
        return $this->hasOne(user_role::class, 'user_id', 'id');
    }

    public static function profileData( $id )
    {
        $user       = User::where('id' , $id)->first();
        $occupation = user_occupation::with('occupationData')->where('user_id', $id)->first();
        $role       = user_role::with('roleData')->where(['user_id' => $id, 'status' => 1])->first();
        $field      = user_field::with('fieldData')->where('user_id', $id)->first();
        $subfield   = user_subfield::with('subfieldData')->where('user_id', $id)->first();
        $biography  = user_profile::where('user_id', $id)->first();

        return
            collect([
                'name'       => $user->name,
                'email'      => $user->email,
                'occupation' => $occupation,
                'role'       => $role,
                'field'      => $field,
                'subfield'   => $subfield,
                'biography'  => $biography
            ]);
    }

    public function profile()
    {
        return $this->hasOne(user_profile::class, 'user_id', 'id');
    }

    public function activeCA()
    {
        return user_certificate::where(['user_id' => auth()->user()->id, 'status' => 1])->pluck('ca')->first();
    }

    public static function allNotification($user_id) {
        return notification::with('notificationSenderData.profile')->where(['notifiable_id' => $user_id])->orderBy('created_at', 'desc')->get();
    }

    public function speechWritten($id)
    {
        return speech_log::with(['speechData.speechRequest'])->where(['refer_to_id' => $id])->get()->keyBy('speech_id')->values()->count();
    }

}
