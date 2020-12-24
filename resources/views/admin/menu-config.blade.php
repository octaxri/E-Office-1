@extends('layouts.app')

@section('content')
    @include('layouts.headers.cards')

    <div class="container-fluid mt--7">
        <div id="menuConfig"></div>
        @include('layouts.footers.auth')
    </div>
@endsection


