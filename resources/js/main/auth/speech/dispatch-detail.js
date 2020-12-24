import React, { Fragment, useState, useEffect } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import FadeIn from 'react-fade-in';
import Lottie from 'react-lottie';
import Axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Navigation from '../../../navs/navigation/navigation';
import * as loading from "../../../components/loading.json"
import ModalSuccess from '../../../components/modal/modal-success';
import useModal from '../../../components/modal/hook-modal';
import Auth from '../../../navs/auth/Auth';
import setActiveSidebar from '../../../navs/auth/hook-auth';
import Redirect from '../../../components/error/redirect';
import { connect } from 'react-redux';
import moment from 'moment';
import useErrorBoundary from 'use-error-boundary';
import ErrorPage from '../../../components/error/error';
import Navbar from '../../../navs/Navbar';

const DispatchDetail = (props) => {
    moment.locale('id');

    let {id} = useParams();
    let [errorMessage, setErrorMessage]         = useState([]);
    let [receiverList, setReceiverList]         = useState([]);
    let [dispatchData, setDispatchData]         = useState([]);
    let [dispatchLogData, setDispatchLogData]   = useState([]);
    let [fileListData, setFileListData]         = useState([]);
    let [ready, setReady]                       = useState(false);
    let [overlayActive, setOverlayActive]       = useState(false);
    let [submitActive, setSubmitActive]         = useState(false);
    let [file, setFile]                         = useState();
    // let [id, setId]                             = useState(true);
    let [fileName, setFileName]                 = useState(true);
    let [permissions, setPermissionData]        = useState([]);
    let [returnTo, setReturnToData]             = useState([]);
    let [textSearch, setTextSearch]             = useState('');
    let history                                 = useHistory();

    let speech      = dispatchData.speech_data;
    let mainFile    = dispatchData.speech_main_file;
    let request     = dispatchData.speech_request;

    let uri         = '/argon/speech-request/';
    let uriMain     = '/argon/speech/';
    let uriSigned   = '/argon/speech/signed/';

    const { register, handleSubmit } = useForm();

    //Return Form
    const { register: returnData, handleSubmit: handleReturn } = useForm();

    const onDispatch = (data) => {
        let formData = new FormData();
        formData.append('id', data.id);
        formData.append('to', data.to);
        formData.append('order', data.order);
        formData.append('message', data.message);
        formData.append('file', file);

        // console.log(data)
        setOverlayActive(true)
            Axios.post('/api/dispatch/dispatch-forward' , formData)
                .then(res => {
                    res.data.success ?
                    setTimeout(() => {
                        setOverlayActive(false);
                        toggle(), response(true), message(res.data.success)
                        setTimeout(() => {
                            history.push('/dispatch');
                        }, 2000)
                    }, 2000)
                    :
                    setTimeout(() => {
                        setOverlayActive(false);
                        response(false), toggle(), message(res.data.error)
                    }, 2000)
                })
    };

    const onReturn = (returnData) => {
        setOverlayActive(true)
            Axios.post('/api/dispatch/dispatch-backward' , returnData)
                .then(res => {
                    res.data.success ?
                    setTimeout(() => {
                        setOverlayActive(false);
                        toggle(), response(true), message(res.data.success)
                        setTimeout(() => {
                            history.push('/dispatch');
                        }, 2000)
                    }, 2000)
                    :
                    setTimeout(() => {
                        setOverlayActive(false);
                        response(false), toggle(), message(res.data.error)
                    }, 2000)
                })
                // console.log(returnData)
    };

    const onSign = async (signData) => {
        // console.log(signData)
        setOverlayActive(true)
            await Axios.post('/api/sign/sign-speech', signData)
                .then(res => {
                    res.data.success ?
                    setTimeout(() => {
                        setOverlayActive(false);
                        toggle(), response(true), message(res.data.success)
                        setTimeout(() => {
                            history.push('/dispatch');
                        }, 2000)
                    }, 2000)
                    :
                    setTimeout(() => {
                        setOverlayActive(false);
                        response(false), toggle(), message(res.data.error)
                        console.log(res.data.error)
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

    const onFileChange = (event) => {
        setFile(event.target.files[0]);
        setFileName(event.target.files[0].name)
        // console.log(event.target.files[0].name)
    }

    const handleChangeFilter = (event) => {
        var text = event.target.value // input search
        setTextSearch(text)
    }

    useEffect(() => {
        setActive(6);
        callData();
        // props.match.params.id ? callData() : setId(false)
        // speechId ? callData() : setId(false)
    }, [id]);

    const callData = async () => {
        await Axios.post('/api/dispatch/detail?id=' + id)
            .then(res => {
                setDispatchData(res.data)
            })
            .catch(error => {
                setErrorMessage(error.response.data), console.log(error.response.data.error), setReady(true)
            })

        await Axios.get("/api/dispatch/send-to?id=" + id)
            .then(res => setReceiverList(res.data))

        await Axios.post('/api/dispatch/log?id=' + id)
            .then(res => setDispatchLogData(res.data))

        await Axios.get('/api/permission-data')
            .then(res => {setPermissionData(res.data)})

        await Axios.get('/api/dispatch/send-back-to?id=' + id)
            .then(res => setReturnToData(res.data))

        await Axios.get('/api/dispatch/file-list', {params : {id : id}})
            .then(res => {setFileListData(res.data), console.log(res.data)})

        setReady(true);
    }

    const RenderMainContent = () => {
        return(
            <Fragment>
                <div className="row">
                    <div className="col-lg-8 my-2">
                        <div className="row">
                            <div className="col-auto">
                                <i className="mt-2 fas fa-list fa-2x px-2 py-2 bg-darker text-white my-auto rounded"></i>
                            </div>
                            <div className="col">
                                <small className="text-muted text-uppercase ls-2" style={{fontSize: '0.7em'}}>data</small>
                                <h2 className="text-darker mt--1">Data Pengajuan Pidato</h2>
                            </div>
                        </div>
                        <div className="card shadow-custom">
                            <div className="card-body">
                                {errorMessage.error ? null : renderTabContent()}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-12">
                        { receiverList.sign_allowed === 1 ? signForm() : dispatchForm() }
                        { returnTo.error || errorMessage.error ? null : returnForm()}
                    </div>
                </div>
            </Fragment>
        )
    }

    const returnForm = () => {
        return (
            <Fragment>
                <form onSubmit={handleReturn(onReturn)}>
                    <div className="container justify-content-center">
                        <p className="text-uppercase ls-2 font-weight-600 my-4 text-darker text-center">atau</p>
                    </div>
                    <div className="card bg-dark">
                        <div className="card-header bg-darker">
                            <small className="text-white ls-2 text-uppercase">kembalikan kepada :</small>
                        </div>
                        <input type="hidden" name="id" value={id} ref={returnData}/>
                        <input type="hidden" name="order" value={receiverList.current_order} ref={returnData}/>
                        <input type="hidden" name="to" value={returnTo.user_id} ref={returnData}/>
                        <div className="card-body">
                            <div className="row">
                                <div className="col d-inline-flex">
                                    <img className="avatar-xs rounded-circle" alt="Image placeholder" src="/argon/img/theme/team-4-800x800.jpg"/>
                                    <p className="text-white mb-0 font-weight-600">&nbsp;{returnTo.user_data.name}</p>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer bg-darker px-2">
                        <textarea className="form-control bg-dark my-2" name="message" rows="3" placeholder="Alasan dokumen dikembalikan" ref={returnData}></textarea>
                            <button type="submit" className="btn btn-white btn-block">
                                <span className="text-uppercase ls-2">kembalikan</span>
                            </button>
                        </div>
                    </div>
                </form>
            </Fragment>
        )
    }

    const dispatchForm = () => {
        return(
            <Fragment>
                <form onSubmit={handleSubmit(onDispatch)}>
                    <div className="card bg-dark">
                        <div className="card-header bg-darker">
                            <small className="text-white ls-2 text-uppercase">disposisikan kepada :</small>
                                <div className="my-2" key="2">
                                    <input className="material-input-inverse bg-dark" type="text" name="search" placeholder="Cari User..." onChange={() => handleChangeFilter(event) }/>
                                    <span className="highlight-inverse"></span>
                                    <span className="bar-inverse"></span>
                                </div>
                        </div>
                        <input type="hidden" name="id" value={id} ref={register}/>
                        <input type="hidden" name="order" value={receiverList.current_order} ref={register}/>
                        <div className="card-body px-4 py-3" style={{minHeight: '20vh', maxHeight: '70vh', overflowY:'auto'}}>
                            { speech.is_true === 1 ? renderOriginReceiver() : renderReceiver()}
                        </div>

                        <div className="card-footer bg-darker px-2">
                            {uploadPDF()}
                            <textarea className="form-control bg-dark my-2" name="message" rows="3" placeholder="Pesan Anda" ref={register}></textarea>
                            {
                                receiverList.sign_allowed === 1 ?
                                <button type="submit" className="btn btn-success text-white btn-block" disabled={submitActive == false ? true : false}>
                                    <span className="text-uppercase ls-2">tanda tangan & disposisi</span>
                                </button>
                                :
                                <button type="submit" className="btn btn-success text-white btn-block" disabled={submitActive == false ? true : false}>
                                    <span className="text-uppercase ls-2">disposisi</span>
                                </button>
                            }
                        </div>
                    </div>
                </form>
            </Fragment>
        )
    }

    const signForm = () => {
        return(
            <Fragment>
                <form onSubmit={handleSubmit(onSign)}>
                    <div className="card bg-dark">
                        <div className="card-header bg-darker">
                            <small className="text-white ls-2 text-uppercase">disposisikan kepada :</small>
                                <div className="my-2" key="2">
                                    <input className="material-input-inverse bg-dark" type="text" name="search" placeholder="Cari User..."/>
                                    <span className="highlight-inverse"></span>
                                    <span className="bar-inverse"></span>
                                </div>
                        </div>
                        <input type="hidden" name="id" value={id} ref={register}/>
                        <input type="hidden" name="order" value={receiverList.current_order} ref={register}/>
                        <div className="card-body px-4 py-3" style={{minHeight: '20vh', maxHeight: '70vh', overflowY:'auto'}}>
                            {
                                speech.is_true && speech.is_true === 1 ? renderOriginReceiver() : renderReceiver()
                            }
                        </div>

                        <div className="card-footer bg-darker px-2">
                            <input className="form-control bg-dark" type="password" name="ca_password" placeholder="input passphrase anda" ref={register} autoComplete="new-password"/>
                            <textarea className="form-control bg-dark my-2" name="message" rows="3" placeholder="Pesan Anda" ref={register}></textarea>
                            <button type="submit" className="btn btn-success text-white btn-block mt-2" disabled={submitActive == false ? true : false}>
                                <span className="text-uppercase ls-2">tanda tangan & disposisi</span>
                            </button>
                        </div>
                    </div>
                </form>
            </Fragment>
        )
    }

    const uploadPDF = () => {
        return(
            <Fragment>
            <div className="row">
                <div className="col d-inline-flex">
                {
                    permissions.filter(permission => permission.permission_id === 9).map(filteredPermission => (
                        filteredPermission ?
                            <Fragment key={filteredPermission.id}>
                                <label class="btn btn-sm btn-outline-white btn-file">
                                    <span className="ls-2 text-uppercase font-weight-600" style={{fontSize:'0.7em'}}><i className="fas fa-file-pdf text-white"></i> Upload</span>
                                    <input ref={register} type="file" name="file" id="file" style={{display:'none'}} onChange={onFileChange}/>
                                </label>
                                { fileName ?
                                    <div className="row">
                                        <div className="col d-inline-flex">
                                            <p className="text-white" style={{fontSize: '0.7em'}}>&nbsp;{fileName}</p>
                                        </div>
                                    </div>
                                : null
                                }
                            </Fragment>
                        :
                        null
                    ))
                }
                </div>
            </div>
            </Fragment>
        )
    }

    const statusBadge = ({color, status, icon}) => {
        return (
            <small className={`${color} py-1 px-2 rounded text-uppercase ls-1 text-white shadow-custom`} style={{fontSize:'0.65em'}}>
                <i className={`${icon}`}></i> {status}
            </small>
        )
    }

    function dispatchType(el) {
        if (el === 1) {
            return ( statusBadge({color:'bg-gradient-success', status :'disposisi maju', icon: 'fas fa-chevron-circle-right'}))
        }
        if ( el === 2) {
            return ( statusBadge({color:'bg-gradient-danger',status:'disposisi mundur', icon: 'fas fa-chevron-circle-left'}))
        }
        if ( el === 3) {
            return ( statusBadge({color:'bg-gradient-primary',status:'dokumen ditanda-tangani', icon: 'fas fa-check'}))
        }
    }

    const renderDataContent = () => {
        // console.log(mainFile);
        return(
            <Fragment>
            { !errorMessage.error ? dispatchType(speech.status) : null }
            <div className="row mt-4">
                <div className="col">
                    <small className="text-muted text-uppercase ls-2" style={{fontSize: '0.6em'}}>requester:</small>
                    <p className="text-darker font-weight-600">{request.origin.name}</p>
                    { request.origin.occupation
                        ?
                            <small className="text-muted text-uppercase ls-1" style={{fontSize: '0.6em'}}>{request.origin.occupation.occupation_data.name}</small>
                        :
                            ''
                    }<br/>

                    <small className="text-muted text-uppercase ls-2" style={{fontSize: '0.6em'}}>penerima (Anda) :</small>
                    <p className="mb-0 text-darker font-weight-600">{speech.receiver.name}</p>
                    { speech.receiver.occupation
                        ?
                            <small className="text-white text-uppercase ls-1 bg-darker px-1 py-1" style={{fontSize: '0.6em'}}>{speech.receiver.occupation.occupation_data.name}</small>
                        :
                            ''
                    }<br/><br/>

                    <small className="text-muted text-uppercase ls-2" style={{fontSize: '0.6em'}}>pengirim:</small>
                    <div className="row my-2">
                        <div className="col-1 align-content-center">
                            { speech.sender.profile ?
                                <img className="avatar-xs rounded-circle" alt="Image placeholder" src={`/argon/img/profile/${speech.sender.profile.profile_pic_url}`}/> :
                                <img className="avatar-xs rounded-circle" alt="Image placeholder" src="/argon/img/profile/default.jpg"/>
                            }
                        </div>
                        <div className="col">
                            <p className="text-darker mb-0 font-weight-600">{speech.sender.name}</p>
                            { speech.sender.occupation
                                ?
                                    <small className="text-white text-uppercase ls-1 bg-darker px-1 py-1" style={{fontSize: '0.6em'}}>{speech.sender.occupation.occupation_data.name}</small>
                                :
                                    ''
                            }
                        </div>
                    </div>

                </div>
                <div className="col">
                    <small className="text-muted text-uppercase ls-2" style={{fontSize: '0.6em'}}>Tema pidato:</small>
                    <p className="text-darker font-weight-600">{request.theme}</p><br/>

                    <small className="text-muted text-uppercase ls-2" style={{fontSize: '0.6em'}}>Acara saat pidato digunakan:</small>
                    <p className="text-darker font-weight-600">{request.event}</p><br/>

                    <div className="speech-bubble px-3 mt-4">
                        <small className="text-uppercase text-white ls-2" style={{fontSize: '0.6em'}}>pesan:</small>
                        <p className="text-white font-weight-500">{speech.message}</p>
                    </div>
                </div>
            </div>
            <hr className="bg-gradient-gray"/>
            <div className="row mt-3 justify-content-center" >
                <div className="col-lg-12 col-sm-12">
                    <small className="text-muted text-uppercase ls-2" style={{fontSize: '0.6em'}}>File Pidato Diupload :</small><br/>
                    { mainFile
                        ?
                            <Fragment>
                                <div className="row my-3">
                                    <div className="col d-inline-flex">
                                        { mainFile.speech_uploader.profile && mainFile.speech_uploader.profile.profile_pic_url ?
                                            <img className="avatar-xs rounded-circle" alt="Image placeholder" src={`/argon/img/theme/${mainFile.speech_uploader.profile.profile_pic_url}`}/> :
                                            <img className="avatar-xs rounded-circle" alt="Image placeholder" src="/argon/img/theme/team-4-800x800.jpg"/>
                                        }
                                        <p className="text-darker mb-0 font-weight-600">
                                            &nbsp;{mainFile.speech_uploader.name}
                                            &nbsp;<small className="text-muted" style={{fontSize:'0.7em'}}>{moment(mainFile.created_at).fromNow()}</small>
                                        </p>
                                    </div>
                                </div>

                                    {
                                        mainFile.signed === 1 ?
                                        <div className="row">
                                            <div className="col">
                                            <p className="font-weight-600 text-muted">Preview dan Akses URL tidak diperbolehkan.</p>
                                                <a href={uriSigned + `${mainFile.file_name}`} target="_blank" rel="noopener noreferrer" download>
                                                    <button className="btn btn-darker text-white">
                                                        <i className="fas fa-download"/> Download PDF
                                                    </button>
                                                </a>
                                            </div>
                                        </div>
                                        :
                                        <div className="embed-responsive embed-responsive-16by9">
                                            <iframe
                                                className="embed-responsive-item"
                                                key={uriMain + `${mainFile.file_name}`}
                                                src={uriMain + `${mainFile.file_name}` + '#toolbar=0&navpanes=0&zoom=50'}
                                                allowFullScreen
                                                frameBorder="0">
                                            </iframe>
                                        </div>
                                    }
                            </Fragment>
                        :
                            <Fragment>
                                <img className="img-fluid my-3" src="/argon/img/background/pdf.svg" alt="" style={{width:'100px', height:'140px'}} />
                                <small className="text-darker text-uppercase ls-1 text-center font-weight-600" style={{fontSize: '0.7em'}}> <i> file pidato masih belum diupload</i></small><br/>
                            </Fragment>
                    }<br/>
                    <hr className="bg-gradient-gray"/>
                    <small className="text-muted text-uppercase ls-2" style={{fontSize: '0.6em'}}>Dokumen pelengkap :</small><br/>
                    { request.speech_request_file
                        ?
                            <div className="embed-responsive embed-responsive-16by9">
                                <iframe
                                    className="embed-responsive-item"
                                    key={uri + `${request.speech_request_file.file_name}`}
                                    src={uri + `${request.speech_request_file.file_name}` + '#toolbar=0&navpanes=0&zoom=50'}
                                    allowFullScreen
                                    frameBorder="0">
                                </iframe>
                            </div>
                        :
                            <Fragment>
                                <img className="img-fluid my-3" src="/argon/img/background/pdf.svg" alt="" style={{width:'100px', height:'140px'}} />
                                <small className="text-darker text-uppercase ls-1 text-center font-weight-600" style={{fontSize: '0.7em'}}> <i> pengajuan ini tidak disertai dokumen pelengkap</i></small><br/>
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
                        <li className="nav-item">
                            <a className="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-3-tab" data-toggle="tab" href="#tabs-icons-text-3" role="tab" aria-controls="tabs-icons-text-3" aria-selected="false">
                                <h3 className="ls-2 text-uppercase text-darker">revisi</h3>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="tabs-icons-text-1" role="tabpanel" aria-labelledby="tabs-icons-text-1-tab">
                        {!errorMessage.error ? renderDataContent() : null}
                    </div>
                    <div className="tab-pane fade" id="tabs-icons-text-2" role="tabpanel" aria-labelledby="tabs-icons-text-2-tab">
                        {!errorMessage.error ? renderLogContent() : null}
                    </div>
                    <div className="tab-pane fade" id="tabs-icons-text-3" role="tabpanel" aria-labelledby="tabs-icons-text-3-tab">
                        {!errorMessage.error ? renderFileListContent() : null}
                    </div>
                </div>
            </Fragment>
        )
    }

    const renderLogContent = () => {
        return(
            <Fragment>
                <div className="my-3">
                <small className="ls-2 font-weight-500 text-uppercase bg-darker px-1 py-1 rounded text-white">Request</small>
                {
                    dispatchLogData.speech_request_log.map(req => (
                        <Fragment key={req.id}>
                            <div className="card shadow-custom my-2">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="row">
                                                <div className="col-auto">
                                                    <img className="avatar-sm rounded-circle" alt="Image placeholder" src="/argon/img/profile/default.jpg"/>
                                                </div>
                                                <div className="col">
                                                    <p className="text-darker mb-0 font-weight-600">{req.sender_data.name}</p>
                                                    <small className="text-muted text-uppercase ls-1 mt-0" style={{fontSize:'0.6em'}}>
                                                        {req.sender_data.occupation ? req.sender_data.occupation.occupation_data.name : null}&nbsp;
                                                            {(() => {
                                                                if(req.sender_data.field && !req.sender_data.subfield) {
                                                                    return req.sender_data.field.field_data.name
                                                                }
                                                                if(req.sender_data.field && req.sender_data.subfield){
                                                                    return req.sender_data.subfield.subfield_data.name
                                                                }
                                                            })()}
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="row">
                                                <div className="col-auto">
                                                    <img className="avatar-sm rounded-circle" alt="Image placeholder" src="/argon/img/theme/team-4-800x800.jpg"/>
                                                </div>
                                                <div className="col">
                                                    <p className="text-darker mb-0 font-weight-600">{req.receiver_data.name}</p>
                                                    <small className="text-muted text-uppercase ls-1 mt-0" style={{fontSize:'0.6em'}}>
                                                        {req.receiver_data.occupation ? req.receiver_data.occupation.occupation_data.name : null}&nbsp;
                                                            {(() => {
                                                                if(req.receiver_data.field && !req.receiver_data.subfield) {
                                                                    return req.receiver_data.field.field_data.name
                                                                }
                                                                if(req.receiver_data.field && req.receiver_data.subfield){
                                                                    return req.receiver_data.subfield.subfield_data.name
                                                                }
                                                            })()}
                                                    </small>
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

                <div className="my-3">
                <small className="ls-2 font-weight-500 text-uppercase bg-darker px-1 py-1 rounded text-white">Disposisi</small>
                {
                    dispatchLogData.speech_log.map(log => (
                        <Fragment key={log.id}>
                            <div className="card my-2 shadow-custom">
                                <div className="card-body py-1">
                                    <div className="row">
                                        <div className="col py-2">
                                            { dispatchType(log.speech_data.status) }
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-lg-6">
                                            <div className="row">
                                                <div className="col-auto">
                                                    { log.sender_data.biography && log.sender_data.biography.profile_pic_url ?
                                                        <img className="avatar-sm rounded-circle" alt="Image placeholder" src={`/argon/img/profile/${log.sender_data.biography.profile_pic_url}`}/>
                                                        :
                                                        <img className="avatar-sm rounded-circle" alt="Image placeholder" src="/argon/img/profile/default.jpg"/>
                                                    }
                                                </div>
                                                <div className="col">
                                                    <p className="text-darker mb-0 font-weight-600">{log.sender_data.name}</p>
                                                    <small className="text-muted text-uppercase ls-1 mt-0" style={{fontSize:'0.6em'}}>
                                                        {log.sender_data.occupation ? log.sender_data.occupation.occupation_data.name : null}&nbsp;
                                                            {(() => {
                                                                if(log.sender_data.field && !log.sender_data.subfield) {
                                                                    return log.sender_data.field.field_data.name
                                                                }
                                                                if(log.sender_data.field && log.sender_data.subfield){
                                                                    return log.sender_data.subfield.subfield_data.name
                                                                }
                                                            })()}
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="row">
                                                <div className="col-auto">
                                                    { log.receiver_data.biography && log.receiver_data.biography.profile_pic_url ?
                                                        <img className="avatar-sm rounded-circle" alt="Image placeholder" src={`/argon/img/profile/${log.receiver_data.biography.profile_pic_url}`}/>
                                                        :
                                                        <img className="avatar-sm rounded-circle" alt="Image placeholder" src="/argon/img/profile/default.jpg"/>
                                                    }
                                                </div>
                                                <div className="col">
                                                    <p className="text-darker mb-0 font-weight-600">{log.receiver_data.name}</p>
                                                    <small className="text-muted text-uppercase ls-1 mt-0" style={{fontSize:'0.6em'}}>
                                                        {log.receiver_data.occupation ? log.receiver_data.occupation.occupation_data.name : null}&nbsp;
                                                            {(() => {
                                                                if(log.receiver_data.field && !log.receiver_data.subfield) {
                                                                    return log.receiver_data.field.field_data.name
                                                                }
                                                                if(log.receiver_data.field && log.receiver_data.subfield){
                                                                    return log.receiver_data.subfield.subfield_data.name
                                                                }
                                                            })()}
                                                    </small>
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

    const renderFileListContent = () => {
        const fileList = () => {
            return fileListData.map((file, key) => (
                <Fragment key={key}>
                    <div className="card shadow-custom my-2">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-1 col-sm-2">
                                    <div>
                                        <h2 className="text-white text-center bg-gradient-teal px-2 py-2 rounded">{key+1}</h2>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <p className="font-weight-500 text-darker">{file.file_name}</p>
                                    <small className="font-weight-500 text-gray py-0"><b>Di-upload</b> :&nbsp;{moment(file.created_at).format('Do MMMM YYYY, h:mm:ss')}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            ))
        }

        return (
            <Fragment>
                {
                    fileListData.length == 0
                    ? <ErrorPage error={'data kosong'}/>
                    : fileList()
                }
            </Fragment>
        )
    }

    const renderReceiver = () => {
        return(
            receiverList.user ?
                receiverList.user.filter(user => user.user_data.name.includes(textSearch)).map(receiver => (
                    receiver.role_id === 1 ?
                        <label key={receiver.user_id} className={"card-lift-sm--hover mb-3 receiver-card"} style={{width:'100%'}}>
                            {receiverContent(receiver)}
                        </label>
                        :
                        receiver.user_data.field ?
                            receiver.user_data.field.field_id === props.user.field.data.field_id
                                ?
                                <label key={receiver.user_id} className={"card-lift-sm--hover mb-3"} style={{width:'100%'}}>
                                    {receiverContent(receiver)}
                                </label>
                                :
                                null
                            :
                            null
                ))
                :
            <p className="text-white text-center">data tidak ditemukan</p>
        )
    }

    const renderOriginReceiver = () => {
        return(
            receiverList.user ?
                receiverList.user.filter(origin => origin.user_id === request.origin.id).map(receiver => (
                    <label key={receiver.user_id} className={"card-lift-sm--hover mb-3"} style={{width:'100%'}}>
                        {receiverContent(receiver)}
                    </label>
                ))
            :
            <p className="text-white text-center">data tidak ditemukan</p>
        )
    }

    const receiverContent = (receiver) => {
        return(
            <Fragment key={receiver.user_id}>
            <input type="radio" name="to" className="card-input-element-outline" value={receiver.user_id} ref={register} onChange={e => setSubmitActive(true)}/>
                <div className="card card-input">
                    <div className="container">
                        <div className="row my-2">
                            <div className="col my-auto">
                                <div className="row">
                                    <div className="col-auto">
                                        { receiver.user_data.profile && receiver.user_data.profile.profile_pic_url ?
                                            <img className="avatar-sm rounded-circle" alt="Image placeholder" src={`/argon/img/profile/${receiver.user_data.profile.profile_pic_url}`}/>
                                            :
                                            <img className="avatar-sm rounded-circle" alt="Image placeholder" src="/argon/img/profile/default.jpg"/>
                                        }
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
            </Fragment>
        )
    }

    const {isShowing, toggle, response, isSuccess, message, isMessage} = useModal();
    const {setActive, menuIsActive} = setActiveSidebar();
    const { ErrorBoundary, didCatch, error } = useErrorBoundary();

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
                                    { errorMessage.error ? (<ErrorPage error={errorMessage.error}/>) : RenderMainContent() }
                            </Fragment>
                        }
                        </div>
                </div>
            </LoadingOverlay>
        </Fragment>
    );

}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        user: state.auth.user
    };
};

export default connect(mapStateToProps)(DispatchDetail);
