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

const Me = () => {

    let [ready, setReady] = useState(false)
    const curUrl = useLocation().pathname;
    let history = useHistory();
    let [theme, setTheme] = useState('')


    useEffect(()=>{
        setTheme('bg-gradient-primary')
    },[])

    const bio = () => {
        return (
            <>
                <div className="row align-content-center bg-text-about"  data-bg-text="WELCOME">
                    <div className="col-sm-12 col-lg-8 py-4 px-6 bg-white">
                    <h2 className="text-primary text-about-right">
                        <span className="text-muted">Hi..</span>
                        <Zoom delay={2000}>Erm, Welcome to my Portfolio </Zoom>
                        <Zoom delay={4000}><span className="text-muted">I Guess.. </span></Zoom>
                    </h2>
                    <div className="row">
                        <div className="col-auto">
                            <i className="lar la-comments text-primary" style={{fontSize:'80px'}}></i>
                        </div>
                        <div className="col">


                            <h2 className="text-default">
                                <Typewriter
                                    onInit={(typewriter) => {
                                        typewriter
                                        .pauseFor(1000)
                                        .changeDelay(60)
                                        .typeString("My name is Gerardus Yuda Iswara, born in Jambi, 24th October '96..")
                                        // .delay(50)
                                        .start()
                                    }}
                                />
                            </h2>
                            <h2 className="text-muted">
                                <Typewriter
                                    onInit={(typewriter) => {
                                        typewriter
                                        .pauseFor(5000)
                                        .changeDelay(60)
                                        .typeString("Just call me 'Gerard' please..")
                                        // .delay(50)
                                        .start()
                                    }}
                                />
                            </h2>
                        </div>
                    </div>

                    <h4 className="text-muted my-4">
                        <Typewriter
                            onInit={(typewriter) => {
                                typewriter
                                .pauseFor(7000)
                                .changeDelay(60)
                                .typeString("I love learning & discovering new things, like, you know, 'Doing some Experimental stuff'.. ")
                                // .delay(50)
                                .start()
                            }}
                        />
                    </h4>
                    {/* <Zoom delay={6000}>
                        <div className="d-inline-block">
                            <NavLink exact to={'/'} activeStyle={LinkActive} className="text-uppercase btn btn-link pl-0 mr-4 my-4">Home</NavLink>
                            <NavLink exact to={'/about'} activeStyle={LinkActive} className="text-uppercase btn btn-link mr-4 my-4">About</NavLink>
                            <NavLink exact to={`${curUrl}`} activeStyle={LinkActive} className="btn btn-link mr-4 my-4 text-uppercase ">Bio</NavLink>
                            <NavLink exact to={`/about/education`} activeStyle={LinkActive} className="btn btn-link mr-4 my-4 text-uppercase ">Education</NavLink>
                            <NavLink exact to={`/about/skills`} activeStyle={LinkActive} className="btn btn-link mr-4 my-4 text-uppercase ">Skills</NavLink>
                            <NavLink to={`/about/projects`} className="btn btn-darker mx-4">
                                <span className="text-uppercase font-weight-600 ls-2">Past Projects</span>
                            </NavLink>
                        </div>
                    </Zoom> */}
                    </div>
                    <Fade top>
                        <div className="col-lg-4 col-sm-12 position-relative h-100vh py-4 px-4">
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
                                <i className="las la-biking text-white about-icon-animated mt-8" style={{fontSize:'30vw'}}></i>
                            </div>
                        </div>
                    </Fade>
                </div>
            </>
        )
    }

    const education = () => {
        return (
            <>
                <h2 className="text-yellow-calm text-about-right my-4">
                    <span className="text-darker ls-2">EDUCATION</span>
                </h2>
                <h2 className="text-darker">
                    Got my Diploma in December 2018 - Majoring in Informatics Engineering
                </h2>
                <div className="row my-4">
                    <div className="col-lg-6 col-sm-12">
                        <div className="card bg-lighter shadow">
                            <div className="card-body">
                                <h4 className="text-darker">Xaverius 1 Senior Highschool</h4>
                                <small className="text-yellow-calm font-weight-600">2014</small><br/>
                                <small className="text-darker font-weight-600">Major : Social Studies</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <div className="card bg-lighter shadow">
                            <div className="card-body">
                                <h4 className="text-darker">Universitas Dinamika Bangsa - UNAMA</h4>
                                <small className="text-yellow-calm">2018</small><br/>
                                <small className="text-darker font-weight-600">Bachelor Of Computer Science - GPA : 3.90</small>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const renderMainContent = () => {
        return (
            <>
                {bio()}
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
                        <div className={`${theme}`}>
                            <div className="container-fluid my-auto justify-content-center">
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

export default Me
