import React, { Component } from 'react';

class AuthSidebar extends Component {
    render() {
        return (
                <nav className="navbar navbar-vertical fixed-left navbar-expand-md bg-white navbar-light" id="sidenav-main">
                    <div className="container-fluid">

                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <a className="pt-0 d-lg-block d-sm-none" href="#">
                            <img src="/argon/img/brand/epidato.svg" alt="..."/>
                        </a>

                        <ul className="nav align-items-center d-md-none">
                            <li className="nav-item dropdown">
                                <a className="nav-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <div className="media align-items-center">
                                        <span className="avatar avatar-sm rounded-circle">
                                        <img alt="Image placeholder" src="/argon/img/theme/team-1-800x800.jpg"/>
                                        </span>
                                    </div>
                                </a>
                                <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
                                    <div className=" dropdown-header noti-title">
                                        <h6 className="text-overflow m-0">Welcome!</h6>
                                    </div>
                                    <a href="/profile.edit" className="dropdown-item">
                                        <i className="ni ni-single-02"></i>
                                        <span>My profile</span>
                                    </a>
                                    <div className="dropdown-divider"></div>
                                    <a href="/logout" className="dropdown-item">
                                        <i className="ni ni-user-run"></i>
                                        <span>Logout</span>
                                    </a>
                                </div>
                            </li>
                        </ul>

                        <div className="collapse navbar-collapse text-center" id="sidenav-collapse-main">

                            <div className="navbar-collapse-header d-md-none">
                                <div className="row">
                                    <div className="col-6 collapse-brand">
                                    </div>
                                    <div className="col-6 collapse-close">
                                        <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle sidenav">
                                            <span></span>
                                            <span></span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <ul className="navbar-nav justify-content-center">
                                <li className="nav-item py-2">
                                    <a href="">
                                        <div className="px-2 py-2 btn-outline-darker text-center">
                                            <i className="fa-2x fas fa-laptop mb-2"></i>
                                            <br/>
                                            <span className="text-uppercase ls-2">Home</span>
                                        </div>
                                    </a>
                                </li>
                                <li className="nav-item py-2">
                                    <a href="">
                                        <div className="px-2 py-2 btn-outline-darker text-center">
                                            <i class="fas fa-2x fa-tasks mb-2"></i>
                                            <br/>
                                            <span className="text-uppercase ls-2">tugas</span>
                                        </div>
                                    </a>
                                </li>
                                <li className="nav-item py-2">
                                    <a href="">
                                        <div className="px-2 py-2 btn-outline-darker text-center">
                                            <i class="fas fa-2x fa-history mb-2"></i>
                                            <br/>
                                            <span className="text-uppercase ls-2">Riwayat</span>
                                        </div>
                                    </a>
                                </li>
                            </ul>


                        </div>
                    </div>
                </nav>
        );
    }
}

export default AuthSidebar;
