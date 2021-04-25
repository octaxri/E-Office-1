<?php

namespace App\Http\Controllers;

use App\user_certificate;
use Endroid\QrCode\QrCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File as FacadesFile;
use Illuminate\Support\Str;
use SplFileObject;
use TCPDI;

class UserCertificateController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api',['except' => ['demoNewCertificate','signTest', 'content', 'signTestSelector']]);
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

        $args = array(
            'extracerts' => $ca,
            'friendly_name' => 'My signed cert by CA certificate'
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

    public function demoNewCertificate(Request $request)
    {
        $rdm = Str::uuid();
        $configs = array(
            "config"                => "argon/demo-certificates/p12.cnf",
            "digest_alg"            => "sha256",
            // "x509_extensions"       => "v3_ca",
            // "req_extensions"        => "v3_req",
            "private_key_bits"      => 4096,
            "private_key_type"      => OPENSSL_KEYTYPE_RSA,
            "encrypt_key"           => true,
            // "encrypt_key_cipher"    => OPENSSL_CIPHER_3DES,
            // "keyUsage"              => ['digitalSignature', 'keyEncipherment'],
            "extendedKeyUsage"      => ['1.3.6.1.4.1.311.10.3.12', '1.2.840.113583.1.1.5']
        );

        $csr_config = array(
            "config"    => "argon/demo-certificates/intermediate.cnf"
        );

        $root       = file_get_contents('argon/demo-certificates/ca.cert.pem');
        $ca         = file_get_contents('argon/demo-certificates/intermediate.cert.pem');
        $privkeyca  = array(file_get_contents('argon/demo-certificates/intermediate.key.pem'), "2020v2");
        $chain      = file_get_contents('argon/demo-certificates/ca-chain.cert.pem');
        $read       = openssl_x509_read($ca);
        // $priv       = openssl_x509_read($privkeyca);

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

        $unsigned_cert  = openssl_csr_new( $info, $privkeyca, $csr_config);
        $signed_cert    = openssl_csr_sign( $unsigned_cert, $read, $privkeyca, 365, $configs);


        $args = array(
            'extracerts' => array(openssl_x509_read($root), openssl_x509_read($chain), openssl_x509_read($signed_cert)),
            'friendly_name' => 'Cert - CA Signed'
        );

        $p12            = openssl_pkcs12_export( $ca, $out, $privkeyca, $request->password, $args);

        if ( $p12 ) {
            $path = public_path('argon/demo-certificates/demo');

            file_put_contents($path.'/demo.p12', $out);

            return response()->json(['success' => 'Certificate made successfuly!']);
            // return openssl_x509_read($out);
        }
    }

    public function createUIDB6($length)
    {
        return Str::random($length);
    }

    public function signTest(Request $request)
    {
        $rdm        = Str::uuid();

        $data = array(
            'name'          => 'E-OFFICE',
            'uuid'          => $rdm,
            'ca_password'   => $request->password,
            'tsa_url'       => 'http://timestamp.apple.com/ts01',
            'reason'        => 'E-Sign Demo - DV Cert. Class 1',
            'location'      => 'Indonesia',
            'contact'       => 'oep@o-eoffice-p.herokuapp.com',
            'document_path' => public_path('argon/speech/tmp/'.$rdm.'.pdf'),
            'output_path'   => public_path('argon/demo-speech/signed/'.$rdm.'.pdf'),
            'qr_path'       => public_path('argon/demo-speech/QR/'.$rdm.'.png'),
        );

        // file_put_contents('argon/demo-speech/'.$rdm.'.pdf', file_get_contents($request->file('file')));

        $certificate = 'argon/demo-certificates/demo/demo.p12';
        $check       = openssl_pkcs12_read(file_get_contents($certificate), $p12, $data['ca_password']);
        if ( $check ) {
            $info = array(
                'Name'          => $data['name'],
                'Location'      => $data['location'],
                'Reason'        => $data['reason'],
                'ContactInfo'   => $data['contact'],
            );

            $uuid = $this->createUIDB6(8);

            $tsa = file_get_contents('argon/demo-certificates/tsa.pem');

            $pdf = new TCPDI(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
            // $pdf = new TPDF::(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

            $pdf->setTimeStamp($data['tsa_url'], null, null, $tsa);
            $pdf->setSignature($p12['cert'], $p12['pkey'], $data['ca_password'], '', 1, $info, 'A');

            $pagecount = $pdf->setSourceData( file_get_contents($request->file('file')) );
            for ( $i = 1; $i <= $pagecount; $i++ ) {
                $tpl = $pdf->importPage( $i );
                $pdf->SetMargins(PDF_MARGIN_LEFT,PDF_MARGIN_RIGHT);
                $pdf->SetPrintHeader(false);
                $pdf->SetPrintFooter(false);
                $pdf->AddPage();
                $pdf->useTemplate($tpl, null, null, 0, 0, true);
            }

            $qrcode = new QrCode('Sign Demo OEP - DV Class 1');
            $qrcode->setSize(300);
            $qrcode->writeFile($data['qr_path']);

            $pWidth     = 20;
            $pHeight    = 20;

            if ($request->signature_position == 'BOTTOM_LEFT') {
                $this->signatureBottomLeft($pdf, $data, $pWidth, $pHeight);
            } elseif ($request->signature_position == 'BOTTOM_MID') {
                $this->signatureBottomMid($pdf, $data, $pWidth, $pHeight);
            } elseif ($request->signature_position == 'BOTTOM_RIGHT') {
                $this->signatureBottomRight($pdf, $data, $pWidth, $pHeight);
            }

            $pdf->Output($data['output_path'], 'I');

            return response()->json(['success' => 'Document is signed!'], 200);
        } else {
            return response()->json(['error' => 'Wrong Passphrase or Form value is not correct!'], 401);
        }
    }

    private function imagePosition($pdf, $data, $x, $pWidth, $pHeight) {
        $height = $pdf->getPageHeight() - 55;
        $pdf->Image( $data['qr_path'], $x, $height, $pWidth, $pHeight, 'PNG' );
        $pdf->setSignatureAppearance( $x, $height, $pWidth, $pHeight );
    }

    public function signatureBottomLeft($pdf, $data, $pWidth, $pHeight) {
        $margins    = $pdf->getMargins();
        $x          = $pdf->getPageWidth() - ($pdf->getPageWidth() - $margins['left']);
        $this->imagePosition($pdf, $data, $x, $pWidth, $pHeight);
    }

    public function signatureBottomMid($pdf, $data, $pWidth, $pHeight) {
        $x          = $pdf->getPageWidth()/2 - ($pWidth - 10);
        $this->imagePosition($pdf, $data, $x, $pWidth, $pHeight);
    }

    public function signatureBottomRight($pdf, $data, $pWidth, $pHeight) {
        $margins    = $pdf->getMargins();
        $x          = $pdf->getPageWidth()/2 - ($pWidth + $margins['right']);
        $this->imagePosition($pdf, $data, $x, $pWidth, $pHeight);
    }

    public function content(Request $request)
    {
        $file = $request->file('file');
        $content = file_get_contents($file);

        $regexp = '#ByteRange\s*\[(\d+) (\d+) (\d+)#';
        // $regexp = '#ByteRange\[\s*(\d+) (\d+) (\d+)#'; // subexpressions are used to extract b and c

        $result = [];
        preg_match_all($regexp, $content, $result);

        // $result[2][0] and $result[3][0] are b and c
        if (isset($result[2]) && isset($result[3]) && isset($result[2][0]) && isset($result[3][0]))
        {
            $start = $result[2][0];
            $end = $result[3][0];
            if ($stream = fopen($file, 'rb')) {
                $signature = stream_get_contents($stream, $end - $start - 2, $start + 1); // because we need to exclude < and > from start and end

                fclose($stream);
            }

            $privkeyca  = array(file_get_contents('argon/demo-certificates/intermediate.key.pem'), "2020v2");
            $private_key = openssl_pkey_get_private($privkeyca, '2020v2');
            $pem_public_key = openssl_pkey_get_details($private_key)['key'];
            $public_key = openssl_pkey_get_public($pem_public_key);
        //  $test = openssl_pkey_get_public(file_get_contents('argon/demo-certificates/intermediate.key.pem'));
            // state whether signature is okay or not
            $ok = openssl_verify($content, $signature, $public_key);
            if ($ok == 1) {
                echo "good";
            } elseif ($ok == 0) {
                echo "bad";
            } else {
                echo "ugly, error checking signature";
            }
            // free the key from memory
            // openssl_free_key($pubkeyid);
            // echo $content;
        }
        return $pem_public_key;
        // return hex2bin($signature);
        // file_put_contents('argon/demo-certificates/signature.pkcs7', hex2bin($signature));

    }

    public function signTestSelector(Request $request)
    {
        $rdm        = Str::uuid();

        $data = array(
            'name'          => 'E-OFFICE',
            'uuid'          => $rdm,
            'ca_password'   => $request->password,
            'tsa_url'       => 'http://timestamp.apple.com/ts01',
            'reason'        => 'E-Sign Demo - DV Cert. Class 1',
            'location'      => 'Indonesia',
            'contact'       => 'oep@o-eoffice-p.herokuapp.com',
            'document_path' => public_path('argon/speech/tmp/'.$rdm.'.pdf'),
            'output_path'   => public_path('argon/demo-speech/signed/'.$rdm.'.pdf'),
            'qr_path'       => public_path('argon/demo-speech/QR/'.$rdm.'.png'),
        );

        // file_put_contents('argon/demo-speech/'.$rdm.'.pdf', file_get_contents($request->file('file')));

        $certificate = 'argon/demo-certificates/demo/demo.p12';
        $check       = openssl_pkcs12_read(file_get_contents($certificate), $p12, $data['ca_password']);
        if ( $check ) {
            $info = array(
                'Name'          => $data['name'],
                'Location'      => $data['location'],
                'Reason'        => $data['reason'],
                'ContactInfo'   => $data['contact'],
            );

            $uuid = $this->createUIDB6(8);

            $tsa = file_get_contents('argon/demo-certificates/tsa.pem');

            $pdf = new TCPDI('P', 'pt', PDF_PAGE_FORMAT, true, 'UTF-8', false);

            $pdf->setTimeStamp($data['tsa_url'], null, null, $tsa);
            $pdf->setSignature($p12['cert'], $p12['pkey'], $data['ca_password'], '', 1, $info, 'A');

            $pWidth     = 80;
            $pHeight    = 80;

            $x = $request->xPos;
            $y = $request->yPos;

            $qrcode = new QrCode('Sign Demo OEP - DV Class 1');
            $qrcode->setSize(300);
            $qrcode->writeFile($data['qr_path']);

            $pageWidth      = $pdf->getPageWidth();
            $pageHeight     = $pdf->getPageHeight();
            $margin         = $pdf->getMargins();
            $totalHeight    = $this->toPixels($pageHeight + $margin['bottom'] + $margin['top'] - $pdf->getBreakMargin());
            $totalWidth     = $this->toPixels($pageWidth + $margin['left'] + $margin['right'] - $pdf->getBreakMargin());
            $ctWidth        = $request->ct_width;
            $ctHeight       = $request->ct_height;
            $widthRatio     = $this->toPt( $totalWidth / $ctWidth );
            $heightRatio    = $this->toPt( $totalHeight / $ctHeight );
            $qrWidth        = $this->toPt($request->qr_width);
            $qrHeight       = $this->toPt($request->qr_height);

            if ($x == 0) {
                $scaledXPosition = round($widthRatio, 2);
            } else {
                $scaledXPosition = round($widthRatio * $x, 2);
            }

            if ($y == 0) {
                $scaledYPosition = round($heightRatio, 2);
            } else {
                $scaledYPosition = round($heightRatio*$y - ($qrHeight-$qrWidth), 2);
            }

            $style = array(
                'vpadding'  => 1,
                'hpadding'  => 1,
                'fgcolor'   => array(0,0,0),
                'bgcolor'   => array(255,255,255),
            );

            $file = file_get_contents('argon/demo-speech/template/template.pdf');
            $pagecount = $pdf->setSourceData( $file );
            for ( $i = 1; $i <= $pagecount; $i++ ) {
                $tpl = $pdf->importPage( $i );
                // $pdf->SetMargins(0,0);
                $pdf->SetPrintHeader(false);
                $pdf->SetPrintFooter(false);
                $pdf->AddPage();
                $pdf->useTemplate($tpl, null, null, 0, 0, true);
                if ($request->sign_page == $i) {
                    // $pdf->Image( $data['qr_path'], $scaledXPosition, $scaledYPosition, $pWidth, $pHeight, 'PNG' );
                    $pdf->write2DBarcode('Sign Demo OEP - DV Certificate Class 1', 'QRCODE,H', $scaledXPosition, $scaledYPosition, $pWidth, $pWidth, $style, 'N');
                }
            }

            $pdf->setSignatureAppearance( $scaledXPosition, $scaledYPosition, $pWidth, $pHeight , $request->sign_page);
            $pdf->Output($data['output_path'], 'I');
            // return response()->json([
            //     'success' =>
            //     [
            //         'w'         => $totalWidth,
            //         'h'         => $totalHeight,
            //         'scaleW'    => $ctWidth / $totalWidth,
            //         'scaleH'    => $ctHeight / $totalHeight,
            //         'xPos'      => $x,
            //         'yPos'      => $y,
            //         'sXPos'     => $scaledXPosition,
            //         'sYPos'     => $scaledYPosition,
            //         'qrWidth'   => $qrWidth,
            //         'qrHeight'  => $qrHeight,
            //         'widthRatio'=> $widthRatio,
            //         'Y'         => $pdf->GetY(),
            //         'break'     => $pdf->getBreakMargin()
            //     ]
            // ], 200);
            // return response()->json(['success' => 'Document is signed!'], 200);
        } else {
            return response()->json(['error' => 'Wrong Passphrase or Form value is not correct!'], 401);
        }
    }

    function toPt($value){
        return $value * 0.75;
    }

    function toPixels($value){
        return $value * 1.328352013;
        // case "mm": return $value * 3.779527559;
        // case "in": return $value * 96;
        // case "cm": return $value * 37.795275591;
    }


}
