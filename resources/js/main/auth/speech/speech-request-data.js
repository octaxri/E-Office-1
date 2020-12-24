import React, { Fragment, useState, useEffect } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import FadeIn from 'react-fade-in';
import Lottie from 'react-lottie';
import Axios from 'axios';
import { withRouter, useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Navigation from '../../../navs/navigation/navigation';
import * as loading from "../../../components/loading.json"
import ModalSuccess from '../../../components/modal/modal-success';
import useModal from '../../../components/modal/hook-modal';
import Auth from '../../../navs/auth/Auth';
import setActiveSidebar from '../../../navs/auth/hook-auth';
import Navbar from '../../../navs/Navbar';

const SpeechRequestData = (props) => {
    let [receiverList, setReceiverList] = useState([]);
    let [speechRequestData, setSpeechRequestData] = useState([]);
    let [speechRequestLogData, setSpeechRequestLogData] = useState([]);
    let [ready, setReady] = useState(false);
    let [overlayActive, setOverlayActive] = useState(false);
    let [submitActive, setSubmitActive] = useState(false);
    let [textSearch, setTextSearch] = useState('');
    let history = useHistory();

    let data = speechRequestData;
    let uri = '/argon/speech-request/';
    let {id} = useParams();

    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        setOverlayActive(true)
            Axios.post('/api/speech-request/dispatch-request', data)
                .then(res => {
                    res.data.success ?
                    setTimeout(() => {
                        setOverlayActive(false);
                        toggle(), response(true), message(res.data.success)
                        setTimeout(() => {
                            history.push('/speech-request/all-request')
                        }, 2000)
                    }, 2000) :
                    // console.log(res.data);
                    setTimeout(() => {
                        console.log(data)
                        setOverlayActive(false);
                        response(false), toggle(), message(res.data.error)
                    }, 2000)
                })
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loading.default,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
    };

    const handleChangeFilter = (event) => {
        var text = event.target.value // input search
        setTextSearch(text)
    }

    useEffect(() => {
        setActive(9);
        setTimeout(() => {
            setReady(true);
        }, 2000);

        Axios.get('/api/speech-request/data/?id=' + id)
            .then(res => { setSpeechRequestData(res.data) })

        Axios.get("/api/speech-request/send-to")
            .then(res => setReceiverList(res.data));

        Axios.post('/api/speech-request/log?id=' + id)
            .then(res => setSpeechRequestLogData(res.data));

    }, [id]);

    const renderMainContent = () => {
        return(
            <Fragment>
                <div className="col-lg-8 my-2" key={data.id}>
                    <div className="row">
                        <div className="col-auto">
                            <i className="mt-2 fas fa-list fa-2x px-2 py-2 bg-darker text-white my-auto rounded"></i>
                        </div>
                        <div className="col">
                            <small className="text-muted text-uppercase ls-2" style={{fontSize: '0.7em'}}>data</small>
                            <h2 className="text-darker mt--1">Data Pengajuan Pidato</h2>
                        </div>
                    </div>
                    <div className="card shadow">
                        <div className="card-body">
                            {renderTabContent()}
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-10">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="card bg-dark">
                                <div className="card-header bg-darker">
                                    <small className="text-white ls-2 text-uppercase">disposisikan kepada :</small>
                                        <div className="my-2" key="2">
                                            <input className="material-input-inverse bg-dark" type="text" name="search" placeholder="Cari User..." onChange={()=>handleChangeFilter(event)}/>
                                            <span className="highlight-inverse"></span>
                                            <span className="bar-inverse"></span>
                                        </div>
                                </div>
                                <input type="hidden" name="id" value={id} ref={register}/>
                                <div className="card-body px-4 py-3" style={{height: '70vh', overflowY:'auto'}}>
                                    {renderReceiver()}
                                </div>
                                <div className="card-footer bg-darker px-2">
                                    <textarea className="form-control bg-dark my-2" name="message" rows="3" placeholder="Pesan Anda" ref={register}></textarea>
                                    <button type="submit" className="btn btn-success btn-block" disabled={submitActive == false ? true : false}>
                                        <span className="text-uppercase text-white ls-2">disposisi</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                </div>
            </Fragment>
        );
    }

    const renderDataContent = () => {
        // console.log(speechRequestData)
        return(
            <Fragment>
            <div className="row">
                <div className="col">
                    <small className="text-muted text-uppercase ls-2" style={{fontSize: '0.6em'}}>requester:</small>
                    <p className="text-darker font-weight-600">{data.origin.name}</p>
                    { data.origin.occupation
                        ?
                            <small className="text-muted text-uppercase ls-1" style={{fontSize: '0.6em'}}>{data.origin.occupation.occupation_data.name}</small>
                        :
                            ''
                    }<br/>

                    <small className="text-muted text-uppercase ls-2" style={{fontSize: '0.6em'}}>pengirim:</small>
                    <p className="text-darker font-weight-600">{data.sender.name}</p>
                    { data.sender.occupation
                        ?
                            <small className="text-muted text-uppercase ls-1" style={{fontSize: '0.6em'}}>{data.sender.occupation.occupation_data.name}</small>
                        :
                            ''
                    }<br/>

                    <small className="text-muted text-uppercase ls-2" style={{fontSize: '0.6em'}}>penerima :</small>
                    <p className="mb-0 text-darker font-weight-600">{data.receiver.name}</p>
                    { data.receiver.occupation
                        ?
                            <small className="text-white text-uppercase ls-1 bg-darker px-1 py-1" style={{fontSize: '0.6em'}}>{data.receiver.occupation.occupation_data.name}</small>
                        :
                            ''
                    }<br/>
                </div>
                <div className="col">
                    <small className="text-muted text-uppercase ls-2" style={{fontSize: '0.6em'}}>Tema pidato:</small>
                    <p className="text-darker font-weight-600">{data.theme}</p><br/>

                    <small className="text-muted text-uppercase ls-2" style={{fontSize: '0.6em'}}>Acara saat pidato digunakan:</small>
                    <p className="text-darker font-weight-600">{data.event}</p><br/>
                </div>
            </div>
            <hr className="bg-gradient-gray"/>
            <div className="row mt-3 justify-content-center" >
                <div className="col-lg-12 col-sm-12">
                    <small className="text-muted text-uppercase ls-2" style={{fontSize: '0.6em'}}>Dokumen pelengkap :</small><br/>
                    { data.speech_request_file
                        ?
                            <div className="embed-responsive embed-responsive-16by9">
                                <iframe
                                    className="embed-responsive-item"
                                    key={uri + `${data.speech_request_file.file_name}`}
                                    src={uri + `${data.speech_request_file.file_name}` + '#toolbar=0&navpanes=0&zoom=50'}
                                    allowFullScreen
                                    frameBorder="0">
                                </iframe>
                            </div>
                        :
                            <Fragment>
                                <img className="img-fluid my-3" src="/argon/img/background/pdf.svg" alt="" style={{width:'100px', height:'140px'}} />
                                <small className="text-muted text-uppercase ls-1 text-center" style={{fontSize: '0.6em'}}> <i> pengajuan ini tidak disertai dokumen pelengkap</i></small><br/>
                            </Fragment>
                    }<br/>
                </div>
            </div>
            </Fragment>
        )
    }

    const renderTabContent = () => {
        return(
            <Fragment>
                <div className="nav-wrapper">
                    <ul className="nav nav-pills-ct" id="tabs-icons-text" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link mb-sm-3 mb-md-0 active" id="tabs-icons-text-1-tab" data-toggle="tab" href="#tabs-icons-text-1" role="tab" aria-controls="tabs-icons-text-1" aria-selected="true">
                                <h3 className="ls-2 text-uppercase text-darker">detail</h3>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-2-tab" data-toggle="tab" href="#tabs-icons-text-2" role="tab" aria-controls="tabs-icons-text-2" aria-selected="false">
                                <h3 className="ls-2 text-uppercase text-darker">riwayat</h3>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="tabs-icons-text-1" role="tabpanel" aria-labelledby="tabs-icons-text-1-tab">
                        {renderDataContent()}
                    </div>
                    <div className="tab-pane fade" id="tabs-icons-text-2" role="tabpanel" aria-labelledby="tabs-icons-text-2-tab">
                        {renderLogContent()}
                    </div>
                </div>
            </Fragment>
        )
    }

    const renderLogContent = () => {
        return(
            <Fragment>
                <h2>Log Data</h2>
                {
                    speechRequestLogData.map(log => (
                        <Fragment key={log.id}>
                            <div className="card shadow">
                                <h2>{log.sender.name}</h2>
                            </div>
                        </Fragment>
                    ))
                }
            </Fragment>
        )
    }

    const renderReceiver = () => {
        return(
            receiverList.filter(user => user.user_data.name.includes(textSearch)).map(receiver => (
                <label key={receiver.user_id} className="card-lift-sm--hover mb-3" style={{width:'100%'}}>
                    <input type="radio" name="to" className="card-input-element-outline" value={receiver.user_id} ref={register} onChange={e => setSubmitActive(true)}/>
                        <div className="card card-input">
                            <div className="container">
                                <div className="row my-2">
                                    <div className="col my-auto">
                                        <div className="row">
                                            <div className="col-auto">
                                                <img className="avatar-sm rounded-circle" alt="Image placeholder" src="/argon/img/theme/team-4-800x800.jpg"/>
                                            </div>
                                            <div className="col">
                                                <span style={{fontSize: '1em'}}>{receiver.user_data.name}</span><br/>
                                                <span className="text-muted text-uppercase ls-2" style={{fontSize: '0.6em'}}>{receiver.role_data.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                <div className="col-auto icon text-center"></div>
                            </div>
                        </div>
                    </div>
                </label>
            ))
        )
    }

    const {isShowing, toggle, response, isSuccess, message, isMessage} = useModal();
    const {setActive, menuIsActive} = setActiveSidebar()

    return (
        <Fragment>
            <ModalSuccess isShowing={isShowing} hide={toggle} response={isSuccess} message={isMessage}/>
            <LoadingOverlay active={overlayActive} spinner={<Lottie options={defaultOptions} height={120} width={120} />} text='MEMPROSES DATA'>
                <Auth active={menuIsActive}/>
                <div className="main-content">
                    <Navbar/>
                    <div className="header pt-md-7 pt-lg-7" ></div>
                        <div className="container-fluid py-4">
                        {
                        ready === false
                        ?
                            <FadeIn>
                                <h3 className="text-center text-dark text-uppercase ls-2 pt-md-7">Menyiapkan Data</h3>
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
            </LoadingOverlay>
        </Fragment>
    );

}

export default withRouter(SpeechRequestData);
