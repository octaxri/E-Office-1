<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

// use Illuminate\Routing\Route;
// use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'api', 'prefix' => 'auth' ], function ($router)
{
    Route::post('login', 'AuthController@login');
    Route::post('opd-login', 'AuthController@opdLogin');
    Route::post('logout', 'AuthController@logout');
    Route::post('register', 'AuthController@OPDregister');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
    Route::post('change-password', 'AuthController@changePassword');
});

Route::group([ 'middleware' => 'api' ], function ($router)
{
    Route::get('/role-data', 'UserController@roleData');
    Route::get('/occupation-data', 'UserController@occupationData');
    Route::get('/field-data', 'UserController@fieldData');
    Route::get('/subfield-data', 'UserController@subfieldData');
    Route::post('/profile-data', 'UserController@userProfileData');
    Route::get('/menu-data', 'MenuPermissionController@menuData');
    Route::get('/permission-data', 'UserController@rolePermissionData');
    Route::get('/biography', 'UserController@userBiography');
    Route::post('/upload-photo', 'UserController@uploadPhoto');

    Route::group(['prefix' => 'notification'], function ()
    {
        Route::get('/single-channel', 'SpeechController@tryNotification');
        Route::get('/all-notification', 'NotificationController@getNotifications');
        Route::get('/counter', 'NotificationController@notificationsCount');
        Route::get('/test', 'NotificationController@readNotification');
    });

    Route::group(['prefix' => 'account-request'], function ()
    {
        Route::get('/all', 'AccountRequestController@index');
        Route::post('/accept', 'AccountRequestController@acceptAccount');
        Route::post('/reject', 'AccountRequestController@rejectAccount');
    });

    Route::group(['prefix' => 'user-certificate'], function ()
    {
        Route::post('/create-new', 'UserCertificateController@createNewCertificate');
        Route::get('/certificate-list', 'UserCertificateController@certificateList');
    });

    Route::group(['prefix' => 'uuid'], function ()
    {
        Route::get('/generate-B6', 'SpeechController@createUIDB6');
    });

    Route::group(['prefix' => 'sign'], function ()
    {
        Route::post('/sign-document', 'SpeechController@signPDF');
        Route::post('/sign-test', 'SpeechController@signTest');
        Route::get('/check-java', 'SpeechController@checkJava');
        Route::get('/convert-p12', 'SpeechController@pemConvert');
        Route::post('/sign-speech', 'SpeechController@signSpeechThenDispatch');
    });

    Route::group(['prefix' => 'dispatch'], function ()
    {
        Route::get('/all-dispatch', 'SpeechController@index');
        Route::post('/detail', 'SpeechController@detail');
        Route::get('/file-list', 'SpeechFileController@fileList');
        Route::get('/send-to', 'SpeechController@sendSpeechTo');
        Route::get('/send-back-to', 'SpeechController@returnSpeechTo');
        Route::post('/log', 'SpeechLogController@speechLogData');
        Route::post('/test', 'SpeechController@currentFileIsMain');
        Route::post('/dispatch-forward', 'SpeechController@dispatchForwardSpeech');
        Route::post('/dispatch-backward', 'SpeechController@dispatchBackwardSpeech');
        Route::post('/set-ready', 'SpeechController@setDocumentReady');
        // Route::post('/sign-and-dispatch', 'SpeechController@signSpeechThenDispatch');
    });

    Route::group(['prefix' => 'speech-request'], function ()
    {
        Route::get('/all-speech-request', 'SpeechRequestController@index');
        Route::get('/data', 'SpeechRequestController@speechRequestData');
        Route::post('/log', 'SpeechRequestLogController@speechRequestLogData');
        Route::get('/send-to', 'SpeechRequestController@sendRequestToThis');
        Route::post('/dispatch-request', 'SpeechRequestController@dispatchSpeechRequest');
        Route::post('/send-request', 'SpeechRequestController@createSpeechRequest');
    });

    Route::group(['prefix' => 'history'], function ()
    {
        Route::get('/dispatch-history', 'SpeechLogController@dispatchHistory');
        Route::get('/last-dispatch', 'SpeechLogController@lastDispatchTo');
    });

    Route::group(['prefix' => 'admin'], function ()
    {
        Route::get('/user-list', 'UserController@index');
        Route::get('/user-detail', 'UserController@userDetail');
        // Route::post('/accept', 'AccountRequestController@acceptAccount');
        Route::get('/role-list', 'RoleController@roleList');
        Route::get('/occupation-list', 'OccupationController@occupationList');
        Route::get('/field-list', 'FieldController@fieldList');
        Route::get('/subfield-list', 'SubfieldController@subfieldList');
        Route::post('/update-role', 'RoleController@updateUserRole');
        Route::post('/update-occupation', 'OccupationController@updateUserOccupation');
        Route::post('/update-field', 'FieldController@updateUserField');
        Route::post('/update-subfield', 'SubfieldController@updateUserSubfield');
        Route::get('/archive', 'SpeechController@userSpeechArchive');
        Route::get('/speech-archive', 'SpeechController@speechArchive');
        Route::get('/speech-archive/detail', 'SpeechController@speechArchiveDetail');
        Route::get('/speech-archive/year-list', 'SpeechController@archiveInYear');
        Route::get('/archive-w-filter', 'SpeechController@speechDataWFilter');
        Route::get('/writer-list', 'UserController@writer');
        Route::post('/add-user', 'UserController@addUser');
        Route::get('/generate-speech-report', 'SpeechController@generateReport');

    });

    Route::group(['prefix' => 'permissions'], function ()
    {
        Route::get('/user-permissions', 'UserPermissionController@index');
    });

    // TEST CASE
    Route::group(['prefix' => 'test'], function ()
    {
        Route::get('/mail', 'SpeechController@testMail');
    });
});

// Route::middleware('auth:api')->group(function () {
//     Route::post('/menu-config/store', 'menuController@store');
// });
    Route::post('/demo/create-new', 'UserCertificateController@demoNewCertificate');
    Route::post('/demo/sign-test', 'UserCertificateController@signTest');
    Route::post('/demo/sign-test-selector', 'UserCertificateController@signTestSelector');
    Route::post('/demo/content', 'UserCertificateController@content');

    Route::get('/data-opd/get', 'OpdController@acceptedAccount');

    Route::group(['prefix' => 'guest'], function ()
    {
        Route::get('/menu', 'MenuPermissionController@guestMenu');
        Route::get('/document/check', 'SpeechController@documentCheck');
        Route::get('/document/log', 'SpeechController@documentLog');
    });

    Route::get('/clear-cache', function() {
        Artisan::call('config:cache');
        return 'config:cache cleared'; //Return anything
    });

