import React, { useState, useContext, useEffect, useCallback, useMemo, Fragment } from 'react';
import Axios from 'axios';
import Auth from '../../../navs/auth/Auth';
import FadeIn from 'react-fade-in';
import Lottie from 'react-lottie';
import setActiveSidebar from '../../../navs/auth/hook-auth';
import Navigation from '../../../navs/navigation/navigation';
import * as loading from "../../../components/loading.json";
import { Link } from 'react-router-dom';
import moment from 'moment';
import Navbar from '../../../navs/Navbar';

const dispatchHistory = (props) => {
    moment.locale('id')
    let [histories, setHistories] = useState([])
    let [ready, setReady] = useState(false)

    useEffect(() => {
        setActive(8), getData()
    }, [])

    const getData = async () => {
        await Axios.get('/api/history/dispatch-history')
            .then(res => setHistories(res.data))

        setReady(true)
    }

    const renderMainContent = () => {
        return (
            <Fragment>
                <div className="col">
                    <div className="row">
                        <div className="col-auto">
                            <i className="mt-2 fas fa-signature fa-2x px-2 py-2 bg-darker text-white my-auto rounded"></i>
                        </div>
                        <div className="col">
                            <small className="text-muted text-uppercase ls-2" style={{fontSize: '0.7em'}}>data</small>
                            <h2 className="text-darker mt--1">Aktivitas User</h2>
                        </div>
                    </div>
                {
                    histories.map( (history, index) => (
                        <Fragment key={index}>
                            <div className="row my-1">
                                <div className="col-lg-6">
                                    <div className="card shadow">
                                        <div className="card-body">
                                            <p className="text-dark"> Anda mendisposisikan pidato bertema : <a className="btn-link text-darker">
                                                {history.speech_data.speech_request ? history.speech_data.speech_request.theme : null} </a>
                                                kepada <span className="text-darker font-weight-600">{history.receiver.name}</span>
                                            </p>
                                            <div className="row">
                                                <div className="col flex-auto d-inline-flex">
                                                { history.receiver.profile && history.receiver.profile.profile_pic_url ?
                                                    <img className="avatar-xs rounded-circle" alt="Image placeholder" src={`/argon/img/profile/${history.receiver.profile.profile_pic_url}`}/>
                                                    :
                                                    <img className="avatar-xs rounded-circle" alt="Image placeholder" src="/argon/img/profile/default.jpg"/>
                                                }
                                                <p className="text-darker font-weight-500">&emsp;{history.receiver.name}</p>&nbsp;-&nbsp;<u className="text-muted">telah diterima {moment(history.created_at).fromNow()}</u>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    ))
                }
                </div>
            </Fragment>
        )
    }

    const {setActive, menuIsActive} = setActiveSidebar()

    return (
        <Fragment>
            <Auth active={menuIsActive}/>
            <div className="main-content">
                <Navbar/>
                <div className="header pt-md-7 pt-lg-7" ></div>
                <div className="container-fluid py-4">
                {
                    ready === false
                    ?
                        <FadeIn>
                            <h3 className="text-center text-dark text-uppercase ls-2 pt-md-7 pt-sm-7">Menyiapkan Data</h3>
                            <div className="d-flex justify-content-center align-items-center">
                                <Lottie options={defaultOptions} height={120} width={120} />
                            </div>
                        </FadeIn>
                    :
                        <Fragment>
                            <Navigation />
                            <div className="row">
                                {renderMainContent()}
                            </div>
                        </Fragment>
                }
                </div>
            </div>
        </Fragment>
    )
}

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
};

export default dispatchHistory;
