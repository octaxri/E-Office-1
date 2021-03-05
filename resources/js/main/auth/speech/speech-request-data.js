import React, { Fragment, useState, useEffect } from 'react';
import Axios from 'axios';
import { withRouter, useHistory, useParams } from 'react-router-dom';

import Navigation from '../../../navs/navigation/navigation';
import ModalSuccess from '../../../components/modal/modal-success';
import useModal from '../../../components/modal/hook-modal';
import Auth from '../../../navs/auth/Auth';
import setActiveSidebar from '../../../navs/auth/hook-auth';
import Navbar from '../../../navs/Navbar';
import Fade from 'react-reveal/Fade';
import Waiting from '../../../components/waiting/waiting';
import Overlay from '../../../components/loading-overlay/overlay';
import useOverlay from '../../../components/loading-overlay/state';
import PdfContainer from './pdf-container';
import moment from 'moment';
import ReqReceiverContainer from './document-request-component/request-receiver-container';

const SpeechRequestData = (props) => {
    moment.locale('en')

    let [receiverList, setReceiverList] = useState([]);
    let [speechRequestData, setSpeechRequestData] = useState([]);
    let [speechRequestLogData, setSpeechRequestLogData] = useState([]);
    let [ready, setReady] = useState(false);
    let [overlayActive, setOverlayActive] = useState(false);
    let [textSearch, setTextSearch] = useState('');
    let [loadState, setLoadState] = useState('');

    let data = speechRequestData;
    let uri = '/argon/speech-request/';
    let {id} = useParams();

    const handleChangeFilter = (event) => {
        var text = event.target.value // input search
        setTextSearch(text)
    }

    useEffect(() => {
        setActive(9);
        getData()
    }, [id]);

    const getData = async () => {
        await Axios.get('/api/speech-request/data/?id=' + id)
            .then(res => { setSpeechRequestData(res.data), setLoadState('document request') })

        await Axios.get("/api/speech-request/send-to")
            .then(res =>{ setReceiverList(res.data), setLoadState('receiver')});

        await Axios.post('/api/speech-request/log?id=' + id)
            .then(res => {setSpeechRequestLogData(res.data), setLoadState('request history')});

        setReady(true);
    }

    const renderMainContent = () => {
        return(
            <Fragment>
                <div className="col-lg-8 my-2 mx-0" key={data.id}>
                    <div className="card border-0">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-auto">
                                    <i className="mt-2 fas fa-list fa-2x px-2 py-2 bg-darker text-white my-auto rounded"></i>
                                </div>
                                <div className="col">
                                    <small className="text-uppercase ls-2 font-weight-600 text-yellow-calm" style={{fontSize: '0.7em'}}>data</small>
                                    <h2 className="text-darker mt--1">Request Document Detail</h2>
                                </div>
                            </div>
                            {renderTabContent()}
                        </div>
                    </div>
                </div>
                <ReqReceiverContainer
                    id={id}
                    receiverList={receiverList}
                    textSearch={textSearch}
                    toggle={toggle}
                    response={(data)=>response(data)}
                    message={(data)=>message(data)}
                    active={(data)=>active(data)}
                    OverlayActive={(data)=>overlayActive(data)}
                    overlayMessage={(data)=>overlayMessage(data)}
                    handleChangeFilter={(data)=>handleChangeFilter(data)}
                />
            </Fragment>
        );
    }

    const renderDataContent = () => {
        // console.log(speechRequestData)
        return(
            <Fragment>
            <div className="row">
                <div className="col">

                    <small className="text-yellow-calm text-uppercase ls-2 font-weight-600" style={{fontSize: '0.6em'}}>sender:</small>
                    <div className="row my-2">
                        <div className="col-1 align-content-center">
                            { data.sender.profile ?
                                <img className="avatar-xs rounded-circle" alt="Image placeholder" src={`/argon/img/profile/${data.sender.profile.profile_pic_url}`}/> :
                                <img className="avatar-xs rounded-circle" alt="Image placeholder" src="/argon/img/profile/default.jpg"/>
                            }
                        </div>
                        <div className="col">
                            <p className="text-darker mb-0 font-weight-600">{data.sender.name}</p>
                            { data.sender.occupation
                                ?
                                    <small className="text-white text-uppercase ls-1 bg-darker px-1 py-1" style={{fontSize: '0.6em'}}>{data.sender.occupation.occupation_data.name}</small>
                                :
                                    ''
                            }
                        </div>
                    </div>
                    {/* <p className="text-darker font-weight-600">{data.sender.name}</p>
                    { data.sender.occupation
                        ?
                            <small className="text-muted text-uppercase ls-1" style={{fontSize: '0.6em'}}>{data.sender.occupation.occupation_data.name}</small>
                        :
                            ''
                    } */}
                    <br/>

                    <small className="text-yellow-calm text-uppercase ls-2 font-weight-600" style={{fontSize: '0.6em'}}>receiver :</small>
                    <div className="row my-2">
                        <div className="col-1 align-content-center">
                            { data.receiver.profile ?
                                <img className="avatar-xs rounded-circle" alt="Image placeholder" src={`/argon/img/profile/${data.receiver.profile.profile_pic_url}`}/> :
                                <img className="avatar-xs rounded-circle" alt="Image placeholder" src="/argon/img/profile/default.jpg"/>
                            }
                        </div>
                        <div className="col">
                            <p className="text-darker mb-0 font-weight-600">{data.receiver.name}</p>
                            { data.receiver.occupation
                                ?
                                    <small className="text-white text-uppercase ls-1 bg-darker px-1 py-1" style={{fontSize: '0.6em'}}>{data.receiver.occupation.occupation_data.name}</small>
                                :
                                    ''
                            }
                        </div>
                    </div>
                    {/* <p className="mb-0 text-darker font-weight-600">{data.receiver.name}</p>
                    { data.receiver.occupation
                        ?
                            <small className="text-white text-uppercase ls-1 bg-darker px-1 py-1" style={{fontSize: '0.6em'}}>{data.receiver.occupation.occupation_data.name}</small>
                        :
                            ''
                    } */}
                    <br/>
                </div>
                <div className="col">
                    <small className="text-yellow-calm text-uppercase ls-2 font-weight-600" style={{fontSize: '0.6em'}}>subject:</small>
                    <p className="text-darker font-weight-600">{data.theme}</p><br/>

                    <small className="text-yellow-calm text-uppercase ls-2 font-weight-600" style={{fontSize: '0.6em'}}>request detail:</small>
                    <p className="text-darker font-weight-600">{data.event}</p><br/>
                </div>
            </div>
            <hr className="bg-gradient-gray"/>
            <div className="row">
                <div className="col-lg-6 col-sm-12">
                    <h4 className="text-yellow-calm text-uppercase ls-2">sender <span className="text-darker ls-1">message :</span></h4>
                    <div className="d-inline-flex">
                            {
                                data.sender.profile ?
                                <img className="avatar-xs rounded-circle" alt="Image placeholder" src={`/argon/img/profile/${data.sender.profile.profile_pic_url}`}/> :
                                <img className="avatar-xs rounded-circle" alt="Image placeholder" src="/argon/img/profile/default.jpg"/>
                            }
                            <small className="text-darker font-weight-600">&emsp;{data.sender.name} :</small><br/>
                        <p className="text-darker">{data.message ? <>&mdash;{data.message}</> : <>-</>}</p>
                    </div>
                </div>
                <div className="col-lg-6 col-sm-12">
                    <h4 className="text-yellow-calm text-uppercase ls-2">date <span className="text-darker ls-1">received :</span></h4>
                    <p className="text-darker font-weight-500">{moment(data.created_at).format('LLLL')}</p><br/>
                </div>
            </div>
            <hr className="bg-gradient-gray"/>
            <div className="row mt-3 justify-content-center" >
                <div className="col-lg-12 col-sm-12">
                    <PdfContainer
                        isDataExist={data.speech_request_file}
                        pdfLoadMessage={'preparing pdf file'}
                        url={uri + `${data.speech_request_file.file_name}`}
                        noDataMessage='no official request document attached'
                    />
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
                                <h3 className="ls-2 text-uppercase text-darker text-left">detail</h3>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-2-tab" data-toggle="tab" href="#tabs-icons-text-2" role="tab" aria-controls="tabs-icons-text-2" aria-selected="false">
                                <h3 className="ls-2 text-uppercase text-darker text-left">history</h3>
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

    const {isShowing, toggle, response, isSuccess, message, isMessage} = useModal()
    const {setActive, menuIsActive} = setActiveSidebar()
    const { isActive, active, isOverlayMessage, overlayMessage} = useOverlay()

    return (
        <Fragment>
            <ModalSuccess isShowing={isShowing} hide={toggle} response={isSuccess} message={isMessage}/>
            {/* <LoadingOverlay active={overlayActive} spinner={<Lottie options={defaultOptions} height={120} width={120} />} text='MEMPROSES DATA'> */}
            <Overlay
                showing={isActive}
                message={isOverlayMessage}
                children={
                    <Fragment>
                    <Auth active={menuIsActive}/>
                    <div className="main-content">
                        <Navbar/>
                        <div className="container-p-0">
                        {
                            ready === false
                            ?
                            <Waiting message={'getting the page ready'} loadingMessage={loadState}/>
                            :
                            <Fragment>
                                <div className="header pt-md-7 pt-lg-6" ></div>
                                <Navigation />
                                <div className="row px-0 bg-white">
                                    {renderMainContent()}
                                </div>
                            </Fragment>
                        }
                        </div>
                    </div>
                    </Fragment>
                }
                />
            {/* </LoadingOverlay> */}
        </Fragment>
    );

}

export default withRouter(SpeechRequestData);
