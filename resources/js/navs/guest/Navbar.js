import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class GuestNavbar extends Component {
    render() {
        // console.log(authUser)
        return (
                // <div className="container-fluid" >
                    <div className="row py-2 w-100" style={{height:'40px'}}>
                        <div className="col-lg-6 col-sm-12">
                            <div className="row">
                                <div className="col-auto d-flex align-items-center">
                                    <img src="/argon/img/brand/brand.png" className="my-auto" alt="" style={{width:'100px', height:'80px'}}/>
                                </div>
                                <div className="col d-flex align-items-center">
                                    <p className="my-auto text-uppercase text-darker font-weight-600" href="#">
                                        OPEN E-OFFICE PROJECT - <span><small className="text-muted">APP Version : 1.0.3</small></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-lg-6 d-none d-lg-block d-flex align-items-center">
                        <p className="my-auto text-uppercase text-darker font-weight-600" href="#">
                                        OPEN E-OFFICE PROJECT - <span><small className="">APP Version : 1.0.3</small></span>
                                    </p> */}
                            {/* <div className="row my-auto">
                                <div className="col d-flex align-items-center">
                                <Link className="btn btn-link my-auto" to="/overview">Overview</Link>
                                <Link className="btn btn-link my-auto" to="/dependencies">Dependencies</Link>
                                <Link className="btn btn-link my-auto" to="/about/me">Portfolio</Link>
                                </div>
                            </div> */}
                        {/* </div> */}
                    </div>

                // </div>
        );
    }
}

export default GuestNavbar;

