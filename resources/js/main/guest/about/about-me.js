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

const About = () => {

    let [ready, setReady] = useState(false)
    const curUrl = useLocation();
    let history = useHistory();

    useEffect(()=>{
        setTimeout(()=>{
            setReady(true)
        }, 2000)
        // console.log(curUrl)
    },[])

    function landing() {
        <Redirect to="/" />
    }

    const introduction = () => {
        return (
            <>
                <Fade right>
                <div className="row my-auto align-content-center h-100vh bg-text-about"  data-bg-text="WELCOME">
                    <div className="col-sm-12 col-lg-8 about-right ">
                            <h2 className="text-yellow-calm text-about-right">
                                <span className="text-darker">Hi..</span>
                                <Zoom delay={2000}>Erm, Welcome to my Portfolio </Zoom>
                                <Zoom delay={4000}><span className="text-darker">I Guess.. </span></Zoom>
                            </h2>

                            <h4 className="text-darker">
                                <Typewriter
                                    onInit={(typewriter) => {
                                        typewriter
                                        .pauseFor(0)
                                        .changeDelay(60)
                                        .typeString("- Not much but i'll introduce myself first..")
                                        // .delay(50)
                                        .start()
                                    }}
                                />
                            </h4>

                            <Zoom delay={0}>
                            <div className="d-inline-block">
                                <Link to="/" className="btn btn-link mr-4 my-4"><span className="h3 text-dark text-uppercase font-weight-500">Home</span></Link>
                                <Link to={`${curUrl.pathname}/me`} className="btn btn-darker mx-4">
                                    <span className="text-uppercase font-weight-600 ls-2">about Me</span>
                                </Link>
                            </div>
                            </Zoom>
                    </div>
                    <div className="col-lg-4">
                        <i class="las la-cookie-bite text-yellow-calm about-icon-animated" style={{fontSize:'60vh'}}></i>
                    </div>
                </div>
                </Fade>
            </>
        )
    }

    const me = () => {

        const bio = () => {
            return (
                <>
                    <h2 className="text-yellow-calm text-about-right my-4">
                        <span className="text-darker ls-2">BIOGRAPHY</span>
                    </h2>
                    <h2 className="text-darker">
                        <Typewriter
                            onInit={(typewriter) => {
                                typewriter
                                .pauseFor(1000)
                                .changeDelay(60)
                                .typeString("My full name is Gerardus Yuda Iswara, born in Jambi, 24th October '96..")
                                // .delay(50)
                                .start()
                            }}
                        />
                    </h2>
                    <h2 className="text-yellow-calm">
                        <Typewriter
                            onInit={(typewriter) => {
                                typewriter
                                .pauseFor(3000)
                                .changeDelay(60)
                                .typeString("Just call me 'Gerard' please..")
                                // .delay(50)
                                .start()
                            }}
                        />
                    </h2>
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

        return (
            <>
                {/* <Fade right> */}
                <div className="row my-auto align-content-center h-100vh bg-text-about"  data-bg-text="WELCOME">
                    <div className="col-sm-12 col-lg-12 about-right ">
                            <Router>
                                <AnimatedSwitch
                                    atEnter={{ opacity: 0 }}
                                    atLeave={{ opacity: 0 }}
                                    atActive={{ opacity: 1 }}
                                    // className="switch-wrapper"
                                >
                                    <Route exact path={`${curUrl.pathname}/me`}>
                                        {bio()}
                                    </Route>
                                    <Route path={`${curUrl.pathname}/education`}>
                                        {education()}
                                    </Route>
                                </AnimatedSwitch>
                            </Router>

                            <Zoom delay={6000}>
                                <div className="d-inline-block">
                                    <button onClick={()=>landing()} className="btn btn-link mr-4 my-4 text-uppercase ">Home</button>
                                    <NavLink exact to={`${curUrl.pathname}`} activeStyle={LinkActive} className="text-uppercase btn btn-link mr-4 my-4">About</NavLink>
                                    <NavLink exact to={`${curUrl.pathname}/me`} activeStyle={LinkActive} className="btn btn-link mr-4 my-4 text-uppercase ">Bio</NavLink>
                                    <NavLink exact to={`${curUrl.pathname}/education`} activeStyle={LinkActive} className="btn btn-link mr-4 my-4 text-uppercase ">Education</NavLink>
                                    <NavLink to={`${curUrl.pathname}/projects`} className="btn btn-darker mx-4">
                                        <span className="text-uppercase font-weight-600 ls-2">Past Projects</span>
                                    </NavLink>
                                </div>
                            </Zoom>
                    </div>
                </div>
                {/* </Fade> */}
            </>
        )
    }

    const renderMainContent = () => {
        return (
        // <Router>
            <AnimatedSwitch
                atEnter={{ opacity: 0 }}
                atLeave={{ opacity: 0 }}
                atActive={{ opacity: 1 }}
                // className="switch-wrapper"
            >
                <Route exact path={`${curUrl.pathname}`}>
                    {introduction()}
                </Route>
                <Route path={`${curUrl.pathname}/me`}>
                    {me()}
                </Route>
                <Route path={`${curUrl.pathname}/education`}>
                    {me()}
                </Route>
                {/* <Route path={`/`} component={Welcome}/> */}
            </AnimatedSwitch>
        // </Router>
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
                        {/* <div className="main-content bg-white about-bg-full-screen"> */}
                            <div className="container-fluid h-100 my-auto justify-content-center w-100 d-flex">
                            {/* <Navbar/> */}
                                {
                                ready === false
                                ?
                                <Waiting message={'getting the page ready'}/>
                                :
                                    <>
                                        { renderMainContent()}
                                    </>
                                }
                            </div>
                        {/* </div> */}
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

export default About
