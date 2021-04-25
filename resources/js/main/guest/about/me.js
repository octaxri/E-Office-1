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
                <div className="row align-content-center bg-text-about">
                    <Fade left>
                        <div className="col-sm-12 col-lg-8 h-100vh py-4 px-lg-6 px-sm-2 pb-6 bg-white">
                        <h2 className="text-primary text-about-right" style={{fontSize:'6vh'}}>
                            <span className="text-muted">Hi..</span>
                            <Zoom delay={2000}>Erm, Welcome to my Portfolio </Zoom>
                            <Zoom delay={4000}><span className="text-muted">I Guess.. </span></Zoom>
                        </h2>
                        <div className="container-fluid">
                            <div className="row py-4">
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
                        </div>

                        <h4 className="text-muted my-4 py-4">
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
                        </div>
                    </Fade>

                    <Fade top>
                        <div className="col-lg-4 col-sm-12 position-relative h-100vh py-4 px-4 d-none d-lg-block">
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
