import React, { Component, Fragment, useState, useEffect } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import FadeIn from 'react-fade-in';
import { ToastContainer } from 'react-toastify';
import Lottie from 'react-lottie';
import Axios from 'axios';
import { Link, withRouter } from 'react-router-dom';

import Navigation from '../../../navs/navigation/navigation';
import * as loading from "../../../components/loading.json"
import Auth from '../../../navs/auth/Auth';
import moment from 'moment';
import setActiveSidebar from '../../../navs/auth/hook-auth';
import Navbar from '../../../navs/Navbar';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
};

const AllSpeechRequest = () => {
    let [allSpeechRequest, setAllSpeechRequest] = useState([]);
    let [isReady, setIsReady] = useState(undefined);
    let [overlayActive, setOverlayActive] = useState(false);
    let [error, setError] = useState([]);

    useEffect(() => {
        setActive(9)
        setTimeout(() => {
            setIsReady(true);
         }, 2000);

         Axios.get('/api/speech-request/all-speech-request')
         .then(res => {
             setAllSpeechRequest(res.data)
         })
    }, []);

    const {setActive, menuIsActive} = setActiveSidebar()

    const renderMainContent = () => {
        return allSpeechRequest.map(data => (
            <Fragment key={data.id}>
                <div className="col-lg-4 col-sm-12 my-2 card-lift-sm--hover">
                    <Link to={{ pathname: '/speech-request/detail/' + data.id, id: data.id }}>
                        <div className="card shadow flex" style={{height: '16em'}}>
                            <div className="card-body mb-0">
                                <div className="row">
                                    <div className="col flex-auto d-inline-flex">
                                        <img className="avatar-xs rounded-circle" alt="Image placeholder" src="/argon/img/theme/team-4-800x800.jpg"/>
                                        <p className="text-darker font-weight-500">&emsp;{data.sender.name}</p>
                                    </div>
                                </div>
                                    <small className="text-muted text-uppercase ls-2" style={{fontSize:'0.6em'}}>tema :</small>
                                    <h3>{data.theme}</h3>
                                    <small className="text-muted">{data.event}</small>
                            </div>
                            <div className="card-footer mt-0 z4">
                                <div className="row">
                                    <div className="col">
                                        { data.speech_request_file ?
                                            <div className="d-inline-flex">
                                                <small className="bg-gradient-primary px-1 py-1 rounded text-white font-weight-500" style={{zIndex:2}}><i className="fas fa-paperclip"></i> 1 attachment</small>
                                            </div>
                                            :
                                            <div className="d-inline-flex">
                                                <small className="bg-gradient-danger px-1 py-1 rounded text-white font-weight-500" style={{zIndex:2}}><i className="fas fa-unlink"></i> no attachment</small>
                                            </div>
                                        }
                                    </div>
                                    <div className="col-auto d-inline-flex">
                                        <small className="text-muted font-weight-500" style={{zIndex:2}}>&nbsp;{moment(data.updated_at).fromNow()}</small>
                                    </div>
                                </div>
                            </div>
                            <div className="separator separator-bottom">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 321">
                                    <path fill="#fcfcfc" fillOpacity="1" d="M0,160L60,170.7C120,181,240,203,360,218.7C480,235,600,245,720,213.3C840,181,960,107,1080,85.3C1200,64,1320,96,1380,112L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                                </svg>
                            </div>
                        </div>
                    </Link>
                </div>
            </Fragment>
        ));
    }

    moment.locale('id')
    return (
        <Fragment>
            <Auth active={menuIsActive}/>
            <div className="main-content">
            <Navbar/>
            <div className="header pt-md-7 pt-lg-7" ></div>
                <LoadingOverlay active={overlayActive} spinner={<Lottie options={defaultOptions} height={120} width={120} />} text='MEMPROSES DATA'>
                    <div className="container-fluid py-4">
                    {
                    !isReady
                    ?
                        <FadeIn>
                            <h3 className="text-center text-dark text-uppercase ls-2 pt-md-7">Menyiapkan Data</h3>
                            <div className="d-flex justify-content-center align-items-center">
                                <Lottie options={defaultOptions} height={120} width={120} />
                            </div>
                        </FadeIn>
                    :
                        <Fragment>
                            <ToastContainer position="top-right" autoClose={10000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} draggable/>
                            <Navigation />

                            <div className="row">
                                {renderMainContent()}
                            </div>
                        </Fragment>
                    }
                    </div>
                </LoadingOverlay>
            </div>
        </Fragment>
    );
}

export default withRouter(AllSpeechRequest);
