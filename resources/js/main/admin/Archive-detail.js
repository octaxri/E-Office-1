import React, { useState, useContext, useEffect, useCallback, useMemo, Fragment } from 'react';
import ModalSuccess from '../../components/modal/modal-success';
import LoadingOverlay from 'react-loading-overlay';
import Auth from '../../navs/auth/Auth';
import FadeIn from 'react-fade-in';
import Lottie from 'react-lottie';
import Navigation from '../../navs/navigation/navigation';
import * as loading from "../../components/loading.json"
import Axios from 'axios';
import useModal from '../../components/modal/hook-modal';
import { Link, useParams } from 'react-router-dom';
import Error from '../../components/error/error';
import LazyLoad from 'react-lazyload';
import Navbar from '../../navs/Navbar';

const ArchiveDetail = () => {
    let [archive,setArchive] = useState([]);
    let [archiveError,setArchiveError] = useState([]);
    let [permissions, setPermissions] = useState([]);
    let [ready, setReady] = useState(false);
    let [overlayActive, setOverlayActive] = useState(false);

    let {id} = useParams();

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        await Axios.get('/api/permissions/user-permissions')
            .then(res => {
                setPermissions(res.data),
                Axios.get('/api/admin/archive?id=' + id)
                    .then(res => setArchive(res.data))
                    .catch(error => {setArchive(error.response.data), console.log(error.response.data)}),

                setReady(true)
            })
            .catch( error => {setPermissions(error.response.data), setReady(true)} )
    }

    const archiveContent = () => {
        return (
            <div className="col-lg-6">
                <div className="row">
                    <div className="col-auto">
                        <i className="mt-2 fas fa-list fa-2x px-2 py-2 bg-darker text-white my-auto rounded"></i>
                    </div>
                    <div className="col">
                        <small className="text-muted text-uppercase ls-2" style={{fontSize: '0.7em'}}>data</small>
                        <h2 className="text-darker mt--1">List Pidato Ditanda-tangani</h2>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body bg-lighter">
                        {
                            !archive.error
                            ?
                            archive.map((data, key) => (
                                <LazyLoad key={key} placeholder={<Lottie options={defaultOptions} height={120} width={120} />}>
                                    {renderTabContent(data, key)}
                                </LazyLoad>
                            ))
                            :
                            <Error error={archive.error}/>
                        }
                    </div>
                </div>
            </div>
        )
    }

    const renderTabContent = (data, key) => {
        return (
            <Fragment>
                <div className="card mt-2">
                    <div className="card-body">
                        <div className="nav-wrapper">
                            <ul className="nav nav-pills-ct" id="tabs-icons-text" role="tablist" key={key}>
                                <li className="nav-item">
                                    <a className="nav-link mb-sm-3 mb-md-0 active" id="tabs-icons-text-1-tab" data-toggle="tab" href={`#tabs-icons-text-${key}`} role="tab" aria-controls="tabs-icons-text-1" aria-selected="true">
                                        <h4 className="ls-2 text-uppercase text-darker">detail</h4>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-2-tab" data-toggle="tab" href={`#tabs-icons-text-2${key}`} role="tab" aria-controls="tabs-icons-text-2" aria-selected="false">
                                        <h4 className="ls-2 text-uppercase text-darker">riwayat</h4>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id={`tabs-icons-text-${key}`} role="tabpanel" aria-labelledby="tabs-icons-text-1-tab">
                                {archiveDetail(data)}
                            </div>
                            <div className="tab-pane fade" id={`tabs-icons-text-2${key}`} role="tabpanel" aria-labelledby="tabs-icons-text-2-tab">
                                {logDetail(data)}
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }

    const archiveDetail = (data) => {
        return (
            <Fragment>
                <div className="row">
                    <div className="col-lg-3 col-sm-3 text-center">
                        <img src="/argon/img/icons/common/pdf-type-01.svg" alt=""/>
                        <button className="btn btn-darker text-uppercase">download</button>
                    </div>
                    <div className="col-lg-9 col-sm-9">
                        <small className="text-muted text-uppercase ls-2" style={{fontSize:'0.6em'}}>tema :</small>
                            <h3>{data.speech_detail.speech_data.speech_request.theme}</h3>
                        <small className="text-muted">{data.speech_detail.speech_data.speech_request.event}</small>
                    </div>
                </div>
            </Fragment>
        )
    }

    const logDetail = (data) => {
        return (
            <Fragment>
                { data.log_data.map( (log, key) => (
                    <div className="card mt-2" key={key}>
                        <div className="card-body py-2">
                            <small className="text-muted text-uppercase ls-2" style={{fontSize:'0.6em'}}>pengirim :</small>
                                <h5>{log.sender.name}</h5>
                            {/* <small className="text-muted">{data.speech_detail.speech_data.speech_request.event}</small> */}
                        </div>
                    </div>
                    ))
                }
            </Fragment>
        )
    }

    const renderMainContent = () => {
        return (
            <Fragment>
                {archiveContent()}
                <div className="col-lg-6">
                    <div className="row">
                        <div className="col-auto">
                            <i className="mt-2 fas fa-list fa-2x px-2 py-2 bg-darker text-white my-auto rounded"></i>
                        </div>
                        <div className="col">
                            <small className="text-muted text-uppercase ls-2" style={{fontSize: '0.7em'}}>data</small>
                            <h2 className="text-darker mt--1">List Pidato Dalam Proses</h2>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">

                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }

    const {isShowing, toggle, response, isSuccess, message, isMessage, dismiss, allowDismiss} = useModal();

    return (
        <Fragment>
            <ModalSuccess isShowing={isShowing} hide={toggle} response={isSuccess} message={isMessage} allowDismiss={allowDismiss}/>
            <LoadingOverlay active={overlayActive} spinner={ <Lottie options={defaultOptions} height={120} width={120} /> } text='MEMPROSES DATA'>
                <Auth/>
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
                                        { permissions.error ? <Error error={permissions.error}/> : renderMainContent()}
                                    </div>
                                </Fragment>
                        }
                        </div>
                </div>
            </LoadingOverlay>
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
}

export default ArchiveDetail;
