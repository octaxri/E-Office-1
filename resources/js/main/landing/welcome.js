import React, { Component, Fragment } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import { connect, useDispatch } from 'react-redux';
import GuestNavbar from '../../navs/guest/Navbar';
import Demo from './demo';
import ModalSuccess from '../../components/modal/modal-success';
import LoadingOverlay from 'react-loading-overlay';
import Lottie from 'react-lottie';
import FadeIn from 'react-fade-in';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as loading from "../../components/loading.json"
import useModal from '../../components/modal/hook-modal';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import useOverlay from '../../components/loading-overlay/state';
import Overlay from '../../components/loading-overlay/overlay';
import ItemWTooltip from '../../components/tooltip/tooltip';
import Fade from 'react-reveal/Fade';

const Welcome = (props) => {
    let [ready, setReady]                       = useState(false);
    let [overlayActive, setOverlayActive]       = useState(false);
    let [userError, setUserError ]              = useState([])
    let [departmentError, setDepartmentError ]  = useState([])
    let history                                 = useHistory();

    const { register: userForm, handleSubmit: userLogin} = useForm();
    const { register: departmentForm, handleSubmit: departmentLogin } = useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => setReady(true), 3000)
    }, [])

    const setLogin = (user) => {
        dispatch({type:"SET_LOGIN", payload:user})
    };

    const setMenu = (menu) => {
        dispatch({type:"AUTH_MENU", payload:menu})
    }

    const handleUserForm = async (data) => {
        // console.log(data)
        // setMenu('lol')
        await axios.post("/api/auth/login", data)
            .then(res => {
                // console.log(res.data)
                if ( !res.data.error ){
                    cookie.set("token", res.data.access_token);
                    setLogin(res.data.user);
                } else {
                    setUserError(res.data)
                }
        })

        await axios.get('/api/menu-data').then(res => { setMenu(res.data), history.replace('/home'); })
    }

    const handleDepartmentForm = async (data) => {
        await axios.post("/api/auth/opd-login", data)
            .then( res => {
                if ( !res.data.error ) {
                    cookie.set("token", res.data.access_token);
                    setLogin(res.data.user);
                    history.push('/home');
                } else {
                    setDepartmentError(res.data)
                    console.log(data)
                    console.log(res.data)
                }
            })
    }

    const renderUserForm = () => {
        return (
            <form role="form" className="navbar-search navbar-search-light text-center mx-1" onSubmit={userLogin(handleUserForm)} key="USER">
                <div className="form-group mb-5 text-darker">
                    <small className="text-uppercase ls-2">your Email</small>
                    <div className="input-group input-group-alternative border-white">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                        </div>
                        <input
                            className="form-control no-autofill"
                            placeholder="Username Anda"
                            type="text"
                            name="email"
                            ref={userForm}
                            // onChange={this.handleUserInput}
                        />
                        <input type="hidden" name="type" value="1" ref={userForm}/>
                    </div>
                </div>
                <div className="form-group mb-4 text-darker">
                    <small className="text-uppercase ls-2">Password</small>
                    <div className="input-group input-group-alternative border-white">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-lock"></i></span>
                        </div>
                        <input
                            className="form-control no-autofill"
                            placeholder="Password Anda"
                            type="password"
                            name="password"
                            ref={userForm}
                        />
                    </div>
                </div>

                <div className="form-group mb-0 text-white">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                        <input className="custom-control-input" name="remember" id="customCheckLoginUser" type="checkbox"/>
                        <label className="custom-control-label" htmlFor="customCheckLoginUser">
                            <span className="text-darker">Remember me</span>
                        </label>
                    </div>
                </div>
            <div className="text-center">
                <button type="submit" className="btn btn-dark my-4 text-uppercase ls-1"><span className="ls-2">Sign in</span></button>
            </div>
            <a className="text-darker btn-link text-underline" href="#">Forgot Password?</a>
        </form>
        )
    }

    const renderOPDForm = () => {
        return (
            <form role="form" className="navbar-search navbar-search-light text-center mx-1" onSubmit={departmentLogin(handleDepartmentForm)} key="OPD">
                <div className="form-group mb-5">
                    <small className="text-uppercase ls-2"><b>Company</b> <span>or</span> <b>Department</b> Email</small>
                    <div className="input-group input-group-alternative border-white">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-user text-white"></i></span>
                        </div>
                        <input
                            className="form-control  no-autofill"
                            placeholder="Email Resmi OPD"
                            type="text"
                            name="email"
                            ref={departmentForm}
                        />
                        <input type="hidden" name="type" value="2" ref={departmentForm}/>
                    </div>
                </div>
                <div className="form-group mb-4">
                    <small className="text-uppercase ls-2">Password</small>
                    <div className="input-group input-group-alternative border-white">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-lock"></i></span>
                        </div>
                        <input
                            className="form-control no-autofill"
                            placeholder="Password Anda"
                            type="password"
                            name="password"
                            ref={departmentForm}
                        />
                    </div>
                </div>

                <div className="form-group mb-0 text-white">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                        <input className="custom-control-input" name="remember" id="customCheckLoginOPD" type="checkbox"/>
                        <label className="custom-control-label" htmlFor="customCheckLoginOPD">
                            <span className="text-white">Remember me</span>
                        </label>
                    </div>
                </div>
            <div className="text-center">
                <button type="submit" className="btn btn-dark my-4 text-uppercase ls-1"><span className="ls-2">Sign in</span></button>
            </div>
            <a className="text-darker btn-link text-underline" href="#">Forgot Password?</a>
        </form>
        )
    }

    const roundMenu = (icon, size, to, id) => {
        return (
            <Link to={to} data-tip data-for={id}>
                <div className="card card-lift--hover bg-white-calm text-center my-auto align-content-center mx-3 rounded" style={roundIcon}>
                    <i className={`${icon} ${size} my-auto align-content-center flex-auto text-dark`}></i>
                </div>
            </Link>
        )
    }

    const renderBanner = () => {
        return (
            <Fragment>
                <section className="best-offer mx-0 px-0" id="best-offer-section">
                    <div className="container-no-p-m" className="overflow-hidden">
                        <div className="row ">

                            <Fade left>
                                <div className="col-md-4 mx-0 pl-0 pr-lg-2 pr-0">
                                    <div className="best-offer-left-content">
                                        {/* <div className="icon"><img src="img/best-offer-icon.png" alt=""/></div> */}
                                        <h2 className="text-left"><em>E - Sign<br/></em>Demo Form</h2>
                                        <hr className="bg-white"/>
                                        {/* {this.renderDemoForm()} */}
                                        <Demo
                                            OverlayActive={(data)=>(active(data))}
                                            overlayMessage={(data)=>(overlayMessage(data))}
                                            toggle={toggle}
                                            response={(data)=>response(data)}
                                            message={(data)=>message(data)}
                                            dismiss={(data)=>dismiss(data)}
                                        />
                                    </div>
                                </div>
                            </Fade>

                            <Fade bottom big>
                                <div className="col-md-8 mx-0 px-0">
                                    <div className="best-offer-right-content">
                                        <div className="row">
                                            <Fade bottom>
                                                <div className="col-md-6 col-sm-12">
                                                    <h6 className="font-weight-700">About This App</h6>
                                                    <div className="line-dec"></div>
                                                    <h2>Well it's<br/>a Simple <em>E-Office App</em></h2>
                                                    <p>As the name implies, simple, well it's easier for me to point out what this app can do.</p>
                                                    <ul>
                                                        <li>- Person through person document checking & validation</li>
                                                        <li>- PDF signing using p12 certificate</li>
                                                        <li>- User Role & Permission management</li>
                                                        <li>- Report Generation on each signed document </li>
                                                    </ul>

                                                </div>
                                            </Fade>
                                            <div className="col-md-6 col-sm-12">
                                                <img className="img-fluid d-none d-xs-none d-xl-block" src="/argon/img/background/meadow.jpg" alt=""/>

                                                {/* <div className="container-fluid"> */}
                                                    <div className="row justify-content-center mt-lg--8 my-sm-4">
                                                        <ItemWTooltip component={roundMenu('fas fa-th-large', 'fa-2x', '/', '1')} id={'1'} text={'App Overview'} />
                                                        <ItemWTooltip component={roundMenu('fas fa-code-branch', 'fa-2x', '/' , '2')} id={'2'} text={'Project Dependencies'} />
                                                        <ItemWTooltip component={roundMenu('fas fa-project-diagram', 'fa-2x', '/', '3')} id={'3'} text={'Future Planning'} />
                                                        <ItemWTooltip component={roundMenu('fas fa-address-card', 'fa-2x', '/' , '4')} id={'4'} text={'My   Portfolio'} />
                                                    </div>
                                                {/* </div> */}

                                                <p style={{fontSize:'250px', lineHeight:'60px', float:'left', color:'#fefefe93'}} className="ls-2 font-weight-600 mt-6 ml--7 d-none d-lg-block">EOFFICE</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Fade>

                        </div>
                    </div>
                </section>
            </Fragment>
        )
    }

    const renderMainContent = () => {
        return (
            <Fragment>
                <div className="header">
                    <div className="banner">
                    <div className="container-no-p-m mx-lg-0 mx-sm-0 pt-6">

                        <div className="row mb-2">
                        <div className="col-lg-8 col-md-auto col-sm-auto mx-0 px-0 mb-4">
                            <div className="left-banner-content">
                                <div className="text-content">
                                    <h6>Full Stack Developer</h6>
                                    <div className="line-dec"></div>
                                    <Fade left>
                                        <h1>Everything Looks Fine, <br/>'til it's Not.</h1>
                                        <h4 className="text-white"><em>- me looking at my bloodstained debug console</em></h4>
                                    </Fade>
                                    <div className="white-border-button">
                                        <a href="#" className="scroll-link bg-white text-darker text-text-uppercase ls-1" data-id="best-offer-section">try the demo</a>
                                    </div>
                                </div>
                            </div>
                            {/* <img src="/argon/img/background/mountains.png" className="img-fluid img-center" style={{backgroundSize: `contain`}}/> */}
                        </div>
                        <div className="col-lg-4 col-sm-12 px-4">

                            <div className="right-banner-content">
                            <img src="/argon/img/brand/brand.jpg" alt="" style={{width:'150px', height:'130px'}}/>
                            <h5 className="display-4 text-uppercase ls-2 font-weight-300 text-darker">login form</h5>
                            {/* <div className="shadow"> */}
                                {/* <div className="card-body bg-transparent"> */}

                                <div className="nav-wrapper">
                                    <ul className="nav nav-pills nav-fill flex-column flex-md-row" id="tabs-icons-text" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link mb-sm-3 mb-md-0 active" id="tabs-icons-text-1-tab" data-toggle="tab" href="#tabs-icons-text-1" role="tab" aria-controls="tabs-icons-text-1" aria-selected="true">
                                                <i className="ni ni-cloud-upload-96 mr-2"></i><span className="ls-2">USER</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-2-tab" data-toggle="tab" href="#tabs-icons-text-2" role="tab" aria-controls="tabs-icons-text-2" aria-selected="false">
                                                <i className="ni ni-bell-55 mr-2"></i><span className="ls-2">DEPARTMENT</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="tabs-icons-text-1" role="tabpanel" aria-labelledby="tabs-icons-text-1-tab">
                                            {userError.error
                                                ?
                                                <div className="alert bg-gradient-danger text-white" role="alert">
                                                    {userError.error}
                                                </div>
                                                :
                                                null
                                            }
                                            {renderUserForm()}
                                        </div>
                                        <div className="tab-pane fade" id="tabs-icons-text-2" role="tabpanel" aria-labelledby="tabs-icons-text-2-tab">
                                            {departmentError.error
                                                ?
                                                <div className="alert bg-gradient-warning text-white" role="alert">
                                                    {departmentError.error}
                                                </div>
                                                :
                                                null
                                            }
                                            { renderOPDForm() }
                                        </div>
                                    </div>
                                {/* </div> */}
                            </div>

                        </div>
                    </div>


                    {/* <FooterLanding /> */}
                </div>
                </div>
                {renderBanner()}
                {/* {this.renderFooter()} */}
                <div className="container-fluid bg-gray-calm mt-4 pt-4 pb-4 overflow-hidden">
                        <div className="row">
                            <Fade left>
                            <div className="col-lg-4 col-sm-12">
                                <div className="d-none d-lg-block">
                                    <h6 className="font-weight-700">Connect or contact me on :</h6>
                                    <div className="line-dec"></div>
                                </div>
                                <div className="row justify-content-center justify-content-lg-start my-4 my-lg-2">
                                    <a href="">
                                        <div className="card bg-white text-center my-auto align-content-center mx-3 card-lift-sm--hover" style={{width:'60px',height:'60px'}}>
                                            <i className="fab fa-linkedin fa-2x my-auto align-content-center flex-auto text-linkedin"></i>
                                        </div>
                                    </a>
                                    <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=sainthaven68@gmail.com">
                                        <div className="card bg-white text-center my-auto align-content-center mx-3 card-lift-sm--hover" style={{width:'60px',height:'60px'}}>
                                            <i className="far fa-envelope fa-2x my-auto align-content-center flex-auto text-gmail"></i>
                                        </div>
                                    </a>
                                    <a href="https://api.whatsapp.com/send/?phone=6281929799961&text&app_absent=0">
                                        <div className="card bg-white text-center my-auto align-content-center mx-3 card-lift-sm--hover" style={{width:'60px',height:'60px'}}>
                                            <i className="fab fa-whatsapp-square fa-2x my-auto align-content-center flex-auto text-whatsapp"></i>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            </Fade>

                            <Fade bottom>
                            <div className="col-lg-4 col-sm-12 text-center">
                                <h6 className="font-weight-700">Special thanks to :</h6>
                                <div className="row my-4 d-flex justify-content-center ">
                                    <a href="https://laravel.com" target="_blank" className="my-auto card-lift-sm--hover text-center">
                                        <i className="fab fa-laravel fa-3x  text-laravel mx-4"></i>
                                    </a>
                                    <a href="https://reactjs.org" target="_blank" className="my-auto card-lift-sm--hover text-center">
                                        <i className="fab fa-react fa-3x my-auto text-react mx-4"></i>
                                    </a>
                                    <a href="https://nodejs.org/en" target="_blank" className="my-auto card-lift-sm--hover text-center">
                                        <i className="fab fa-node fa-3x my-auto text-node mx-4"></i>
                                    </a>
                                </div>
                            </div>
                            </Fade>

                            <Fade right>
                            <div className="col-lg-4">
                                <h4 className="text-dark text-center my-2 py-2 ls-1">Gerardus Yuda Iswara</h4>
                                <h4 className="text-center my-2 py-2"><span className="bg-white px-2 py-2 rounded text-darker">ID</span></h4>
                                <p className="text-center my-2 text-dark">Indonesia</p>
                                <p style={{fontSize:'200px', lineHeight:'60px', float:'left', color:'#fefefe93'}} className="ls-2 font-weight-600 mt--6 ml--6 d-none d-lg-block">GERARD</p>
                            </div>
                            </Fade>
                        </div>
                </div>

            </div>
        </Fragment>
        );
    }

    // const cardLoader = () => {
    //     return(
    //         <Fragment>
    //             <div className="card my-auto" style={{position:'fixed', top:"30%"}}>
    //                 <div className="card-body">
    //                     <h2 className="text-darker text-uppercase my-2 ls-2">signing your document</h2>
    //                     <Lottie options={defaultOptions} height={120} width={120} />
    //                 </div>
    //             </div>
    //         </Fragment>
    //     )
    // }

    const {isShowing, toggle, response, isSuccess, message, isMessage, dismiss, allowDismiss} = useModal();
    const { isActive, active, isOverlayMessage, overlayMessage} = useOverlay();


    return(
        <Fragment>
                <ModalSuccess isShowing={isShowing} hide={toggle} response={isSuccess} message={isMessage} allowDismiss={allowDismiss}/>
                {/* <Guest active={1}/> */}
                <div className="bg-white px-0">
                    <Overlay
                        showing={isActive}
                        message={isOverlayMessage}
                        children=
                        {
                            ready === false
                            ?
                            <FadeIn>
                                <div className="container-fluid align-content-center d-flex justify-content-center" style={{height:'100vh'}}>
                                    <div className="my-auto">
                                        <h2 className="text-center text-dark text-uppercase ls-2">Getting The Page Ready</h2>
                                        <div className="d-flex justify-content-center align-items-center">
                                            <Lottie options={defaultOptions} height={120} width={120} />
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                            :
                            <FadeIn>
                                <GuestNavbar/>
                                {renderMainContent()}
                            </FadeIn>
                        }
                    />

                    {/* </Overlay> */}
                </div>
        </Fragment>
    )

}

const roundIcon = {
    width:'70px',
    height:'70px'
}

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
};

// const mapDispatchToProps = dispatch => {
//     return {
//         setLogin: (user) => dispatch({type:"SET_LOGIN", payload:user})
//     }
// };

export default Welcome;
