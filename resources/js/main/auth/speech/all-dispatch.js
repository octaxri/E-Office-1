import React, { Fragment, useEffect, useState } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import Lottie from 'react-lottie';
import * as loading from "../../../components/loading.json";
import FadeIn from 'react-fade-in';
import Navigation from '../../../navs/navigation/navigation';
import Auth from '../../../navs/auth/Auth';
import setActiveSidebar from '../../../navs/auth/hook-auth';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Navbar from '../../../navs/Navbar';

const Dispatch = (props) => {
    let [allDispacth, setAllDispacth] = useState([]);
    let [isReady, setIsReady] = useState(undefined);

    useEffect(() => {
        setActive(6);
        setTimeout(() => {
            setIsReady(true)
         }, 2000);

         Axios.get('/api/dispatch/all-dispatch')
         .then(res => {
             setAllDispacth(res.data)
         })
    }, []);

    const dipatchState = ({status, Svalue, Rvalue}) => {
        if (status === 1 && Svalue < Rvalue) {
            return (
                <small className="bg-gradient-success px-1 py-1 rounded text-white font-weight-500">
                    <i className="fas fa-paperclip"></i> disposisi naik
                </small>
            )
        }
        if (status === 1 && Svalue > Rvalue) {
            return (
                <small className="bg-gradient-success px-1 py-1 rounded text-white font-weight-500">
                    <i className="fas fa-paperclip"></i> disposisi turun
                </small>
            )
        }
        if (status === 2 ) {
            return (
                <small className="bg-gradient-danger px-1 py-1 rounded text-white font-weight-500">
                    <i className="fas fa-paperclip"></i> disposisi mundur
                </small>
            )
        }
        if (status === 3) {
            return (
                <small className="bg-gradient-primary px-1 py-1 rounded text-white font-weight-500">
                    <i className="fas fa-paperclip"></i> ditanda-tangani
                </small>
            )
        }
    }

    const renderMainContent = () => {
        return allDispacth.map( (data, index) => (
            <Fragment key={index}>
                <div className="col-lg-4 col-sm-12 my-2 card-lift-sm-dark--hover">
                    <Link to={{ pathname: '/dispatch/detail/'+ data.speech_data.id, id: data.speech_data.id }}>
                        <div className="card shadow flex" style={{height: '16em'}}>
                            <div className="card-body mb-0">
                                <div className="row">
                                    <div className="col flex-auto d-inline-flex">
                                        { data.speech_data.sender.profile && data.speech_data.sender.profile.profile_pic_url ?
                                            <img className="avatar-xs rounded-circle" alt="Image placeholder" src={`/argon/img/profile/${data.speech_data.sender.profile.profile_pic_url}`}/>
                                            :
                                            <img className="avatar-xs rounded-circle" alt="Image placeholder" src="/argon/img/profile/default.jpg"/>
                                        }
                                        <p className="text-darker font-weight-500">&emsp;{data.speech_data.sender.name}</p>
                                    </div>
                                </div>
                                    <small className="text-muted text-uppercase ls-2" style={{fontSize:'0.6em'}}>tema :</small>
                                    <h3>{data.speech_data.speech_request.theme}</h3>
                                    <small className="text-muted">{data.speech_data.speech_request.event}</small>
                            </div>
                            <div className="card-footer mt-0">
                                <div className="row">
                                    <div className="col">
                                        <div className="d-inline-flex">
                                            { data.speech_main_file ?
                                                <>
                                                <small className="bg-gradient-primary px-1 py-1 rounded text-white font-weight-500">
                                                    <i className="fas fa-paperclip"></i> 1 attachment
                                                </small>&nbsp;
                                                </>
                                                :
                                                <>
                                                <div className="d-inline-flex">
                                                    <small className="bg-gradient-danger px-1 py-1 rounded text-white font-weight-500"><i className="fas fa-unlink"></i> no attachment</small>
                                                </div>&nbsp;
                                                </>
                                            }
                                            { dipatchState({status: data.speech_data.status, Svalue: data.speech_data.sender.role.role_data.role_level, Rvalue: data.speech_data.receiver.role.role_data.role_level}) }
                                        </div>
                                    </div>
                                    <div className="col-auto d-inline-flex">
                                        <small className="text-muted font-weight-500 time-text-hover">&nbsp;{moment(data.speech_data.updated_at).fromNow()}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </Fragment>
        ));
    }

    const {setActive, menuIsActive} = setActiveSidebar()
    moment.locale('id');
    return (
        <Fragment>
            <Auth active={menuIsActive}/>
            <div className="main-content">
            <Navbar/>
            <div className="header pt-md-7 pt-lg-7" ></div>
                <div className="container-fluid py-4">
                {
                    !isReady
                    ?
                        <FadeIn>
                            <h3 className="text-center text-dark text-uppercase ls-2 pt-md-7">Menyiapkan Data</h3>
                            <div className="d-flex justify-content-center align-items-center">
                                <Lottie options={defaultOptions} height={120} width={120} />
                            </div>
                        </FadeIn>
                    :
                        <Fragment>
                            <ToastContainer position="top-right" autoClose={10000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} draggable/>
                            <Navigation />
                            <div className="row">
                                {renderMainContent()}
                            </div>
                        </Fragment>
                }
                </div>
            </div>
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

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        user: state.auth.user
    };
};

export default connect(mapStateToProps)(Dispatch);
