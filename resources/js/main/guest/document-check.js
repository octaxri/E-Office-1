import React, { useState, useContext, useEffect, useCallback, useMemo, Fragment } from 'react';
import Lottie from 'react-lottie';
import Navigation from '../../navs/navigation/navigation';
import * as loading from "../../components/loading.json";
import { useForm } from 'react-hook-form';
import Axios from 'axios';
// import Error from '../../components/error/error';
import { ToastContainer } from 'react-toastify';
import Guest from '../../navs/guest/Guest';
import FadeIn from 'react-fade-in';
import { useParams } from 'react-router';

const documentCheck = (props) => {
    let [ready, setReady] = useState(false);
    let [data, setData] = useState([]);
    let [loading, setLoading] = useState(false);
    const { register, handleSubmit , watch} = useForm();

    let {id} = useParams();

    useEffect(() => {
        setReady(true)
        setData({error: 'Submit kode untuk melihat data'})
    }, [])

    const onCheckDocument = async (data) => {
        setLoading(true)
        await Axios.get('/api/guest/document/check?uuid=' + data.uid )
            .then(res => {
                setData(res.data)
            })
            .catch(error => {
                setData(error.response.data)
            })
        setLoading(false)
    }

    const renderForm = () => {
        return (
            <Fragment>
                <div className="row mt-5 justify-content-center">
                    <div className="col-lg-4 text-center">
                        <form onSubmit={handleSubmit(onCheckDocument)}>
                            <div className="row justify-content-center">
                                <input type="text" name={`uid`} ref={register} className="form-control my-2 mx-2" style={{textAlign: `center`, fontSize: `24px`, width: `10em`}}/>
                            </div>
                            <button type="submit" className="btn btn-darker text-white text-uppercase">cek dokumen</button>
                        </form>
                    </div>
                </div>
            </Fragment>
        )
    }

    const renderDataContent = () => {
        return (
            <Fragment>
                <div className="row my-4">
                    <div className="col">
                        { loading === false ?
                            (!data.error ? validDocument() : '')
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
        return (
            <Fragment>
                <div className="card-body">
                    {/* {JSON.stringify(data)} */}
                        <div className="row justify-content-center">
                            <div className="col-lg-4">
                                {!data.error ? data.speech_log_data.map(log => (
                                    <div className="card my-2 shadow">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-auto">
                                                    { log.receiver.profile ?
                                                        <img className="avatar-sm rounded-circle" alt="Image placeholder" src={`/argon/img/profile/${log.receiver.profile.profile_pic_url}`}/>
                                                        :
                                                        <img className="avatar-sm rounded-circle" alt="Image placeholder" src={`/argon/img/profile/default.jpg`}/>
                                                    }
                                                </div>
                                                <div className="col">
                                                    <p className="text-darker mb-0 font-weight-600">{log.receiver.name}</p>
                                                    <small className="text-muted text-uppercase ls-1 mt-0" style={{fontSize:'0.6em'}}>
                                                        {/* {req.sender_data.occupation ? req.sender_data.occupation.occupation_data.name : null}&nbsp;
                                                            {(() => {
                                                                if(req.sender_data.field && !req.sender_data.subfield) {
                                                                    return req.sender_data.field.field_data.name
                                                                }
                                                                if(req.sender_data.field && req.sender_data.subfield){
                                                                    return req.sender_data.subfield.subfield_data.name
                                                                }
                                                            })()} */}
                                                    </small>
                                                </div>
                                            </div>
                                            {/* <h4>{log.receiver.name}</h4> */}
                                        </div>
                                    </div>
                                )) : null}
                            </div>
                        </div>
                    </div>
            </Fragment>
        )
    }

    const renderMainContent = () => {
        return (
            <Fragment>
                    {renderForm()}
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

export default documentCheck;
