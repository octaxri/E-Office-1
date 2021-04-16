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

const Education = () => {

    let [ready, setReady] = useState(false)
    const curUrl = useLocation().pathname;
    let history = useHistory();
    let [theme, setTheme] = useState('')

    useEffect(()=>{
        setTheme('bg-gradient-orange')
    },[])

    const education = () => {
        return (
            <>
                <div className="row align-content-center">
                    <div className="col-sm-12 col-lg-8 h-100 py-4 px-lg-6 px-sm-2 pb-6">

                                <h2 className="text-about-right my-4" style={{fontSize:'4vw'}}>
                                    <span className="text-white ls-2">EDUCATION</span>
                                </h2>
                                <div className="row">
                                    <div className="col-auto">
                                        <i className="lar la-comments text-white" style={{fontSize:'80px'}}></i>
                                    </div>
                                    <div className="col">
                                        <h2 className="text-white">
                                            <Typewriter
                                                onInit={(typewriter) => {
                                                    typewriter
                                                    .pauseFor(1000)
                                                    .changeDelay(60)
                                                    .typeString("I wore my graduation cap - got my Diploma in 1st December 2018..")
                                                    // .delay(50)
                                                    .start()
                                                }}
                                            />
                                        </h2>
                                        <h4 className="text-white">
                                            <Typewriter
                                                onInit={(typewriter) => {
                                                    typewriter
                                                    .pauseFor(5000)
                                                    .changeDelay(60)
                                                    .typeString("- Majoring in Informatics Engineering")
                                                    // .delay(50)
                                                    .start()
                                                }}
                                            />
                                        </h4>
                                    </div>
                                </div>

                                <hr className="bg-lighter"/>
                                <div className="container-fluid">
                                <Fade bottom>
                                <div className="row my-4">
                                    <div className="col-lg-6 col-sm-12 my-2">
                                        <div className="card shadow h-100 border-0 about-right">
                                                <div className="row h-100">
                                                    <div className="col-auto bg-purple rounded-left py-4 px-2">
                                                        <i className="las la-school text-white" style={{fontSize:'10vh'}}></i>
                                                    </div>
                                                    <div className="col py-4 px-4">
                                                        <h4 className="text-darker">Xaverius 1 Senior Highschool</h4>
                                                        <small className="text-orange font-weight-600">2014</small><br/>
                                                        <small className="text-darker font-weight-600">Major : Social Studies</small>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-sm-12  my-2">
                                        <div className="card shadow h-100 border-0 about-right">
                                            {/* <div className="card-body"> */}
                                                <div className="row h-100">
                                                    <div className="col-auto bg-red rounded-left py-4 px-2">
                                                        <i className="las la-university text-white" style={{fontSize:'10vh'}}></i>
                                                    </div>
                                                    <div className="col py-4 px-4">
                                                        <h4 className="text-darker">Universitas Dinamika Bangsa - UNAMA</h4>
                                                        <small className="text-red font-weight-600">2014 - 7th March 2018</small><br/>
                                                        <small className="text-darker font-weight-600">Bachelor Of Computer Science</small><br/>
                                                        <small className="text-muted font-weight-600">GPA : 3.90</small>
                                                    </div>
                                                {/* </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </Fade>
                                <hr/>
                                <h4 className="text-white text-uppercase ls-2">Certificate</h4>
                                <div className="row">
                                    <div className="col-auto">
                                        <img src="/argon/img/icons/common/microsoft.svg" alt="" style={{width:'180px', height:'80px'}}/>
                                    </div>
                                    <div className="col">
                                        <h4 className="text-white">MICROSOFT TECHNOLOGY ASSOCIATE - MTA</h4>
                                        <a href="https://verify.certiport.com/" className="btn btn-rounded text-darker bg-white my-2">check credential here</a>
                                        <h4 className="text-white">& enter this : wdFW5-FME5</h4>
                                    </div>
                                </div>
                            </div>



                    {/* <Zoom delay={6000}>
                        <div className="d-inline-block d-none d-sm-block">
                            <NavLink exact to={'/'} activeStyle={LinkActive} className="text-uppercase btn btn-link pl-0 mr-4 my-4">Home</NavLink>
                            <NavLink exact to={'/about'} activeStyle={LinkActive} className="text-uppercase btn btn-link mr-4 my-4">About</NavLink>
                            <NavLink exact to={`/about/me`} activeStyle={LinkActive} className="btn btn-link mr-4 my-4 text-uppercase ">Bio</NavLink>
                            <NavLink exact to={`${curUrl}`} activeStyle={LinkActive} className="btn btn-link mr-4 my-4 text-uppercase ">Education</NavLink>
                            <NavLink exact to={`/about/skills`} activeStyle={LinkActive} className="btn btn-link mr-4 my-4 text-uppercase ">Skills</NavLink>
                            <NavLink to={`/about/projects`} className="btn btn-darker mx-4">
                                <span className="text-uppercase font-weight-600 ls-2">Past Projects</span>
                            </NavLink>
                        </div>
                    </Zoom> */}
                    </div>
                    <Fade top>
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
                                <i className="las la-graduation-cap text-white about-icon-animated mt-8" style={{fontSize:'30vw'}}></i>
                            </div>
                        </div>
                    </Fade>
                </div>
            </>
        )
    }

    const renderMainContent = () => {
        return (
            <>
                {education()}
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
                        <div className="">
                            <div className="container-fluid bg-gradient-orange my-auto w-100">
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

export default Education
