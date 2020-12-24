<nav class="navbar navbar-vertical fixed-left navbar-expand-md bg-white navbar-light" id="sidenav-main">
    <div class="container-fluid">

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <a class="pt-0 d-lg-block d-sm-none" href="{{ route('home') }}">
            <img src="{{ asset('argon') }}/img/brand/epidato.svg" alt="...">
        </a>

        <div class="collapse navbar-collapse text-center" id="sidenav-collapse-main">

            <div class="navbar-collapse-header d-md-none">
                <div class="row">
                    <div class="col-6 collapse-brand">
                    </div>
                    <div class="col-6 collapse-close">
                        <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle sidenav">
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </div>

            <div id="guestSidebar">

            </div>


        </div>
    </div>
</nav>
