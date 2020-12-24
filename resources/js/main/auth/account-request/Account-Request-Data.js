import React, { Component, Fragment, useEffect, useState } from 'react';
import Axios from 'axios';
import Footer from '../../../navs/Footer';
import { connect } from 'react-redux';
import Navigation from '../../../navs/navigation/navigation';
import LoadingOverlay from 'react-loading-overlay';
import Auth from '../../../navs/auth/Auth';
import Lottie from 'react-lottie';
import ModalSuccess from '../../../components/modal/modal-success';
import useModal from '../../../components/modal/hook-modal';
import * as loading from "../../../components/loading.json"
import FadeIn from 'react-fade-in';
import ErrorPage from '../../../components/error/error';
import { useHistory, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import Navbar from '../../../navs/Navbar';

const AccountRequestData = (props) =>  {
    let [AccountReqData, setAccountReqData] = useState([])
    let [AcceptResponse, setAcceptResponse] = useState([])
    let [RejectResponse, setRejectResponse] = useState([])
    let [isProcessing, setIsProcessing] = useState([])
    let [ready, setReady] = useState(false);
    let [overlayActive, setOverlayActive] = useState(undefined)
    let [errors, setErrors] = useState([])
    let [errorMessage, setErrorMessage] = useState([])

    let {id} = useParams();
    let history = useHistory();
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        await Axios.get('/api/account-request/all/?id=' + id)
            .then(res => setAccountReqData(res.data));
        setReady(true)
    }

    function handleAccept(e){
        setOverlayActive(true)
        Axios.post('/api/account-request/accept?id=' + id)
        .then(res => {
             res.data.success ?
                setTimeout(() => {
                    setOverlayActive(false);
                    toggle(), response(true), message(res.data.success)
                    setTimeout(() => {
                        history.push('/account-request');
                    }, 2000)
                }, 2000)
                :
                setTimeout(() => {
                    setOverlayActive(false);
                    response(false), toggle(), message(res.data.error), dismiss(true)
                }, 2000)
        });
    }

    function handleReject(data){
        setOverlayActive(true)
        Axios.post('/api/account-request/reject', {id : id, reason : data.reason})
            .then(res => {
                res.data.success ?
                setTimeout(() => {
                    setOverlayActive(false);
                    toggle(), response(true), message(res.data.success)
                    setTimeout(() => {
                        history.push('/account-request');
                    }, 2000)
                }, 2000)
                :
                setTimeout(() => {
                    setOverlayActive(false);
                    response(false), toggle(), message(res.data.error), dismiss(true)
                }, 2000)
        });
        // console.log(data.reason)
    }

    const RenderMainContent = () => {
        let data = AccountReqData;
        let uri = '/argon/request/';
        return (
            <div className="row">
                <div className="col-sm-12 col-lg-6">
                    <div className="card h-100" style={{minHeight: '720px'}}>
                        <div className="card-header">
                            <small className="text-uppercase ls-2 text-muted">kelengkapan</small>
                            <h2 className="text-uppercase">scan lembar permohonan</h2>
                        </div>
                        <div className="card-body bg-lighter">
                                <iframe
                                    key={uri + `${data.file}` + '#toolbar=0&navpanes=0'}
                                    className="r-iframe px-2 py-2"
                                    src={uri + `${data.file}` + '#toolbar=0&navpanes=0'}
                                    frameBorder="0">
                                </iframe>
                        </div>
                    </div>
                </div>
                <div className="col">

                    <div className="card shadow">
                        <div className="card-header">
                            <div className="mb-4">
                                <small className="text-uppercase ls-2" style={{fontSize:'0.7em'}}>data</small><br/>
                                <h1 className="font-weight-400 ls-1">Permintaan Akun</h1>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="mb-4">
                                <div className="row">
                                    <div className="col-auto">
                                        <div className="container">
                                            <i className="fas fa-users fa-2x py-2 px-2rounded fa-fw text-darker"></i>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <small className="text-muted text-uppercase ls-2" style={{fontSize:'0.5rem'}}>nama organisasi</small>
                                        <h3 className="font-weight-400">{data.name}</h3>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="row">
                                    <div className="col-auto">
                                        <div className="container my-auto mx-auto">
                                            <i className="fas fa-at fa-2x py-2 px-2 rounded fa-fw text-darker"></i>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <small className="text-muted text-uppercase ls-2" style={{fontSize:'0.5rem'}}>email organisasi</small>
                                    <h3 className="font-weight-400">{data.email}</h3>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <div className="row justify-content-center my-3">
                                <button className="btn btn-success text-uppercase" onClick={() => handleAccept()}><span className="ls-2">terima permohonan</span></button>
                            </div>

                            <h4 className="text-center ls-2">ATAU</h4>
                            <form onSubmit={handleSubmit(handleReject)}>
                                <textarea className="form-control my-2" name="reason" rows="3" placeholder="Alasan akun ditolak" ref={register}></textarea>
                                <div className="row justify-content-center">
                                    <button type="submit" className="btn btn-darker text-uppercase"><span className="ls-2">tolak permohonan</span></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const {isShowing, toggle, response, isSuccess, message, isMessage, dismiss, allowDismiss} = useModal();

    return (
        <Fragment>
        <ModalSuccess isShowing={isShowing} hide={toggle} response={isSuccess} message={isMessage} allowDismiss={allowDismiss}/>
            <LoadingOverlay active={overlayActive} spinner={<Lottie options={defaultOptions} height={120} width={120} />} text='MEMPROSES DATA'>
                <Auth active={7}/>
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

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
};

export default AccountRequestData;
