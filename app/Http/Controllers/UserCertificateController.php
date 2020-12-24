<?php

namespace App\Http\Controllers;

use App\user_certificate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File as FacadesFile;
use Illuminate\Support\Str;

class UserCertificateController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function createNewCertificate(Request $request)
    {
        $rdm = Str::uuid();
        $configs = array(
            "config"                => "argon/certificate/openssl.cnf",
            "digest_alg"            => "sha512",
            "x509_extensions"       => "v3_ca",
            "req_extensions"        => "v3_req",
            "private_key_bits"      => 4096,
            "private_key_type"      => OPENSSL_KEYTYPE_RSA,
            "encrypt_key"           => true,
            "encrypt_key_cipher"    => OPENSSL_CIPHER_3DES,
            "keyUsage"              => ['nonRepudiation', 'digitalSignature', 'keyEncipherment']
        );

        $ca = file_get_contents('argon/certificate/root/myCA.pem');
        $privkeyca = file_get_contents('argon/certificate/root/myCA.key');
        // $key = openssl_pkey_export($privkeyca, $pkey, '', $configs);
        $read = openssl_x509_read($ca);
        // dd($pkey);
        // return openssl_x509_parse($ca);

        $info   = array(
            "countryName"               => $request->country,
            "stateOrProvinceName"       => $request->province,
            "localityName"              => $request->city,
            "organizationName"          => $request->organization,
            "organizationalUnitName"    => $request->unit,
            "commonName"                => $request->name,
            "emailAddress"              => $request->email
        );

        $ca             = public_path('argon/certificate/AppleISTCA8G1.cer');
        $unsigned_cert  = openssl_csr_new( $info, $privkeyca, $configs);
        $signed_cert    = openssl_csr_sign( $unsigned_cert, $read, $privkeyca, 365, $configs);
        $p12            = openssl_pkcs12_export( $signed_cert, $out, $privkeyca, $request->password , $configs);

        if ( $p12 ) {
            $path = public_path('argon/certificate/'.$rdm);
            if( !FacadesFile::isDirectory($path) ) {
                 FacadesFile::makeDirectory($path, 0777, true, true);
            }

            $this->deactivateUserCertificate(auth()->user()->id);

            user_certificate::create([
                'user_id' => auth()->user()->id,
                'ca'      => $rdm,
                'status'  => 1
            ]);

            file_put_contents($path.'/'.$rdm.'.p12', $out);

            return response()->json(['success' => 'Sertifikat berhasil dibuat!']);
        }
    }

    public function deactivateUserCertificate( $id )
    {
        $deactivate = user_certificate::where('user_id', $id)->update(['status'    => 0]);
        return $deactivate;
    }

    public function certificateList ()
    {
        return response()->json(user_certificate::with('certificateOwner.profile')->where('user_id', auth()->user()->id)->orderBy('id', 'DESC')->get());
    }


}
