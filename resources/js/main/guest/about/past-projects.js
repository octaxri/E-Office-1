import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation,
    NavLink,
    Redirect,
    useHistory
} from "react-router-dom";
import Overlay from '../../../components/loading-overlay/overlay';
import useOverlay from '../../../components/loading-overlay/state';
import Waiting from '../../../components/waiting/waiting';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import { AnimatedSwitch } from 'react-router-transition';
import Typewriter from 'typewriter-effect';
import BottomNavbar from './nav/bottom-nav';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const PastProjects = () => {

    let [ready, setReady] = useState(false)
    const curUrl = useLocation().pathname;
    let history = useHistory();
    let [theme, setTheme] = useState('')
    let [photoIndex, setPhotoIndex] = useState(0)
    let [isOpen, setIsOpen] = useState(false)
    let [activeImage, setActiveImage] = useState('')

    useEffect(()=>{
        setTheme('bg-gradient-purple')
    },[])

    const skills = () => {
        return (
            <>
                <div className="row align-content-center">
                    <div className="col-sm-12 col-lg-8 bg-white h-100 py-4 px-lg-6 px-sm-2 pb-6">
                    <h1 className="text-muted mt-4 ls-3">
                        PAST PROJECTS &
                    </h1>
                    <p className="text-purple mb-4 mt-0 ls-4" style={{fontSize:'6vh'}}>
                        WORK
                        <span className="text-darker" style={{fontWeight:'lighter!important'}}> HISTORY</span>
                    </p>

                    <ol className="text-purple">
                        <h2 className="py-4">
                            <li className="text-purple ls-2 text-uppercase">SATUKUNCI <span><h4 className="text-muted font-weight-500">January 2019 - March 2020</h4></span></li>
                        </h2>
                        <div className="container-fluid">
                            <div className="row mb-6">
                                <div className="col-auto">
                                    <i className="las la-industry text-purple" style={{fontSize:'80px'}}></i>
                                </div>
                                <div className="col">
                                    <h3 className="text-default text-uppercase">Work Description :</h3>
                                    <p className="text-muted">As a full stack programmer, i did maintenance, bug fixing including electronic signature and enhancing document template in client's website.</p>
                                </div>
                            </div>
                        </div>

                        <h2 className="my-4 py-4">
                            <li className="text-purple ls-2 text-uppercase">freelance full stack developer <span><h4 className="text-muted font-weight-500">March 2020 - Now</h4></span></li>
                        </h2>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-auto my-auto">
                                    <i className="las la-user-friends text-purple" style={{fontSize:'80px'}}></i>
                                </div>
                                <div className="col">
                                    <h3 className="text-default text-uppercase">Work Description :</h3>
                                    <ol className="text-muted">
                                        <li className="py-2">I Develop web applications according to client's specification, including prototyping, analyzing software requirements, & designing database structure. </li>
                                        <li className="py-2">Create, testing & integrating API resources within Web Application and Mobile App (Android).</li>
                                        <li className="py-2">Collaborate with the android programmer, including the App Design & how user interact with our App.</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </ol>

                    <hr/>

                    <h2 className="text-purple text-about-right my-4 py-4 ls-4">
                        PAST
                        <span className="text-darker"> PROJECTS</span>
                    </h2>
                    <ol className="text-white">

                        <div className="container-fluid">
                            <div className="row my-2">
                                <div className="col-lg-7 col-sm-12">
                                        <h4 className="text-purple">
                                            <li className="pb-4"><span className="ls-2">SIBUK BANGAT</span></li>
                                            <small className="text-darker font-weight-600">Owner: BAPPEDA PROVINSI JAMBI</small>
                                            <p className="text-muted"><span className="font-weight-600 text-darker">APP Type :</span> EOFFICE, Online Submission, User & Document Management, Permission Based, Survey Collector, Progress Monitoring</p>
                                        </h4>
                                </div>
                                <div className="col-lg-5 col-sm-12">
                                    <img className="img-fluid shadow" src="/argon/img/projects/1.png" alt="" onClick={()=>{setIsOpen(true), setActiveImage('/argon/img/projects/1.png')}} style={{cursor:'pointer'}}/>
                                </div>
                            </div>
                            <div className="row my-2">
                                <div className="col-lg-7 col-sm-12">
                                        <h4 className="text-purple">
                                            <li className="pb-4"><span className="ls-2">EPIDATO</span></li>
                                            <small className="text-darker font-weight-600">Owner: BAPPEDA PROVINSI JAMBI</small>
                                            <p className="text-muted"><span className="font-weight-600 text-darker">APP Type :</span> EOFFICE, Online Submission, User & Document Management, Permission Based, PDF Generator, Email Notification, E-Signature</p>
                                        </h4>
                                </div>
                                <div className="col-lg-5 col-sm-12">
                                    <img className="img-fluid shadow" src="/argon/img/projects/2.png" alt="" onClick={()=>{setIsOpen(true), setActiveImage('/argon/img/projects/2.png')}} style={{cursor:'pointer'}}/>
                                </div>
                            </div>
                        </div>
                    </ol>

                    {isOpen == true && (
                        <Lightbox
                            mainSrc={activeImage}
                            onCloseRequest={() => {setIsOpen(false), setActiveImage('')}}
                        />
                    )}

                    {/* <Zoom delay={6000}>
                        <div className="d-inline-block">
                            <NavLink exact to={'/'} activeStyle={LinkActive} className="text-uppercase btn btn-link pl-0 mr-4 my-4">Home</NavLink>
                            <NavLink exact to={'/about'} activeStyle={LinkActive} className="text-uppercase btn btn-link mr-4 my-4">About</NavLink>
                            <NavLink exact to={`/about/me`} activeStyle={LinkActive} className="btn btn-link mr-4 my-4 text-uppercase ">Bio</NavLink>
                            <NavLink exact to={`/about/education`} activeStyle={LinkActive} className="btn btn-link mr-4 my-4 text-uppercase ">Education</NavLink>
                            <NavLink exact to={`/about/skills`} activeStyle={LinkActive} className="btn btn-link mr-4 my-4 text-uppercase ">Skills</NavLink>
                            <NavLink to={`${curUrl}`} className="btn btn-darker mx-4">
                                <span className="text-uppercase font-weight-600 ls-2">Past Projects</span>
                            </NavLink>
                        </div>
                    </Zoom> */}
                    </div>

                    <Fade top>
                        {/* <div className="no-gutters"> */}
                        <div className="col-lg-4 col-sm-12 position-relative h-100vh py-4 px-4 d-none d-md-block">
                            <div className="position-fixed">
                                <div className="about-shape-circle-30 position-absolute bg-white about-icon-animated-2s left-8"></div>
                                <div className="about-shape-circle-10 position-absolute bg-white about-icon-animated-2s top-6 left-8"></div>
                                <div className="about-shape-circle-30 position-absolute bg-white about-icon-animated-2s top-6 left-6"></div>
                                <div className="about-shape-circle-10 position-absolute bg-white right-2 bottom-2 about-icon-animated-2s mb-8"></div>
                                <div className="about-shape-circle-30 position-absolute bg-white about-icon-animated-2s top-8 left-8"></div>
                                <div className="about-shape-circle-30 position-absolute bg-lighter bottom--9 left-4 about-icon-animated-2s mb-8"></div>
                                <div className="about-shape-circle-30 position-absolute bg-lighter bottom--7 left-8 about-icon-animated-2s mb-8"></div>
                                <div className="about-shape-circle position-absolute bg-white right-2 top-6 about-icon-animated-2s"></div>
                                <div className="about-shape-circle-10 position-absolute bg-lighter right-2 top-6 about-icon-animated-2s"></div>
                                <div className="about-shape-circle-10 position-absolute bg-lighter right-8 bottom-8 about-icon-animated-2s mb-8"></div>
                                <div className="about-shape-circle-30 position-absolute bg-lighter right-6 top-6 about-icon-animated-2s"></div>
                                <i className="las la-snowflake text-white about-icon-animated mt-8" style={{fontSize:'30vw'}}></i>
                            </div>
                        </div>
                        {/* </div> */}
                    </Fade>
                </div>
            </>
        )
    }

    const renderMainContent = () => {
        return (
            <>
                {skills()}
            </>
        )
    }

    const { isActive, active, isOverlayMessage, overlayMessage} = useOverlay()

    return (
        <>
            <Overlay
                showing={isActive}
                message={isOverlayMessage}
                children={
                    <>
                        <div className={theme}>
                            <div className="container-fluid my-auto w-100">
                                { renderMainContent()}
                            </div>
                            <BottomNavbar theme={theme}/>
                        </div>
                    </>
                }
            />
        </>
    )
}


const LinkActive = {
    fontWeight: "600",
    color: "#f4bc51"
}

export default PastProjects
