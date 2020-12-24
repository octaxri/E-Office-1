import React, { Fragment, useState, useEffect } from 'react';
import Axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';
import FadeIn from 'react-fade-in';
import Lottie from 'react-lottie';

import Navigation from '../../navs/navigation/navigation';
import * as loading from "../../components/loading.json"
import ModalSuccess from '../../components/modal/modal-success';
import useModal from '../../components/modal/hook-modal';

const test = (props) => {
    let [receiverList, setReceiverList] = useState([]);
    let [users, setUsers] = useState([]);
    let [speechRequestData, setSpeechRequestData] = useState([]);
    let [ready, setReady] = useState(false);
    let [overlayActive, setOverlayActive] = useState(false);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loading.default,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setReady(true);
        }, 2000);

        Axios.post('/api/speech-request/data/?id=' + props.location.id)
         .then(res => setSpeechRequestData(res.data))

        Axios
          .get("/api/speech-request/send-to")
          .then(response => setUsers(response.data));
    }, []);

    const renderMainContent = () => {
        let data = speechRequestData;
        let uri = '/argon/speech-request/';
        return(
            <Fragment>
                <div className="col-lg-8 my-2" key={data.id}>
                    <div className="card">
                        <div className="card-header">
                            <small className="text-muted text-uppercase ls-2" style={{fontSize: '0.7em'}}>data</small>
                            <h2 className="text-darker">Data Pengajuan Pidato</h2>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <small className="text-muted text-uppercase ls-2" style={{fontSize: '0.6em'}}>Tema pidato:</small>
                                    <p className="text-darker font-weight-600">{data.theme}</p><br/>

                                    <small className="text-muted text-uppercase ls-2" style={{fontSize: '0.6em'}}>Acara saat pidato digunakan:</small>
                                    <p className="text-darker font-weight-600">{data.event}</p><br/>
                                </div>
                                <div className="col">
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
                                            <small className="text-muted text-uppercase ls-1" style={{fontSize: '0.6em'}}>{data.receiver.occupation.occupation_data.name}</small>
                                        :
                                            ''
                                    }<br/>
                                </div>
                            </div>
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
                                                    allowfullscreen
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
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="row">
                        <div className="card bg-dark">
                            <div className="card-header bg-darker">
                                <small className="text-white ls-2 text-uppercase">disposisikan kepada :</small>
                            </div>
                            <div className="card-body px-4 py-3" style={{height: '60vh', overflowY:'auto'}}>
                                {renderReceiver()}
                            </div>
                            <div className="card-footer bg-darker px-2">
                                <button type="submit" className="btn btn-white btn-block" disabled={this.state.submitActive == false ? true : false}>
                                    <span className="text-uppercase ls-2">disposisi</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }

    const renderReceiver = () => {
        return(
            users.map(receiver => (
                <label key={receiver.user_id} className="card-lift-sm--hover mb-3" style={{width:'100%'}}>
                    <input type="radio" name="to" className="card-input-element-outline" value={receiver.user_id}/>
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

    const {isShowing, toggle} = useModal();

    return (
        <Fragment>
            <LoadingOverlay active={overlayActive} spinner={<Lottie options={defaultOptions} height={120} width={120} />} text='MEMPROSES DATA'>
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
                        {/* {renderReceiver()} */}
                            {renderMainContent()}
                        </div>
                    </Fragment>
                }
                <button className="btn btn-default" onClick={toggle}>Show Modal</button>
                <ModalSuccess
                    isShowing={isShowing}
                    hide={toggle}
                />
                </div>
            </LoadingOverlay>
        </Fragment>
    );

}

export default test;
