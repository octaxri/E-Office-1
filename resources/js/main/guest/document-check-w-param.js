import React, { useState, useContext, useEffect, useCallback, useMemo, Fragment } from 'react';
import Lottie from 'react-lottie';
import Navigation from '../../navs/navigation/navigation';
import * as loading from "../../components/loading.json";
import Axios from 'axios';
import Error from '../../components/error/error';
import { ToastContainer } from 'react-toastify';
import Guest from '../../navs/guest/Guest';
import FadeIn from 'react-fade-in';
import { useParams } from 'react-router';
import moment from 'moment';

const documentCheckWParam = (props) => {
    moment.locale('id');
    let [ready, setReady] = useState(false);
    let [data, setData] = useState([]);
    let [loading, setLoading] = useState(false);

    let {id} = useParams();

    useEffect(() => {
        onCheckDocument()
    }, [])

    const onCheckDocument = async () => {
        setReady(false)
        await Axios.get('/api/guest/document/check?uuid=' + id )
            .then(res => {
                setData(res.data)
            })
            .catch(error => {
                setData(error.response.data)
            })
        setReady(true)
    }

    const renderDataContent = () => {
        return (
            <Fragment>
                <div className="row my-4">
                    <div className="col">
                        { loading === false ?
                            (!data.error ? validDocument() : <Error error={data.error}/>)
                            :
                            <FadeIn>
                                <h3 className="text-center text-dark text-uppercase ls-2 pt-md-7">Menyiapkan Data</h3>
                                <div className="d-flex justify-content-center align-items-center">
                                    <Lottie options={defaultOptions} height={120} width={120} />
                                </div>
                            </FadeIn>
                        }
                    </div>
                </div>
            </Fragment>
        )
    }

    const validDocument = () => {
        const req = data.speech_request;
        return (
            <Fragment>
                <div className="card-body">
                        <div className="row justify-content-center">
                        <div className="col-lg-4">
                            <div className="card bg-darker text-white my-2">
                                <div className="card-body">
                                    <small><b>Perhatian :</b></small>
                                    <ol className="pl-2 my-1" style={{fontSize:'0.7em'}}>
                                        <li>Data yang ditampilkan berikut ini adalah alur dari dokumen yang telah ditanda-tangani oleh Kepala Badan.</li>
                                        <li>Untuk mendownload dokumen, silahkan login sebagai OPD & download melalui menu disposisi.</li>
                                    </ol>
                                </div>
                            </div>
                            <div className="card my-2 shadow">
                                <div className="card-body">
                                    <small style={{fontSize:'0.7em'}} className="text-gray">Tema Pidato :</small><br/>
                                    <p className="font-weight-600 text-darker">{req.theme}</p>

                                    <small style={{fontSize:'0.7em'}} className="text-gray">Acara :</small><br/>
                                    <p className="font-weight-600 text-darker">{req.event}</p>
                                </div>
                            </div>
                                    <div className="card my-2 shadow">
                                        <div className="card-body">
                                            <div class="row">
                                                <div className="col">
                                                    <small className="text-uppercase text-gray ls-1" style={{fontSize:'0.7em'}}> <b>di-request oleh :</b></small>
                                                    <hr className="my-2"/>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-auto">
                                                    { req.sender.profile ?
                                                        <img className="avatar-sm rounded-circle" alt="Image placeholder" src={`/argon/img/profile/${req.sender.profile.profile_pic_url}`}/>
                                                        :
                                                        <img className="avatar-sm rounded-circle" alt="Image placeholder" src={`/argon/img/profile/default.jpg`}/>
                                                    }
                                                </div>
                                                <div className="col">
                                                    <p className="text-darker mb-0 font-weight-600">{req.sender.name}</p>
                                                    <small className="text-muted text-uppercase ls-1 mt-0" style={{fontSize:'0.6em'}}>

                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card my-2 shadow">
                                        <div className="card-body">
                                            <div class="row">
                                                <div className="col">
                                                    <small className="text-uppercase text-gray ls-1" style={{fontSize:'0.7em'}}> <b>kepada :</b></small>
                                                    <hr className="my-2"/>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-auto">
                                                    { req.receiver.profile ?
                                                        <img className="avatar-sm rounded-circle" alt="Image placeholder" src={`/argon/img/profile/${req.receiver.profile.profile_pic_url}`}/>
                                                        :
                                                        <img className="avatar-sm rounded-circle" alt="Image placeholder" src={`/argon/img/profile/default.jpg`}/>
                                                    }
                                                </div>
                                                <div className="col">
                                                    <p className="text-darker mb-0 font-weight-600">{req.receiver.name}</p>
                                                    <small className="text-muted text-uppercase ls-1 mt-0" style={{fontSize:'0.6em'}}>

                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            <div className="col-lg-5">
                                {data.speech_log_data.map((log,key) => (
                                    <div className="card my-2 shadow" key={key}>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-lg-2 col-sm-2">
                                                    <h2 className="text-white text-center bg-gradient-teal px-2 py-2 rounded">{key+1}</h2>
                                                </div>
                                                <div className="col-auto">
                                                    { log.receiver.profile ?
                                                        <img className="avatar-sm rounded-circle" alt="Image placeholder" src={`/argon/img/profile/${log.receiver.profile.profile_pic_url}`}/>
                                                        :
                                                        <img className="avatar-sm rounded-circle" alt="Image placeholder" src={`/argon/img/profile/default.jpg`}/>
                                                    }
                                                </div>
                                                <div className="col">
                                                    <p className="text-darker mb-0 font-weight-600">{log.receiver.name}</p>
                                                    { log.receiver.role && log.receiver.role.role_data
                                                        ?
                                                        <small className={`bg-darker py-1 px-2 rounded text-uppercase ls-1 text-white`} style={{fontSize:'0.6em'}}>
                                                            {log.receiver.role.role_data.name}
                                                        </small>
                                                        :
                                                        null
                                                    }
                                                    <br/>
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                <small className="text-muted text-uppercase ls-1" style={{fontSize:'0.7em'}}>
                                                    Diterima : {moment(log.created_at).format('dddd')}&nbsp;,&nbsp;{moment(log.created_at).format('Do MMMM YYYY, h:mm:ss')}
                                                </small>
                                            </div>
                                            {/* <h4>{log.receiver.name}</h4> */}
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
            </Fragment>
        )
    }

    const renderMainContent = () => {
        return (
            <Fragment>
                    {renderDataContent()}
            </Fragment>
        )
    }

    return (
        <Fragment>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
            />
            <Guest active={4}/>
            <div className="main-content">
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
                                { renderMainContent() }
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
}

export default documentCheckWParam;
