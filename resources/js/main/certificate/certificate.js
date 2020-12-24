import React, { useState, useContext, useEffect, useCallback, useMemo, Fragment } from 'react';
import ModalSuccess from '../../components/modal/modal-success';
import LoadingOverlay from 'react-loading-overlay';
import FadeIn from 'react-fade-in';
import Auth from '../../navs/auth/Auth';
import Redirect from '../../components/error/redirect';
import setActiveSidebar from '../../navs/auth/hook-auth';
import useModal from '../../components/modal/hook-modal';
import Lottie from 'react-lottie';
import * as loading from "../../components/loading.json"
import Axios from 'axios';
import { connect } from 'react-redux';
import Navigation from '../../navs/navigation/navigation';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import fileDownload from 'js-file-download';
import Navbar from '../../navs/Navbar';

const Certificate = (props) => {
    moment.locale('id')

    let [certificateList, setCertificateList] = useState([]);
    let [ready, setReady] = useState(false);
    let [file, setFile] = useState();
    let [overlayActive, setOverlayActive] = useState(false);
    const { register, handleSubmit , watch} = useForm();

    const { register: signTest, handleSubmit: handleTest } = useForm();

    useEffect(()=> {
        getData()
    }, [])

    const getData = async () => {
        await Axios.get('/api/user-certificate/certificate-list')
            .then(res => { setCertificateList(res.data) })

        setReady(true)
    }

    const refreshList = async () => {
        await Axios.get('/api/user-certificate/certificate-list')
            .then(res => { setCertificateList(res.data) })
    }

    const onSignTest = async (data) => {
        let form = new FormData();
        form.append('password', data.password);
        form.append('file', file);

        await Axios.post('/api/sign/sign-test', form, {responseType: 'blob'})
            .then(res => {
                // (setOverlayActive(false), toggle(), dismiss(true), response(true), refreshList(), message(res.data.success),
                    const url = window.URL.createObjectURL(new Blob([res.data]))
                    const link = document.createElement('a')
                    link.href = url
                    link.setAttribute('download', 'file.pdf') //or any other extension
                    document.body.appendChild(link)
                    link.click()
            })
    }

    const onFileChange = (event) => {
        setFile(event.target.files[0]);
        // setFileName(event.target.files[0].name)
        // console.log(event.target.files[0].name)
    }

    const onCreateCertificate = async (data) => {
        if (data.password === data.cpassword) {
            setOverlayActive(true)
            // console.log(data)
         await Axios.post('/api/user-certificate/create-new', data)
            .then(res => {
                !res.data.error ?
                (setOverlayActive(false), toggle(), dismiss(true), response(true), refreshList(), message(res.data.success))
                :
                (setOverlayActive(false), toggle(), response(false), message(res.data.error))
            })
        } else {
            (setOverlayActive(false), toggle(), response(false), message('Konfirmasi passphrase tidak sesuai'))
        }
    }

    const materialInput = ({label, name, placeholder, type}) => {
        return (
            <Fragment>
                <div className="row my-2">
                    <div className="col-lg-5 text-right my-auto">
                        <small className="text-darker font-weight-600">{label} :</small>
                    </div>
                    <div className="col-lg-7">
                            <input className="material-input" type={`${type}`} name={`${name}`} placeholder={`${placeholder}`} ref={register} required autoComplete="new-password"/>
                            <span className="highlight"></span>
                            <span className="bar"></span>
                    </div>
                </div>
            </Fragment>
        )
    }

    const renderMainContent = () => {
        return (
            <Fragment>
                <div className="col-lg-5 col-sm-12">
                    <div className="row">
                        <div className="col-auto">
                            <i className="mt-2 fas fa-signature fa-2x px-2 py-2 bg-darker text-white my-auto rounded"></i>
                        </div>
                        <div className="col">
                            <small className="text-muted text-uppercase ls-2" style={{fontSize: '0.7em'}}>form</small>
                            <h2 className="text-darker mt--1">Registrasi Sertifikat</h2>
                        </div>
                    </div>
                    <div className="card my-2 shadow mb-4">
                        <div className="card-body">
                            <div className="card bg-darker">
                                <div className="card-body">
                                    <ol className="text-white" style={{fontSize: '0.7em'}}>
                                        <li>Dianjurkan untuk mengisi semua field pada Form sesuai data yang dapat di-pertanggung jawabkan kebenarannya</li>
                                        <li>Data yang anda isi akan terlihat pada tanda tangan digital, teliti kebenaran sebelum melakukan submit</li>
                                        <li>Tanda Tangan digital yang dibuat berlaku 1 tahun semenjak data dibuat</li>
                                    </ol>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit(onCreateCertificate)}>
                                { materialInput({label: 'Inisial Negara', name: 'country', placeholder: 'cth : ID' ,type: 'text'}) }
                                { materialInput({label: 'Provinsi', name: 'province', placeholder: 'Nama Provinsi', type: 'text'}) }
                                { materialInput({label: 'Kota', name: 'city', placeholder: 'Nama Kota', type: 'text' }) }
                                { materialInput({label: 'Nama Organisasi', name: 'organization', placeholder: 'Nama Organisasi', type: 'text' }) }
                                { materialInput({label: 'Unit / Bidang / Golongan', name: 'unit', placeholder: 'Unit anda', type: 'text' }) }
                                { materialInput({label: 'Nama Lengkap Anda', name: 'name', placeholder: 'Nama Lengkap Anda', type: 'text' }) }
                                { materialInput({label: 'Email Aktif', name: 'email', placeholder: 'Email Anda', type: 'email' }) }
                                { materialInput({label: 'Passphrase', name: 'password', placeholder: 'passphrase sertifikat', type: 'password' }) }
                                { materialInput({label: 'Konfirmasi Passphrase', name: 'cpassword', placeholder: 'Konfirmasi passphrase', type: 'password' }) }
                                <div className="row justify-content-center my-4">
                                    <button type="submit" className="btn btn-darker">
                                        <span className="ls-2 text-white text-uppercase">buat sertifikat</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-auto">
                            <i className="mt-2 fas fa-signature fa-2x px-2 py-2 bg-darker text-white my-auto rounded"></i>
                        </div>
                        <div className="col">
                            <small className="text-muted text-uppercase ls-2" style={{fontSize: '0.7em'}}>form</small>
                            <h2 className="text-darker mt--1">E-Sign Test</h2>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleTest(onSignTest)}>
                                <input ref={signTest} className="form-control mb-2" name="password" type="password" required autoComplete="new-password" placeholder="passphrase anda"/>
                                <label className="btn btn-outline-darker btn-file">
                                    <span className="ls-2 text-uppercase font-weight-600" style={{fontSize:'0.7em'}}><i className="fas fa-file-pdf text-white"></i> Upload</span>
                                    <input ref={signTest} type="file" name="file" id="file" style={{display:'none'}} onChange={onFileChange}/>
                                </label>
                                <button type="submit" className="btn btn-darker">submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-lg-7 col-sm-12">
                    <div className="row">
                        <div className="col-auto">
                            <i className="mt-2 fas fa-history fa-2x px-2 py-2 bg-darker text-white my-auto rounded"></i>
                        </div>
                        <div className="col">
                            <small className="text-muted text-uppercase ls-2" style={{fontSize: '0.7em'}}>data</small>
                            <h2 className="text-darker mt--1">Riwayat Sertifikat</h2>
                        </div>
                    </div>
                    {
                        certificateList.map((certificate, index) => {
                            return (
                                <Fragment key={index}>
                                    <div className="row my-2">
                                        <div className="col-lg-8 col-sm-12">
                                            <div className="card">
                                                <div className="card-body">

                                                    <div className="row">
                                                        <div className="col-8">
                                                            <p className="text-muted mb-0 font-weight-500 ls-2 text-uppercase my-2" style={{fontSize: '0.7em'}}>Certificate issuer:</p>
                                                            <div className="row">
                                                                <div className="col-auto">
                                                                    { certificate.certificate_owner.profile && certificate.certificate_owner.profile.profile_pic_url ?
                                                                        <img className="avatar-sm rounded-circle" alt="Image placeholder" src={`/argon/img/profile/${certificate.certificate_owner.profile.profile_pic_url}`}/>
                                                                        :
                                                                        <img className="avatar-sm rounded-circle" alt="Image placeholder" src="/argon/img/theme/team-4-800x800.jpg"/>
                                                                    }
                                                                </div>
                                                                <div className="col">
                                                                    <p className="text-darker mb-0 font-weight-600">{certificate.certificate_owner.name}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-4">
                                                            <p className="text-muted mb-0 font-weight-500 ls-2 text-uppercase my-2" style={{fontSize: '0.7em'}}>status:</p>
                                                            { certificate.status === 1 ?
                                                                <small className="rounded bg-gradient-success py-1 px-2 ls-2 text-white text-uppercase" style={{fontSize: '0.7em'}}>aktif</small>
                                                                :
                                                                <small className="rounded bg-gradient-gray py-1 px-2 ls-2 text-white text-uppercase" style={{fontSize: '0.7em'}}>nonaktif</small>
                                                            }
                                                        </div>
                                                    </div>
                                                    <small className="font-weight-500 text-darker mt-2">{certificate.ca}.pkcs12</small><br/>
                                                        { certificate.status === 1 ?
                                                                <small className="text-muted text-uppercase ls-1" style={{fontSize: '0.7em'}}>
                                                                    Berlaku Hingga : {moment(certificate.created_at).add(1, 'Y').format('LL')}
                                                                </small>
                                                                : null
                                                        }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Fragment>
                            )
                        })
                    }
                </div>
            </Fragment>
        )
    }

    const {isShowing, toggle, response, isSuccess, message, isMessage, dismiss, allowDismiss} = useModal();
    const {setActive, menuIsActive} = setActiveSidebar()

    return (
        <Fragment>
            <ModalSuccess isShowing={isShowing} hide={toggle} response={isSuccess} message={isMessage} allowDismiss={allowDismiss}/>
            <LoadingOverlay active={overlayActive} spinner={ <Lottie options={defaultOptions} height={120} width={120} /> } text='MEMPROSES DATA'>
                <Auth active={12}/>
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
                                        { renderMainContent() ?? <Redirect /> }
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
};

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        user: state.auth.user
    };
};

export default connect(mapStateToProps)(Certificate);
