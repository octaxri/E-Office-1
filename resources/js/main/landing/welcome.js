import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Footer from '../../navs/Footer';
//Auth
import cookie from 'js-cookie';
import { connect } from 'react-redux';
import Guest from '../../navs/guest/Guest';
import OPDList from '../../components/OPD-List';
import FooterLanding from '../../navs/Footer-Landing';

class Welcome extends Component{
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            email: '',
            password: '',
            emailOPD: '',
            passwordOPD: '',
            error:{},
            xForm: {}
        };
    }

    handleUserForm = async (e) => {
        e.preventDefault();
        const data = {email:this.state.email, password:this.state.password, type: 1}

        await axios.post("/api/auth/login", data)
            .then(res => {
                console.log(res.data)
                if ( !res.data.error ){
                    cookie.set("token", res.data.access_token);
                    this.props.setLogin(res.data.user);
                    this.props.history.replace('/home');
                } else {
                    this.setState({error: res.data})
                }
            })
    }

    handleOPDForm = async (e) => {
        e.preventDefault();
        const data = {email:this.state.emailOPD, password:this.state.passwordOPD, type: 2}

        await axios.post("/api/auth/opd-login", data)
            .then( res => {
                if ( !res.data.error ) {
                    cookie.set("token", res.data.access_token);
                    this.props.setLogin(res.data.user);
                    this.props.history.push('/home');
                } else {
                    this.setState({xForm: res.data})
                }
            })
    }

    handleUserInput = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState( {[name]:value} )
    }

    handleOPDInput = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState( {[name]:value} )
    }

    renderUserForm = () => {
        return (
            <form role="form" className="navbar-search navbar-search-light text-center mx-1" onSubmit={this.handleUserForm} key="USER">
                <div className="form-group mb-5">
                    <small className="text-uppercase ls-2">Email</small>
                    <div className="input-group input-group-alternative">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                        </div>
                        <input
                            className="form-control"
                            placeholder="Username Anda"
                            type="text"
                            name="email"
                            onChange={this.handleUserInput}
                        />
                    </div>
                </div>
                <div className="form-group mb-4">
                    <small className="text-uppercase ls-2">Password</small>
                    <div className="input-group input-group-alternative">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-lock"></i></span>
                        </div>
                        <input
                            className="form-control"
                            placeholder="Password Anda"
                            type="password"
                            name="password"
                            onChange={this.handleUserInput}
                        />
                    </div>
                </div>

                <div className="form-group mb-0">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                        <input className="custom-control-input" name="remember" id="customCheckLoginUser" type="checkbox"/>
                        <label className="custom-control-label" htmlFor="customCheckLoginUser">
                            <span className="text-muted">Remember me</span>
                        </label>
                    </div>
                </div>
            <div className="text-center">
                <button type="submit" className="btn btn-dark my-4 text-uppercase ls-1"><span className="ls-2">Sign in</span></button>
            </div>
            <a className="text-dark btn-link text-underline" href="#">Lupa Password?</a>
        </form>
        )
    }

    renderOPDForm = () => {
        return (
            <form role="form" className="navbar-search navbar-search-light text-center mx-1" onSubmit={this.handleOPDForm} key="OPD">
                <div className="form-group mb-5">
                    <small className="text-uppercase ls-2">Email OPD</small>
                    <div className="input-group input-group-alternative">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                        </div>
                        <input
                            className="form-control"
                            placeholder="Email Resmi OPD"
                            type="text"
                            name="emailOPD"
                            onChange={this.handleOPDInput}
                        />
                    </div>
                </div>
                <div className="form-group mb-4">
                    <small className="text-uppercase ls-2">Password</small>
                    <div className="input-group input-group-alternative">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-lock"></i></span>
                        </div>
                        <input
                            className="form-control"
                            placeholder="Password Anda"
                            type="password"
                            name="passwordOPD"
                            onChange={this.handleOPDInput}
                        />
                    </div>
                </div>

                <div className="form-group mb-0">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                        <input className="custom-control-input" name="remember" id="customCheckLoginOPD" type="checkbox"/>
                        <label className="custom-control-label" htmlFor="customCheckLoginOPD">
                            <span className="text-muted">Remember me</span>
                        </label>
                    </div>
                </div>
            <div className="text-center">
                <button type="submit" className="btn btn-dark my-4 text-uppercase ls-1"><span className="ls-2">Sign in</span></button>
            </div>
            <a className="text-dark btn-link text-underline" href="#">Lupa Password?</a>
        </form>
        )
    }

    renderMainContent = () => {
        const error = this.state.error;
        const xForm = this.state.xForm;
        return (
            <Fragment>
                <div className="header">
                    <div className="container-fluid">

                        <div className="row mb-2">
                        <div className="col-lg-8 col-md-auto col-sm-auto mx-0 px-0 mb-4">
                            <img src="/argon/img/background/bg.jpg" alt="" className="img-fluid img-center" style={{backgroundSize: `contain`}}/>
                            <small className="display-4 text-uppercase text-white cover-centered">
                                <span className="text-uppercase ls-2" style={{fontSize: `0.6em`}}>GUBERNUR JAMBI</span>
                                <span>Dr. H. Fachrori Umar. M.HUM</span>
                            </small>
                        </div>
                        <div className="col-lg-4 col-sm-auto text-dark mt-4">

                                <h5 className="display-4 text-uppercase text-center mb-4 ls-2 font-weight-300">form login</h5>

                                <div className="nav-wrapper">
                                    <ul className="nav nav-pills nav-fill flex-column flex-md-row" id="tabs-icons-text" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link mb-sm-3 mb-md-0 active" id="tabs-icons-text-1-tab" data-toggle="tab" href="#tabs-icons-text-1" role="tab" aria-controls="tabs-icons-text-1" aria-selected="true"><i className="ni ni-cloud-upload-96 mr-2"></i><span className="ls-2">USER</span></a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-2-tab" data-toggle="tab" href="#tabs-icons-text-2" role="tab" aria-controls="tabs-icons-text-2" aria-selected="false"><i className="ni ni-bell-55 mr-2"></i><span className="ls-2">OPD</span></a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="shadow">
                                    <div className="card-body bg-white">
                                        <div className="tab-content" id="myTabContent">
                                            <div className="tab-pane fade show active" id="tabs-icons-text-1" role="tabpanel" aria-labelledby="tabs-icons-text-1-tab">
                                                {error.error
                                                    ?
                                                    <div className="alert bg-gradient-danger text-white" role="alert">
                                                        {error.error}
                                                    </div>
                                                    :
                                                    null
                                                }
                                                {this.renderUserForm()}
                                            </div>
                                            <div className="tab-pane fade" id="tabs-icons-text-2" role="tabpanel" aria-labelledby="tabs-icons-text-2-tab">
                                                {xForm.error
                                                    ?
                                                    <div className="alert bg-gradient-warning text-white" role="alert">
                                                        {xForm.error}
                                                    </div>
                                                    :
                                                    null
                                                }
                                                { this.renderOPDForm() }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div className="row my-4">
                        <div className="col-lg-4 col-sm-12 my-2">
                            <div className="card">
                                <div className="card-body">
                                <h3 class="font-weight-bold text-uppercase text-center my-3">PDF GENERATION</h3>
                                    <img src="/argon/img/icons/welcome/4.png" alt="" className="img-fluid img-center" style={{width:'200px'}}/>
                                    <hr/>
                                    <h5 className="text-center">E-Pidato mempermudah pembuatan dokumen secara digital ataupun Laporan.</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-12 my-2">
                            <div className="card">
                                <div className="card-body">
                                <h3 class="font-weight-bold text-uppercase text-center my-3">online submission</h3>
                                    <img src="/argon/img/icons/welcome/5.png" alt="" className="img-fluid img-center" style={{width:'200px'}}/>
                                    <hr/>
                                    <h5 className="text-center">Dengan E-Pidato, anda tidak perlu tatap muka untuk melakukan administrasi dokumen.</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-12 my-2">
                            <div className="card">
                                <div className="card-body">
                                <h3 class="font-weight-bold text-uppercase text-center my-3">digital pdf signing</h3>
                                    <img src="/argon/img/icons/welcome/6.png" alt="" className="img-fluid img-center" style={{width:'200px'}}/>
                                    <hr/>
                                    <h5 className="text-center">PDF yang dihasilkan memiliki digital signature, mempermudah anda melakukan cek dokumen online.</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <OPDList /> */}
                    <FooterLanding />
                </div>

            </div>
        </Fragment>
        );
    }

    render() {
        return(
            <Fragment>
                <Guest active={1}/>
                    <div className="main-content">
                        {this.renderMainContent()}
                    </div>
            </Fragment>
        )
    }

}

let mapDispatchToProps = dispatch => {
    return {
        setLogin: (user) => dispatch({type:"SET_LOGIN", payload:user})
    }
};

export default connect(null, mapDispatchToProps)(Welcome);
