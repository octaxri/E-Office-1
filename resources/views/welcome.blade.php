@extends('layouts.app', ['class' => 'bg-dark'])

<style>
    .cover-centered {
            position: absolute;
            bottom: 20px;
            right: 20px;
            background-color: black;
            padding-left: 20px;
            padding-right: 20px;
    }
    input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        textarea:-webkit-autofill,
        textarea:-webkit-autofill:hover,
        textarea:-webkit-autofill:focus,
        select:-webkit-autofill,
        select:-webkit-autofill:hover,
        select:-webkit-autofill:focus {
            -webkit-text-fill-color: black;
            /* background-color: transparent; */
            transition: background-color 50000000000s ease-in-out 0s;
        }
</style>

@section('content')
    <div class="header py-2 bg-white">
        <div class="container-fluid">
            <div class="header">
                {{-- <img src="{{ asset('argon') }}/img/brand/epidato.png" style="width: 180px" class="mb-4 img-center"/> --}}
            </div>
            <div class="row">
            <div class="col-lg-8 col-md-auto col-sm-auto mx-0 px-0 mb-4">
                <img src="{{ asset('argon') }}/img/background/bg.jpg" alt="" class="img-fluid img-center" style="background-size: contain">
                <small class="display-4 text-uppercase text-white cover-centered">
                    <span class="text-uppercase ls-2" style="font-size: 0.6em">GUBERNUR JAMBI</span>
                    <span>Dr. H. Fachrori Umar. M.HUM</span>
                </small>
            </div>
            <div class="col-lg-4 col-sm-auto text-dark mt-4">

                    <h5 class="display-4 text-uppercase text-center mb-4 ls-2 font-weight-300">form login</h5>

                    <div class="nav-wrapper">
                        <ul class="nav nav-pills nav-fill flex-column flex-md-row" id="tabs-icons-text" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link mb-sm-3 mb-md-0 active" id="tabs-icons-text-1-tab" data-toggle="tab" href="#tabs-icons-text-1" role="tab" aria-controls="tabs-icons-text-1" aria-selected="true"><i class="ni ni-cloud-upload-96 mr-2"></i><span class="ls-2">USER</span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-2-tab" data-toggle="tab" href="#tabs-icons-text-2" role="tab" aria-controls="tabs-icons-text-2" aria-selected="false"><i class="ni ni-bell-55 mr-2"></i><span class="ls-2">SKPD</span></a>
                            </li>
                        </ul>
                    </div>
                    <div class="shadow">
                        <div class="card-body">
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active" id="tabs-icons-text-1" role="tabpanel" aria-labelledby="tabs-icons-text-1-tab">
                                    {{-- <p class="description text-center">Jika Anda merupakan karyawan pada <span class="font-weight-800">BAPPEDA Provinsi Jambi</span>, silahkan gunakan form ini untuk login</p> --}}
                                    <form role="form" method="POST" action="{{ route('login') }}" class="navbar-search navbar-search-light text-center mx-1">
                                        @csrf
                                            <div class="form-group mb-5">
                                                <small class="text-uppercase ls-2">Email</small>
                                                <div class="input-group input-group-alternative">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text"><i class="fas fa-user"></i></span>
                                                    </div>
                                                    <input class="form-control" placeholder="Username Anda" type="text" name="email">
                                                </div>
                                            </div>
                                            <div class="form-group mb-4">
                                                <small class="text-uppercase ls-2">Password</small>
                                                <div class="input-group input-group-alternative">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text"><i class="fas fa-lock"></i></span>
                                                    </div>
                                                    <input class="form-control" placeholder="Password Anda" type="password" name="password">
                                                </div>
                                            </div>

                                            <div class="form-group mb-0">
                                                <div class="custom-control custom-control-alternative custom-checkbox">
                                                    <input class="custom-control-input" name="remember" id="customCheckLogin" type="checkbox" {{ old('remember') ? 'checked' : '' }}>
                                                    <label class="custom-control-label" for="customCheckLogin">
                                                        <span class="text-muted">{{ __('Remember me') }}</span>
                                                    </label>
                                                </div>
                                            </div>
                                        <div class="text-center">
                                            <button type="submit" class="btn btn-dark my-4 text-uppercase ls-1"><span class="ls-2">{{ __('Sign in') }}</span></button>
                                        </div>
                                        {{-- <hr> --}}
                                        <a class="text-dark btn-link text-underline" href="#">Lupa Password?</a>
                                    </form>
                                </div>
                                <div class="tab-pane fade" id="tabs-icons-text-2" role="tabpanel" aria-labelledby="tabs-icons-text-2-tab">
                                    <p class="description">Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</p>
                                </div>
                            </div>
                        </div>
                    </div>

            </div>
        </div>

        <div id="example" class="mt-4" style="z-index: 9999"></div>
    </div>
    <div class="separator separator-bottom separator-skew zindex-1">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <polygon class="fill-dark" points="2560 0 2560 100 0 100"></polygon>
        </svg>
    </div>

</div>

<div class="container mt--10 pb-5"></div>
@endsection
