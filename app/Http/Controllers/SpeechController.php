<?php

namespace App\Http\Controllers;

use App\account_request;
use App\Mail\AcceptRegistration as AcceptRegistration;
use App\Mail\DocumentSigned;
use App\Mail\RejectRegistration;
use App\notification;
use App\role_permission;
use App\speech;
use App\speech_file;
use App\speech_log;
use App\speech_request;
use App\speech_send_order;
use App\User;
use App\user_role;
// use Barryvdh\DomPDF\PDF;
use Barryvdh\DomPDF\Facade as PDF;
use Carbon\Carbon;
// use PDF;
use Endroid\QrCode\QrCode as QR;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notification as NotificationsNotification;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification as FacadesNotification;
use Illuminate\Support\Str;
use Laravel\Ui\Presets\React;
use TCPDI;
use LaravelQRCode\Facades\QRCode as FacadesQRCode;
use QR_Code\QR_Code;
use ZipArchive;

// use Elibyy\TCPDF\Facades\TCPDF;

class SpeechController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['documentCheck','generateReport']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function all()
    {

        return speech::with(['sender.profile','sender.role.roleData','receiver.role.roleData','speechRequest'])->where('to', auth()->user()->id);

        // return response()->json(['speech_data' => $speech_data]);
    }

    public function index()
    {
        $speech_data  = $this->all()->get()->map(function($speech) {
            $main_file   = speech::speechMainFile($speech->id);
            return ['speech_data' => $speech, 'speech_main_file' => $main_file];
        });
        return response()->json($speech_data, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function detail(Request $request)
    {
        $speech     = speech::with(['sender.occupation.occupationData','sender.profile','sender.role.roleData','receiver.occupation.occupationData','receiver.role.roleData'])
                            ->where(['to' => auth()->user()->id, 'id' => $request->id])
                            ->first();

        // $main_file = speech::speechMainFile($request->id);

        if ( $speech ) {
            $speech_req = speech_request::with(['receiver.occupation.occupationData','sender.occupation.occupationData','origin','speechRequestFile'])
                                        ->where('id', $speech->speech_request_id)
                                        ->first();

            $speech_main_file = speech::speechMainFile($request->id);

            $data       = collect(['speech_data' => $speech,'speech_main_file' => $speech_main_file, 'speech_request' => $speech_req]);

            return response()->json($data, 200);
        } else {
            return response()->json(['error' => 'Data sudah berpindah ke user lain'], 403);
        }
    }

    public function sendSpeechTo(Request $request)
    {
        $speech = speech::where('id', $request->id )->first();

        $to = speech_send_order::where([
            'id'                => (int)$speech->speech_send_order_id,
            'refer_to_role_id'  => auth()->user()->mainRoleData()->role_id
        ])->first();

        $to ? $list = user_role::with('roleData', 'userData.field.fieldData', 'userData.profile')->where('role_id', $to->to_role_id)->get()
            : $list =  null;

        return response()->json(
            collect([
                'current_order' => (int)$speech->speech_send_order_id,
                'to'            => $to,
                'sign_allowed'  => $to->sign_permission,
                'user'          => $list
            ]), 200);

        // return auth()->user()->mainRoleData()->role_id;
    }

    public function returnSpeechTo(Request $request)
    {
        $check      = role_permission::where(['role_id' => auth()->user()->mainRoleData()->role_id, 'permission_id' => 12])->first();
        // return  auth()->user()->mainRoleData();
        if( $check ) {

            $speech     = speech::where('id', $request->id )->first();
            $log        = speech_log::where(['speech_id' => $request->id, 'speech_send_order_id' => $speech->speech_send_order_id])->orderBy('id', 'DESC')->first();

            if ($log && $speech->id == $log->speech_id && $speech->to == $log->to_id && $speech->refer_to == $log->refer_to_id) {
                $previous = speech_log::where(['speech_id' => $request->id, 'speech_send_order_id' => (int)$speech->speech_send_order_id - 1])->first();
                if ( $previous ) {
                    $user = user_role::with('roleData', 'userData.field.fieldData')->where( ['user_id' => $previous->to_id, 'status' => 1] )->first();
                    return response()->json( $user , 200 );
                }
                else {
                    return response()->json( ['error' => 'data user sebelumnya tidak tersedia.'] );
                }
            }
            else {
                return response()->json( ['error' => 'data tidak valid'] );
            }
        } else {
            return response()->json( ['error' => 'Role anda tidak diizinkan untuk mengembalikan data'] );
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function dispatchForwardSpeech(Request $request, $allowed = 0)
    {
        try {
            if($request->id && $request->to && $request->to != auth()->user()->id )
            {

                $permision = speech_send_order::where('id', (int)$request->order + 1)->pluck('sign_permission')->first();

                $permision == 1 ? $allowed = 1 : $allowed = 0;

                $request->message ? $message = $request->message : $message = null;

                speech::where('id', $request->id)->update([
                    'to'                   => $request->to,
                    'refer_to'             => auth()->user()->id,
                    'status'               => 1,
                    'speech_send_order_id' => (int)$request->order + 1,
                    'is_true'              => $allowed,
                    'message'              => $message
                ]);

                speech_log::create([
                    'speech_id'             => $request->id ,
                    'to_id'                 => $request->to,
                    'refer_to_id'           => auth()->user()->id,
                    'status'                => 1,
                    'speech_send_order_id'  => (int)$request->order + 1,
                    'message'               => $message
                ]);

                $check = role_permission::where('role_id', auth()->user()->mainRoleData()->role_id)->first();

                if( $check && $request->file('file') ) {
                    $file           = $request->file('file');
                    $file_name      = time()."_".str_replace(' ', '', $file->getClientOriginalName());

                    $this->currentFileIsMain($request->id);

                    speech_file::create([
                        'speech_id'     => $request->id,
                        'file_name'     => $file_name,
                        'uploader_id'   => auth()->user()->id,
                        'status'        => 1,
                        'signed'        => 0
                    ]);

                    $file->move('argon/speech', $file_name);
                }

                notification::notifyUser(auth()->user()->id, $request->to, 3, $request->id);

                return response()->json(['success' => 'Data berhasil di-disposisikan!'], 200);
            }
            else {
                return response()->json(['error' => 'Anda belum memilih target disposisi!', 403]);
            }
        } catch(Exception $e) {
            return response()->json(['error' => $e], 401);
        }
    }

    public function dispatchBackwardSpeech(Request $request, $allowed = 0)
    {
        $invalid = speech::where(['id' => $request->id, 'refer_to' => auth()->user()->id])->first();

        if( $invalid ) {
            return response()->json(['error' => 'Dokumen telah berpindah ke user lain!']);
        } else {
            $check = role_permission::where(['role_id' => auth()->user()->mainRoleData()->role_id, 'permission_id' => 12])->first();

            if($request->id && $request->to && $request->to != auth()->user()->id && $check )
            {
                $request->message ? $message = $request->message : $message = null;

                speech::where('id', $request->id)->update([
                    'to'                   => $request->to,
                    'refer_to'             => auth()->user()->id,
                    'status'               => 2,
                    'speech_send_order_id' => (int)$request->order - 1,
                    'is_true'              => $allowed,
                    'message'              => $message
                ]);

                speech_log::create([
                    'speech_id'             => $request->id ,
                    'to_id'                 => $request->to,
                    'refer_to_id'           => auth()->user()->id,
                    'status'                => 2,
                    'speech_send_order_id'  => (int)$request->order - 1,
                    'message'               => $message
                ]);
                // $this->currentFileIsMain($request->id);
                notification::notifyUser(auth()->user()->id, $request->to, 4, $request->id);

                return response()->json(['success' => 'Dokumen berhasil di-kembalikan!'], 200);
            }
            else {
                return response()->json(['error' => 'Target disposisi kosong atau anda tidak memiliki akses untuk mengembalikan dokumen!']);
            }
        }
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\speech_file  $speech
     * @return \Illuminate\Http\Response
     */
    public function currentFileIsMain($id)
    {
        return speech_file::where('speech_id', $id)->update(['status' => 0]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\speech  $speech
     * @return \Illuminate\Http\Response
     */
    public function setDocumentReady(Request $request)
    {
        if ( $request->id ) {
            speech::where('id', $request->id)->update(['is_true' => 1]);
            return response()->json(['success' => 'dokumen telah siap untuk ditandatangani!'], 200);
        } else {
            return response()->json(['error' => 'tidak dapat mendeteksi dokumen']);
        }
    }

    public function pemConvert(Request $request, $ca_password = null)
    {
        $ca         = auth()->user()->activeCA();
        $config = array(
            'ca_password'   => $request->ca_password,
            'ca_path'       => 'argon/certificate/'.$ca.'/'.$ca.'.p12',
            'output_path'   => public_path('argon/speech/signed/'),
        );

        $check  = openssl_pkcs12_read(file_get_contents($config['ca_path']), $p12, $config['ca_password']);
        if ( $check ) {
            if ( $p12['pkey']) {
                $pem = null;
                $key = openssl_pkey_export($p12['pkey'], $pem, $config['ca_password']);
            }
            if ( $p12['cert']) {
                $cert = null;
                openssl_x509_export($p12['cert'], $cert);
            }

            $private    = file_put_contents('argon/certificate/'.$ca.'/'.'private-'.$ca.'.pem', $p12['pkey']);
            $public     = file_put_contents('argon/certificate/'.$ca.'/'.'public-'.$ca.'.pem', $p12['cert']);

            if ( $private ) {
                return response()->json(['success' => 'sertifikat berhasil di convert']);
            } else {
                return response()->json(['error' => 'gagal melakukan konversi sertifikat']);
            }
        } else {
            return response()->json(['error' => 'password sertifikat salah']);
        }
    }

    public function signSpeech($data)
    {
        $certificate = 'argon/certificate/'.$data['activeCA'].'/'.$data['activeCA'].'.p12';
        if(File::exists($certificate)){
            $check       = openssl_pkcs12_read(file_get_contents($certificate), $p12, $data['ca_password']);
            if ( $check ) {
                $info = array(
                    'Name'          => $data['name'],
                    'Location'      => $data['location'],
                    'Reason'        => $data['reason'],
                    'ContactInfo'   => $data['contact'],
                );

                $uuid = $this->createUIDB6(8);

                $user = User::where(['id' => $data['to']])->first();
                $message = $data['message'];
                Mail::to($user)->send(new DocumentSigned($message));

                $pdf = new TCPDI(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
                $pdf->setTimeStamp($data['tsa_url'], null, null, null);
                $pdf->setSignature($p12['cert'], $p12['pkey'], $data['ca_password'], '', 2, $info);

                $pagecount = $pdf->setSourceFile( $data['document_path'] );
                for ( $i = 1; $i <= $pagecount; $i++ ) {
                    $tpl = $pdf->importPage( $i );
                    $pdf->SetMargins(PDF_MARGIN_LEFT,PDF_MARGIN_RIGHT);
                    $pdf->SetPrintHeader(false);
                    $pdf->SetPrintFooter(false);
                    $pdf->AddPage();
                    $pdf->useTemplate($tpl, null, null, 0, 0, true);
                }

                $link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://" . $_SERVER['HTTP_HOST'];
                $qrcode = new QR($link.'/document/'.$uuid);
                $qrcode->setSize(300);
                $qrcode->writeFile($data['qr_path']);

                $height = $pdf->getPageHeight() - 55;
                $pdf->Image( $data['qr_path'], 20, $height, 20, 20, 'PNG' );
                $pdf->setSignatureAppearance( 20, $height, 20, 20 );

                $this->currentFileIsMain($data['speech_id']);

                speech::where('id', $data['speech_id'])->update([
                    'to'                   => $data['to'],
                    'refer_to'             => auth()->user()->id,
                    'status'               => 3,
                    'speech_send_order_id' => (int)$data['order'] + 1,
                    'is_true'              => 2,
                    'message'              => $data['message'],
                    'uuid'                 => $uuid
                ]);

                speech_log::create([
                    'speech_id'             => $data['speech_id'] ,
                    'to_id'                 => $data['to'],
                    'refer_to_id'           => auth()->user()->id,
                    'status'                => 3,
                    'speech_send_order_id'  => (int)$data['order'] + 1,
                    'message'               => $data['message']
                ]);

                speech_file::create([
                    'speech_id'     => $data['speech_id'],
                    'file_name'     => $data['uuid'].'.pdf',
                    'uploader_id'   => auth()->user()->id,
                    'status'        => 1,
                    'signed'        => 1
                ]);

                $pdf->Output($data['output_path'], 'F');

                notification::notifyUser(auth()->user()->id, $data['to'], 5, $data['speech_id']);

                return response()->json(['success' => 'Tanda Tangan Berhasil'], 200);
            } else {
                return response()->json(['error' => 'password anda salah']);
            }
        } else {
            return response()->json(['error' => 'File Sertifikat p12 tidak ditemukan! Silahkan registrasi terlebih dahulu.']);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function signSpeechThenDispatch(Request $request)
    {
        $speech     = speech::speechMainFile($request->id);
        $rdm        = Str::uuid();

        if( !File::exists('argon/speech/tmp/'.$rdm.'.pdf') ) {
            File::copy('argon/speech/'.$speech->file_name, 'argon/speech/tmp/'.$rdm.'.pdf');
        } else {
            File::delete('argon/speech/tmp/'.$rdm.'.pdf');
            copy('argon/speech/'.$speech->file_name, 'argon/speech/tmp/'.$rdm.'.pdf');
        }

        // return $speech->file_name;

        $request->message ? $message = $request->message : $message = null;

        $data = array(
            'name'          => 'E-PIDATO',
            'uuid'          => $rdm,
            'activeCA'      => auth()->user()->activeCA(),
            'ca_password'   => $request->ca_password,
            'tsa_url'       => 'http://timestamp.apple.com/ts01',
            'reason'        => 'Tanda tangan digital untuk dokumen pidato',
            'location'      => 'Office - BAPPEDA Provinsi Jambi',
            'contact'       => 'kantor@bappeda-provjambi.org',
            'document_path' => public_path('argon/speech/tmp/'.$rdm.'.pdf'),
            'output_path'   => public_path('argon/speech/signed/'.$rdm.'.pdf'),
            'qr_path'       => public_path('argon/speech/QR/'.$rdm.'.png'),
            'speech_id'     => $request->id,
            'to'            => $request->to,
            'message'       => $message,
            'order'         => $request->order
        );

        return $this->signSpeech($data);
    }

    public function createUIDB6($length)
    {
        return Str::random($length);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\speech  $speech
     * @return \Illuminate\Http\Response
     */
    public function signTest(Request $request)
    {
        $rdm        = Str::uuid();

        $data = array(
            'name'          => 'E-PIDATO',
            'uuid'          => $rdm,
            'activeCA'      => auth()->user()->activeCA(),
            'ca_password'   => $request->password,
            'tsa_url'       => 'http://timestamp.apple.com/ts01',
            'reason'        => 'Tanda tangan digital untuk dokumen pidato',
            'location'      => 'Office - BAPPEDA Provinsi Jambi',
            'contact'       => 'kantor@bappeda-provjambi.org',
            'document_path' => public_path('argon/speech/tmp/'.$rdm.'.pdf'),
            'output_path'   => public_path('argon/speech/signed/'.$rdm.'.pdf'),
            'qr_path'       => public_path('argon/speech/QR/'.$rdm.'.png'),
        );

        $certificate = 'argon/certificate/'.$data['activeCA'].'/'.$data['activeCA'].'.p12';
        $check       = openssl_pkcs12_read(file_get_contents($certificate), $p12, $data['ca_password']);
        if ( $check ) {
            $info = array(
                'Name'          => $data['name'],
                'Location'      => $data['location'],
                'Reason'        => $data['reason'],
                'ContactInfo'   => $data['contact'],
            );

            $uuid = $this->createUIDB6(8);

            $pdf = new TCPDI(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
            $pdf->setTimeStamp($data['tsa_url'], null, null, null);
            $pdf->setSignature($p12['cert'], $p12['pkey'], $data['ca_password'], '', 2, $info);

            // $pagecount = $pdf->setSourceData($pdfdata);
            // for ($i = 1; $i <= $pagecount; $i++) {
            //     $tplidx = $pdf->importPage($i);
            //     $pdf->AddPage();
            //     $pdf->useTemplate($tplidx);

            $pagecount = $pdf->setSourceData( file_get_contents($request->file('file')) );
            for ( $i = 1; $i <= $pagecount; $i++ ) {
                $tpl = $pdf->importPage( $i );
                $pdf->SetMargins(PDF_MARGIN_LEFT,PDF_MARGIN_RIGHT);
                $pdf->SetPrintHeader(false);
                $pdf->SetPrintFooter(false);
                $pdf->AddPage();
                $pdf->useTemplate($tpl, null, null, 0, 0, true);
            }

            $qrcode = new QR('Dokumen telah ditanda - tangani oleh '.auth()->user()->name.' dengan UID : '.$uuid);
            $qrcode->setSize(300);
            $qrcode->writeFile($data['qr_path']);

            $height = $pdf->getPageHeight() - 55;
            $pdf->Image( $data['qr_path'], 20, $height, 20, 20, 'PNG' );
            $pdf->setSignatureAppearance( 20, $height, 20, 20 );

            $pdf->Output($data['output_path'], 'I');

            return response()->json(['success' => 'Tanda Tangan Berhasil'], 200);
        } else {
            return response()->json(['error' => 'password anda salah']);
        }
    }

    public function documentCheck(Request $request)
    {
        if ( $request->uuid ) {
            // /*'sender.occupation.occupationData','sender.profile','sender.role.roleData',*/
            $speech     = speech::with(['receiver.occupation.occupationData','receiver.role.roleData'])
                                ->where(['uuid' => $request->uuid])
                                ->first() ?? null;

            $speech != null ? $speech_request = speech_request::with(['sender.profile','receiver.profile'])->where('id', $speech->speech_request_id)->first() : $speech_request = null;
            $speech != null ? $speechLog  = speech_log::with('receiver.profile', 'receiver.role.roleData')->where('speech_id', $speech->id)->orderBy('id','asc')->get() : $speechLog = null;

            $data = collect([ 'speech_request' => $speech_request, 'speech_data' => $speech, 'speech_log_data' => $speechLog]);

            if ( $speech && $speechLog != null ) {
                return response()->json($data, 200);
            } else {
                return response()->json(['error' => 'Sistem tidak dapat menemukan data'], 403);
            }

        } else {
            return response()->json(['error' => 'Submit kode untuk melihat data'], 403);
        }

    }

    public function userSpeechArchive(Request $request)
    {
        $complete   = speech::where('status', 3)->get('id');
        // return $complete;
        $speech     = speech_log::with(['speechData.speechRequest'])->where(['refer_to_id' => $request->id])->get()->keyBy('speech_id')->values();

        if ($speech->count() != 0) {

            foreach ($complete as $key) {
                $speeches[] = $speech->where('speech_id', $key->id)->first();
            }

            foreach ($speeches as $single) {
                $logs       = speech_log::with('sender','receiver')->where(['speech_id' => $single->speech_id])->get();
                $data[]     = collect(['speech_detail' => $single, 'log_data' => $logs]);
            }

            return response()->json($data, 200);
        } else {
            return response()->json(['error' => 'Data arsip user kosong!'], 403);
        }
    }

    public function speechArchive(Request $request)
    {
        // $data = null;
        if ($request->month == null && $request->year == null) {
            $data = speech::with(['sender.profile','sender.role.roleData','receiver.role.roleData','speechRequest'])->get();
        } else {
            $data = speech::with(['sender.profile','sender.role.roleData','receiver.role.roleData','speechRequest'])->whereMonth('created_at', $request->month)->whereYear('created_at', $request->year)->where('status',3)->get();
        }
        $speech_data  = $data->map(function($speech) {
            $main_file   = speech::speechMainFile($speech->id);
            return ['speech_data' => $speech, 'speech_main_file' => $main_file];
        });
        return response()->json($speech_data, 200);
    }

    public function speechArchiveDetail(Request $request)
    {
        $speech     = speech::with(['sender.occupation.occupationData','sender.profile','sender.role.roleData','receiver.occupation.occupationData','receiver.role.roleData'])
                            ->where('id', $request->id)
                            ->first();

        $speech_req = speech_request::with(['receiver.occupation.occupationData','sender.occupation.occupationData','origin','speechRequestFile'])
                                    ->where('id', $speech->speech_request_id)
                                    ->first();

        $speech_main_file = speech::speechMainFile($request->id);

        $data       = collect(['speech_data' => $speech,'speech_main_file' => $speech_main_file, 'speech_request' => $speech_req]);

        return response()->json($data, 200);
    }

    public function archiveInYear()
    {
        $year = speech::where('status',3)->get('created_at');
        $year_data = $year->map(function ($data){
            $years = $data->created_at->format('Y');
            return ['year' => $years];
        });
        $year_datas = $year_data->keyBy('year')->values();
        return response()->json($year_datas, 200);
    }

    public function speechDataWFilter(Request $request)
    {
        $speeches   = speech::with(['speechRequest.sender'])->where('status',3)->whereMonth('created_at', $request->month)->whereYear('created_at', $request->year)->get();
        $speech_data  = $speeches->map(function($speech) {
            $main_file   = speech::speechMainFile($speech->id);
            return ['speech_data' => $speech, 'speech_main_file' => $main_file];
        });
        $data = collect(['downloader'=> auth()->user()->name ,'speeches' => $speech_data]);
        return response()->json($data, 200);

    }

    public function generateReport(Request $request)
    {
        $speeches   = speech::with(['speechRequest.sender'])->where('status',3)->whereMonth('created_at', $request->month)->whereYear('created_at', $request->year)->get();

        $speech_data  = $speeches->map(function($speech) {
            $main_file   = speech::speechMainFile($speech->id);
            return collect(['speech_data' => $speech, 'speech_main_file' => $main_file]);
        });

        $data = collect(['month'=>$request->month,'year'=>$request->year,'downloader'=> auth()->user()->name ,'speeches' => $speech_data]);

        $html = PDF::loadView('report.speech-report', compact('data'))->setPaper('a4', 'portrait')->save(public_path('argon/speech/REPORT/LAPORAN-'.$request->month.'-'.$request->year.'.pdf'));

        $zip_file = Carbon::createFromFormat('m',$request->month)->translatedFormat('F').'-'.$request->year.'.zip';
        $zip = new \ZipArchive();
        $zip->open($zip_file, \ZipArchive::CREATE | \ZipArchive::OVERWRITE);

        foreach($speech_data as $speech) {
            $file_name = $speech['speech_main_file']['file_name'];
            $zip->addFile(public_path('argon/speech/signed/'.$file_name), $file_name);
        }
        $invoice_file = 'LAPORAN-'.$request->month.'-'.$request->year.'.pdf';
        $zip->addFile(public_path('argon/speech/REPORT/'.$invoice_file), $invoice_file);
        $zip->close();

        return response()->download($zip_file);
    }

    public function tryNotification()
    {
        notification::notifyUser(auth()->user()->id, 23, 3, 24);

        return response()->json('ok', 200);
    }

    public function tryGetNotification()
    {
        // $data = User::allNotification(auth()->user()->id);
        $data = User::allNotification(23);

        return response()->json($data, 200);
    }

    public function testMail(Request $request)
    {
        $user = account_request::where(['id' => 45])->first();
        // Mail::to($user)->send(new AcceptRegistration); //accept
        Mail::to($user)->send(new RejectRegistration($request->reason)); //accept

        return response()->json(['success' => 'data sent'], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\speech  $speech
     * @return \Illuminate\Http\Response
     */
    public function edit(speech $speech)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\speech  $speech
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, speech $speech)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\speech  $speech
     * @return \Illuminate\Http\Response
     */
    public function destroy(speech $speech)
    {
        //
    }
}
