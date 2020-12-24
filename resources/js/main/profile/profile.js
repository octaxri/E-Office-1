import React, { useState, useEffect, Fragment } from 'react';
import Axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';
import FadeIn from 'react-fade-in';
import Lottie from 'react-lottie';
import useHistory, { useParams, Link } from 'react-router-dom';
import Navigation from '../../navs/navigation/navigation';
import * as loading from "../../components/loading.json"
import ModalSuccess from '../../components/modal/modal-success';
import useModal from '../../components/modal/hook-modal';
import Auth from '../../navs/auth/Auth';
import setActiveSidebar from '../../navs/auth/hook-auth';
import Redirect from '../../components/error/redirect';
import { connect } from 'react-redux';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import Navbar from '../../navs/Navbar';

const Profile = () => {
    moment.locale('id')
    let [biography,setBiography] = useState([]);
    let [profile, setProfile] = useState([]);
    let [ready, setReady] = useState(false);
    let [overlayActive, setOverlayActive] = useState(false);
    let [id, setId] = useState(false);
    const { register, handleSubmit , watch} = useForm();

    useEffect(() => {
        getData();
        setActive(0);
    }, []);

    const getData = async () => {
        await Axios.get('/api/biography')
            .then(res => setBiography(res.data))

        await Axios.post('/api/profile-data')
            .then(res => setProfile(res.data))

        setReady(true);
    }

    const dataLabel = ({label, data}) => {
        return(
            <Fragment>
                <div className="my-3">
                    <small className="text-muted text-uppercase ls-2" style={{fontSize: '0.6em'}}>{label}:</small>
                    <p className="text-darker font-weight-600">{data}</p>
                </div>
            </Fragment>
        )
    }

    const dataLabelCenter = ({label, data}) => {
        return(
            <Fragment>
                <div className="my-4 text-center">
                    <small className="text-muted text-uppercase ls-2" style={{fontSize: '0.6em'}}>{label}:</small>
                    <p className="text-primary font-weight-600 text-uppercase ls-1">{data}</p>
                </div>
            </Fragment>
        )
    }

    const onChangePassword = async (data) => {
        setOverlayActive(true)
        // setOverlayActive(false), toggle(), dismiss(true), response(true), message('lol')
        if (data.password === data.cpassword){
        await Axios.post('/api/auth/change-password', data)
            .then(res => {
                setOverlayActive(false), toggle(), dismiss(true), response(true), message(res.data.success)
            })
        } else {
            setOverlayActive(false), toggle(), dismiss(true), response(false), message('Konfirmasi password Salah')
        }
    }

    const renderMainContent = () => {
        console.log(biography)
        return (
            <Fragment>
                <div className="col-lg-3 col-sm-12 mb-3">
                    <div className="card shadow">
                        <img className="card-img-top" src={"/argon/img/background/sakura.png"} alt="Card image cap"/>
                        <div className="card-body text-center">
                            { biography && biography.profile_pic_url ?
                                <img className="img-thumbnail rounded-circle mt--8" alt="Image placeholder" src={`/argon/img/profile/${biography.profile_pic_url}`} style={{maxWidth:'200px', maxHeight:'200px'}}/>
                                :
                                <img className="img-thumbnail rounded-circle mt--8" alt="Image placeholder" src={`/argon/img/profile/default.jpg`} style={{maxWidth:'200px', maxHeight:'200px'}}/>
                            }
                                {/* <span className="rounded" style={{width:'80px', height:'80px'}}>
                                    <img className="img-thumbnail" src={`/argon/img/profile/${biography.profile_pic_url}`}/>
                                </span> */}
                                <div className="row my-3">
                                    <div className="col">
                                        <Link className="btn btn-block btn-darker" to={{ pathname: '/user/upload-image'}}>UPLOAD PHOTO PROFIL</Link>
                                        <hr className="bg-white"/>
                                        {dataLabelCenter({label: 'nip', data: '-'})}
                                        {dataLabelCenter({label: 'status pegawai', data: '-'})}
                                        {dataLabelCenter({label: 'terakhir login', data: '-'})}
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-9 col-sm-12">
                    <div className="card">
                        <div className="card-body">
                            <div>
                                <div className="row">
                                    <div className="col-auto">
                                        <i className="mt-2 fas fa-signature fa-2x px-2 py-2 bg-darker text-white my-auto rounded"></i>
                                    </div>
                                    <div className="col">
                                        <small className="text-muted text-uppercase ls-2" style={{fontSize: '0.7em'}}>user</small>
                                        <h2 className="text-darker mt--1">Biografi Pengguna</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        {dataLabel({label: 'nama lengkap', data: profile.me.name})}
                                    </div>
                                    <div className="col">
                                        {dataLabel({label: 'Email', data: profile.me.email})}
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <div>
                                <div className="row">
                                    <div className="col-auto">
                                        <i className="mt-2 fas fa-signature fa-2x px-2 py-2 bg-darker text-white my-auto rounded"></i>
                                    </div>
                                    <div className="col">
                                        <small className="text-muted text-uppercase ls-2" style={{fontSize: '0.7em'}}>user</small>
                                        <h2 className="text-darker mt--1">Data Administratif</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        {dataLabel({label: 'jabatan', data: !profile.occupation.error ? profile.occupation.data.occupation_data.name : '-'})}
                                        {dataLabel({label: 'bidang', data: !profile.field.error ? profile.field.data.field_data.name : '-'})}
                                    </div>
                                    <div className="col">
                                        {dataLabel({label: 'sub-bidang', data: !profile.subfield.error ? profile.subfield.data.subfield_data.name : '-'})}
                                        {dataLabel({label: 'role', data: profile.role ? profile.role.role_data.name : '-'})}
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <div>
                                <div className="row">
                                    <div className="col-auto">
                                        <i className="mt-2 fas fa-unlock-alt fa-2x px-2 py-2 bg-darker text-white my-auto rounded"></i>
                                    </div>
                                    <div className="col">
                                        <small className="text-muted text-uppercase ls-2" style={{fontSize: '0.7em'}}>form</small>
                                        <h2 className="text-darker mt--1">Ganti Password</h2>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit(onChangePassword)}>
                                    <div className="row">
                                            <div className="col">
                                                <input ref={register} className="form-control mb-2" name="password" type="password" required autoComplete="new-password" placeholder="password baru anda"/>
                                            </div>
                                            <div className="col">
                                                <input ref={register} className="form-control mb-2" name="cpassword" type="password" required autoComplete="new-password" placeholder="konfirmasi password"/>
                                            </div>
                                    </div>
                                    <button type="submit" className="btn btn-darker"><span className="ls-2 text-uppercase">ganti password</span></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }

    const {isShowing, toggle, response, isSuccess, message, isMessage, dismiss, allowDismiss} = useModal();
    const {setActive, menuIsActive} = setActiveSidebar()

    return (
        <Fragment>
            <ModalSuccess isShowing={isShowing} hide={toggle} response={isSuccess} message={isMessage} allowDismiss={allowDismiss}/>
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
                                        { renderMainContent() ?? null }
                                    </div>
                                </Fragment>
                        }
                        </div>
                </div>
            </LoadingOverlay>
        </Fragment>
    );
};

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(Profile);
