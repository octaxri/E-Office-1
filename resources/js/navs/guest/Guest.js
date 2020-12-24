import React, { useState, useContext, useEffect, useCallback, useMemo, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const Guest = ({active}) => {
    let [menus, setMenus] = useState([]);

    useEffect(() => {
        Axios.get('/api/guest/menu')
            .then(res => {setMenus(res.data)})
    }, [])

    const renderGuestMenu = () => {
        return (
            menus.map( (m , index) => (
                <Fragment key={index}>
                    <Link to={m.url}>
                        <li className="nav-item py-2">
                            {
                                active == m.id ?
                                <div className={`px-2 py-2 btn-outline-darker text-center active`}>
                                    <i className={`fa-2x ${m.icon}`}></i>
                                    <br/>
                                    <span className="text-uppercase ls-2">{m.name}</span>
                                </div>
                                :
                                <div className={`px-2 py-2 btn-outline-darker text-center`}>
                                    <i className={`fa-2x ${m.icon}`}></i>
                                    <br/>
                                    <span className="text-uppercase ls-2">{m.name}</span>
                                </div>
                            }
                        </li>
                    </Link>
                </Fragment>
            ))
        )
    }

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
                        { renderGuestMenu() }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Guest;
