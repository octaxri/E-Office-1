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
                        <li className="nav-item">
                            {
                                active == m.id ?
                                <div className={`text-center`}>
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-4 bg-dark text-white py-3 text-center" style={{maxWidth:'60px'}}>
                                                <i className={`text-center ${m.icon}`}></i>
                                            </div>
                                            <div className="col bg-white py-3 text-yellow-calm text-left">
                                                <span className="font-weight-500">{m.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className={`text-center sidebar`}>
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-4 bg-lighter text-yellow-calm py-3 text-center sidebar-icon" style={{maxWidth:'60px'}}>
                                                <i className={`text-center ${m.icon}`}></i>
                                            </div>
                                            <div className="col bg-white py-3 text-darker text-left sidebar-menu-name">
                                                <span className="font-weight-500">{m.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </li>
                    </Link>
                </Fragment>
            ))
        )
    }

    return (
        <nav className="navbar navbar-vertical fixed-left navbar-expand-md navbar-light" id="sidenav-main">
            <div className="container-fluid py-0 my-0">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="pt-0 d-lg-block d-sm-none" href="#">
                    <img className="img-fluid" src="/argon/img/brand/brand.jpg" style={{maxHeight:'150px', maxWidth:'150px'}} alt="..."/>
                </a>
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
                        { renderGuestMenu() }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Guest;
