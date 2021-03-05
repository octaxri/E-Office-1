import React, { Fragment, useEffect, useState } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import FadeIn from 'react-fade-in';
import Navigation from '../../../navs/navigation/navigation';
import Auth from '../../../navs/auth/Auth';
import setActiveSidebar from '../../../navs/auth/hook-auth';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Navbar from '../../../navs/Navbar';
import Waiting from '../../../components/waiting/waiting';

const Dispatch = (props) => {
    let [allDispacth, setAllDispacth] = useState([]);
    let [isReady, setIsReady] = useState(false);
    let [loadingMessage, setLoadingMessage] = useState('')

    useEffect(() => {
        setActive(6);
        loadData()
    }, []);

    const loadData = async() => {
        setLoadingMessage('all document')
        await Axios.get('/api/dispatch/all-dispatch')
            .then(res => {
                setAllDispacth(res.data)
        })
        setIsReady(true)
    }

    const dipatchState = ({status}) => {
        if (status === 1) {
            return (
                <small className="bg-gradient-success px-1 py-1 rounded text-white font-weight-500">
                    <i className="fas fa-paperclip"></i> Doc. Up
                </small>
            )
        }
        if (status === 2 ) {
            return (
                <small className="bg-gradient-danger px-1 py-1 rounded text-white font-weight-500">
                    <i className="fas fa-paperclip"></i> Fix Required
                </small>
            )
        }
        if (status === 3) {
            return (
                <small className="bg-gradient-primary px-1 py-1 rounded text-white font-weight-500">
                    <i className="fas fa-paperclip"></i> Doc. Signed
                </small>
            )
        }
    }

    const renderMainContent = () => {
        return allDispacth.map( (data, index) => (
            <Fragment key={index}>
                <div className="col-lg-4 col-sm-12 my-2 card-lift-sm-dark--hover">
                    <Link to={{ pathname: '/dispatch/detail/'+ data.speech_data.id, id: data.speech_data.id }}>
                        <div className="card shadow flex" style={{minWidth:'400px', maxWidth:'500px' , height: '16em'}}>
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
                                    <small className="text-muted text-uppercase ls-2" style={{fontSize:'0.6em'}}>subject :</small>
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
    moment.locale('en');
    return (
        <Fragment>
            <Auth active={menuIsActive}/>
            <div className="main-content">
            <Navbar/>
            <div className="header pt-md-7 pt-lg-7" ></div>
                <div className="container-fluid py-4">
                {
                    isReady == false
                    ?
                        <Waiting message={'preparing the page'} loadingMessage={loadingMessage}/>
                    :
                        <Fragment>
                            <FadeIn>
                                <ToastContainer position="top-right" autoClose={10000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} draggable/>
                                <Navigation />
                                <div className="row">
                                    {renderMainContent()}
                                </div>
                            </FadeIn>
                        </Fragment>
                }
                </div>
            </div>
        </Fragment>
    );
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        user: state.auth.user
    };
};

export default connect(mapStateToProps)(Dispatch);
