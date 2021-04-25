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
import PdfContainer from '../../auth/speech/pdf-container';

const Resume = () => {

    let [ready, setReady] = useState(false)
    const curUrl = useLocation().pathname;
    let history = useHistory();
    let [theme, setTheme] = useState('')
    let [photoIndex, setPhotoIndex] = useState(0)
    let [isOpen, setIsOpen] = useState(false)
    let [activeImage, setActiveImage] = useState('')

    useEffect(()=>{
        setTheme('bg-gradient-dark')
    },[])

    const skills = () => {
        return (
            <>
                <div className="row align-content-center h-100">
                    <Fade left>
                        <div className="col-sm-12 col-lg-8 bg-white h-100 py-4 px-lg-6 px-sm-2 pb-6">
                        <h1 className="text-muted mt-4 ls-3">
                            RESUME &
                        </h1>
                        <p className="text-purple mb-4 mt-0 ls-4" style={{fontSize:'6vh'}}>
                            CURRICULUM
                            <span className="text-darker" style={{fontWeight:'lighter!important'}}> VITAE</span>
                        </p>

                        <ol className="text-purple">
                            <h2 className="py-4">
                                <li className="text-purple ls-2 text-uppercase">resume</li>
                            </h2>
                            <Link className="btn btn-sm bg-gradient-purple shadow" to="/argon/attachments/RESUME.pdf" target="_blank" download><span className="text-white text-uppercase" style={{fontSize:'0.9em'}}>Download Resume - PDF</span></Link>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col">
                                        <PdfContainer
                                            isDataExist={true}
                                            pdfLoadMessage={'Loading Resume File'}
                                            url={'/argon/attachments/RESUME.pdf'}
                                            />
                                    </div>
                                </div>
                            </div>


                            <hr/>


                            <h2 className="py-4">
                                <li className="text-purple ls-2 text-uppercase">curriculum vitae</li>
                            </h2>
                            <Link className="btn btn-sm bg-gradient-purple shadow" to="/argon/attachments/CV.pdf" target="_blank" download><span className="text-white text-uppercase" style={{fontSize:'0.9em'}}>Download CV - PDF</span></Link>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col">
                                        <PdfContainer
                                            isDataExist={true}
                                            pdfLoadMessage={'Loading CV File'}
                                            url={'/argon/attachments/CV.pdf'}
                                        />
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

                        </div>
                    </Fade>

                    <Fade top>
                        {/* <div className="no-gutters"> */}
                        <div className="col-lg-4 col-sm-12 bg-dark h-100vh py-4 px-4 d-none d-md-block">
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
                                <i className="las la-file-code text-white about-icon-animated mt-8" style={{fontSize:'30vw'}}></i>
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
                        <div className={`${theme}`}>
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

export default Resume
