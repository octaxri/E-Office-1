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
import Scrollbar from 'react-smooth-scrollbar';
import { SmoothProvider } from 'react-smooth-scrolling'
// import SmoothScrollbar from 'smooth-scrollbar';
// import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';

// SmoothScrollbar.use(OverscrollPlugin);

const Skills = () => {

    let [ready, setReady] = useState(false)
    const curUrl = useLocation().pathname;
    let history = useHistory();
    let [theme, setTheme] = useState('')

    useEffect(()=>{
        setTheme('bg-gradient-danger')
        // const scrollbar = $container.scrollbar;
    },[])

    const SkillCard = ({bg, icon, title, sub, url}) => {
        return (
            <>
                <div className="col-lg-4 col-sm-12">
                    {/* <div className=""> */}
                        <div className="container-fluid rounded h-100 my-2 shadow border-0 about-right bg-white">
                            <div className="row h-100">
                                <div className={`col-4 ${bg} rounded-left py-2 h-100 d-flex justify-content-center`}>
                                    { url ?
                                        <img src={`${url}`} alt="" style={{height:'70px', width:'70px'}} />
                                        :
                                        <i className={`${icon} text-white my-auto`} style={{fontSize:'9vh'}}></i>
                                    }
                                </div>
                                <div className="col-8">
                                    <div className="px-2 py-2">
                                        <p className="text-uppercase text-darker font-weight-600 my-0">{title}</p>
                                        <p className="text-muted my-0" style={{fontSize:'0.8em'}}>{sub}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/* </div> */}
                </div>
            </>
        )
    }

    const skills = () => {
        return (
            <>
                <div className="row align-content-center">
                <Fade left>
                    <div className="col-sm-12 col-lg-8 h-100 py-4 px-lg-6 px-sm-2 pb-6">
                    <h2 className="text-yellow-calm text-about-right my-4 font-weight-300">
                        <span className="text-white ls-3">SKILLS</span>
                    </h2>
                    <div className="container-fluid">
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
                                            .typeString("I Use PHP a lot 'til now, but it actually depends on the App specification..")
                                            // .delay(50)
                                            .start()
                                        }}
                                    />
                                </h2>
                            </div>
                        </div>
                    </div>
                    {/* <h2 className="text-yellow-calm">
                        <Typewriter
                            onInit={(typewriter) => {
                                typewriter
                                .pauseFor(5000)
                                .changeDelay(60)
                                .typeString("And MySQL also, for relational data..")
                                // .delay(50)
                                .start()
                            }}
                        />
                    </h2> */}

                    <hr className="bg-lighter"/>
                    <h3 className="text-uppercase text-white">programming languange</h3>
                    {/* <div className="container-fluid"> */}
                    <Fade bottom>
                        <div className="row my-4">
                            <SkillCard
                                bg="bg-primary"
                                icon="lab la-php"
                                title="PHP"
                                sub="well, web, that's why"
                            />
                            <SkillCard
                                bg="bg-default"
                                icon="lab la-java"
                                title="Java"
                                sub="rarely use this since 2018 - but the security is no joke"
                            />
                            <SkillCard
                                bg="bg-yellow"
                                icon="lab la-js-square"
                                title="Javascript"
                                sub="for ASYNC and Promise like function, etc"
                            />
                        </div>
                    </Fade>
                    {/* </div> */}

                    <hr className="bg-lighter"/>
                    <h3 className="text-uppercase text-white">backend frameworks</h3>
                    <div className="container-fluid">
                        <Fade bottom>
                            <div className="row">
                                <SkillCard
                                    bg="bg-red"
                                    icon="lab la-laravel"
                                    title="laravel"
                                    sub="for eloquent model relation and API resources"
                                />
                                <SkillCard
                                    bg="bg-node"
                                    icon="lab la-envira"
                                    title="Spring"
                                    sub="If the web app specification need Java dependencies"
                                />
                            </div>
                        </Fade>
                    </div>

                    <hr className="bg-lighter"/>
                    <h3 className="text-uppercase text-white">frontend frameworks</h3>
                    <div className="container-fluid">
                        <Fade bottom>
                        <div className="row">
                            <SkillCard
                                bg="bg-react"
                                icon="lab la-react"
                                title="react"
                                sub="For SPA, and user interaction mainly"
                            />
                            <SkillCard
                                bg="bg-vue"
                                icon="lab la-vuejs"
                                title="Vue"
                                sub="Laravel's default but still prefer react"
                            />
                            <SkillCard
                                bg="bg-purple"
                                icon="lab la-js-square"
                                title="Redux"
                                sub="For global state management, etc"
                                url="/argon/img/icons/common/redux-white.svg"
                            />
                        </div>
                        </Fade>
                    </div>

                    <hr className="bg-lighter"/>
                    <h3 className="text-uppercase text-white">js runtime</h3>
                    <div className="container-fluid">
                        <Fade bottom>
                        <div className="row">
                            <SkillCard
                                bg="bg-node"
                                icon="lab la-node"
                                title="node.js"
                                sub="Express, that's why. And Nest.js syntax kinda nice looking though.."
                            />
                        </div>
                        </Fade>
                    </div>

                    <hr className="bg-lighter" />
                    <h3 className="text-uppercase text-white">styling framework</h3>
                    <div className="container-fluid">
                        <Fade bottom>
                            <div className="row">
                                <SkillCard
                                    bg="bg-purple"
                                    icon="lab la-bootstrap"
                                    title="bootstrap"
                                    sub="For flex container & responsiveness"
                                />
                                <SkillCard
                                    bg="bg-react"
                                    icon="las la-wind"
                                    title="tailwind"
                                    sub="Or we going full style with customization"
                                />
                            </div>
                        </Fade>
                    </div>

                    <hr className="bg-lighter"/>
                    <h3 className="text-uppercase text-white">database</h3>
                    <div className="container-fluid">
                        <Fade bottom>
                        <div className="row">
                            <SkillCard
                                bg="bg-purple"
                                icon="lab la-bootstrap"
                                title="mysql"
                                sub="preferable if you choose Laravel"
                                url="/argon/img/icons/common/mysql.svg"
                            />
                            <SkillCard
                                bg="bg-node"
                                icon="las la-shield-alt"
                                title="mongodb"
                                sub="if NodeJS as backend - might as well use this"
                            />
                        </div>
                        </Fade>
                    </div>

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <h4 className="text-white my-4">And this : CSS/SCSS , GIT, OpenSSL, Docker, Apache</h4>
                            </div>
                        </div>
                    </div>
                </div>
                </Fade>

                    <Fade top>
                        {/* <div className="no-gutters"> */}
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
                                <i className="las la-laptop-code text-white about-icon-animated mt-8" style={{fontSize:'30vw'}}></i>
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
                        <div className="">
                                {/* <div className="position-relative about-bg-full-screen h-100vh"></div> */}
                                <div className={`container-fluid my-auto ${theme} w-100`}>
                                    {/* <SmoothProvider skew={false} ease> */}
                                        { renderMainContent()}
                                    {/* </SmoothProvider> */}
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

export default Skills
