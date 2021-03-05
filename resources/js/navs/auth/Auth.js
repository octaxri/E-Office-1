import React, { useState, useEffect, Fragment } from 'react';
import Axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import UserNotification from '../../components/notification/notification';
import cookie from 'js-cookie';
import { shallowEqual, useSelector } from 'react-redux';

const Auth = ({active}) => {

    const { loggedIn, menus } = useSelector(state => ({
        loggedIn: state.auth.loggedIn,
        menus: state.auth_menu.menu
    }), shallowEqual);

    const dispatch = useDispatch()

    const handleLogout = event => {
        event.preventDefault();
        Axios.post('/api/auth/logout').then(cookie.remove('token'))
        dispatch({type:"SET_LOGOUT"})
        dispatch({type:"NO_MENU"})
    }

    const renderAuthMenu = () => {
        return (
            menus.map( menu => (
                menu.map( m => (
                    <Fragment key={uuidv4()}>
                        <Link to={m.menu_data.url}>
                            <li className="nav-item">
                                {
                                    active == m.menu_id ?
                                    <div className={`text-center`}>
                                            <div className="row">
                                                <div className="col-4 bg-dark text-white py-3 text-center">
                                                    <i className={`text-center ${m.menu_data.icon}`}></i>
                                                </div>
                                                <div className="col bg-white py-3 text-yellow-calm text-left">
                                                    <span className="font-weight-500">{m.menu_data.name}</span>
                                                </div>
                                            </div>
                                    </div>
                                    :
                                    <div className={`text-center sidebar`}>
                                            <div className="row">
                                                <div className="col-4 bg-lighter text-yellow-calm py-3 text-center sidebar-icon">
                                                    <i className={`text-center ${m.menu_data.icon}`}></i>
                                                </div>
                                                <div className="col bg-white py-3 text-darker text-left sidebar-menu-name">
                                                    <span className="font-weight-500">{m.menu_data.name}</span>
                                                </div>
                                            </div>
                                    </div>
                                }
                            </li>
                        </Link>
                    </Fragment>
                ))
            ))
        );
    }

    return (
        <nav className="navbar navbar-vertical fixed-left navbar-expand-md bg-white navbar-light" id="sidenav-main">
            <div className="container-fluid">

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <a className="pt-0 d-lg-block d-sm-none d-md-none text-center" href="#">
                    <img className="img-fluid" src="/argon/img/brand/brand.jpg" style={{maxHeight:'150px', maxWidth:'150px'}} alt="..."/>
                </a>

                <ul className="nav align-items-center d-md-none">
                <UserNotification notificationCount={8} color={'text-gray'}/>
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
                            <a href="#" className="dropdown-item">
                                <i className="ni ni-single-02"></i>
                                <span>My profile</span>
                            </a>
                            <div className="dropdown-divider"></div>
                            {
                                loggedIn
                                ?
                                <Link to="/logout" className="dropdown-item" onClick={handleLogout}>
                                    <i className="ni ni-user-run"></i>
                                    <span>Logout</span>
                                </Link>
                                :
                                null
                            }
                        </div>
                    </li>
                </ul>

                <div className="collapse navbar-collapse text-center bg-text" data-bg-text="OEP" id="sidenav-collapse-main">

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
                            loggedIn === true
                            ?
                            renderAuthMenu()
                            :
                            null
                        }
                    </ul>

                </div>
            </div>
        </nav>
    );
}

// let mapStateToProps = state => {
//     return {
//         loggedIn: state.auth.loggedIn,
//         user: state.auth.user,
//         menu: state.auth_menu.menu
//     };
// };

export default Auth;
