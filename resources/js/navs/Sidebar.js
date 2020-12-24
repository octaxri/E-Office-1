import React, { Component, Fragment } from 'react';
import {
    BrowserRouter as Router,
    NavLink,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { connect } from 'react-redux';
import Axios from 'axios';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menus: [],
            errors:{},
            auth: false
        };
    }

    renderGuestMenu = () => {
        return (
            <Fragment>
                <li className="nav-item">
                    <Link to="/">
                        <div className="px-2 py-2 btn-outline-darker text-center">
                            <i className="fa-3x fas fa-laptop mb-2"></i>
                            <br/>
                            <span className="text-uppercase ls-2">Halaman Utama</span>
                        </div>
                    </Link>
                </li>
                <li className="nav-item">
                    <a href="">
                        <div className="px-2 py-2 btn-outline-darker text-center">
                            <i className="fa-3x fas fa-file-contract mb-2"></i><br/>
                            <span className="text-uppercase ls-2">syarat pengajuan</span>
                        </div>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="">
                        <div className="px-2 py-2 btn-outline-darker text-center">
                            <i className="fa-3x fas fa-sitemap mb-2"></i><br/>
                            <span className="text-uppercase ls-2">OPD diterima</span>
                        </div>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="">
                        <div className="px-2 py-2 btn-outline-darker text-center">
                            <i className="fa-3x fab fa-google-play mb-2"></i><br/>
                            <span className="text-uppercase ls-2">aplikasi android</span>
                        </div>
                    </a>
                </li>
            </Fragment>
        )
    }

    renderAuthMenu = () => {
        Axios.get('/api/menu-data')
        .then(res => {
            this.setState({menus: res.data})
        });

        return (
            this.state.menus.map( menu => (
                    menu.map( m => (
                        <NavLink to={m.menu_data.url} key={m.menu_data.id}>
                            <li className="nav-item py-2">
                                <div className={`px-2 py-2 btn-outline-darker text-center` }>
                                    <i className={`fa-2x ${m.menu_data.icon}`}></i>
                                    <br/>
                                    <span className="text-uppercase ls-2">{m.menu_data.name}</span>
                                </div>
                            </li>
                        </NavLink>
                    ))
                ))
        );
    }

    render() {
        let authenticated = this.props.loggedIn;

        return (
            <nav className="navbar navbar-vertical fixed-left navbar-expand-md bg-white navbar-light" id="sidenav-main">
                <div className="container-fluid">

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <a className="pt-0 d-lg-block d-sm-none" href="#">
                        <img src="/argon/img/brand/epidato.svg" alt="..."/>
                    </a>

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
                            {
                                authenticated == false
                                ?
                                this.renderGuestMenu()
                                :
                                this.renderAuthMenu()
                            }
                        </ul>

                    </div>
                </div>
            </nav>
        );
    }
}

let mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        user: state.auth.user
    };
};

export default connect(mapStateToProps)(Sidebar);
