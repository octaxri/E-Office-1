import React, { Component, Fragment } from 'react';
import Footer from '../../navs/Footer';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import cookie from 'js-cookie';

import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import * as loading from "../../components/loading.json"
import Auth from '../../navs/auth/Auth';
import Axios from 'axios';
import UserNotification from '../../components/notification/notification';
import Navbar from '../../navs/Navbar';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
};

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isReady: undefined,
            errors: {},
            profile: {},
            biography: {},
            lastDispatch: {},
            permissions: {}
        };
    }

    componentDidMount = async () => {
        await Axios.post('/api/profile-data')
            .then(res => this.setState({profile : res.data}))

        await Axios.get('/api/biography')
            .then(res => this.setState({biography : res.data}))

        await Axios.get('/api/history/last-dispatch')
            .then(res => this.setState({lastDispatch : res.data}))

        await Axios.get('/api/permissions/user-permissions')
            .then(res => {
                this.setState({permissions : res.data})
            })
            .catch(error => this.setState({permissions : error.response.data}))

        this.setState({ isReady: true });
    }

    componentWillUnmount(){
        clearTimeout(this.timer);
    }

    handleLogout = (e) => {
        e.preventDefault();
        Axios.post('/api/auth/logout')
            .then( cookie.remove('token'), this.props.logout())
    }

    renderProfileWidget(){
        let profile   = this.state.profile;
        return (
            <div className="shadow">
                <img className="card-img-top" src={"/argon/img/background/sakura.png"} alt="Card image cap"/>
                <div className="card-body bg-white">
                    <div className="media justify-content-center mt--6">
                        <span className="rounded" style={{width:'80px', height:'80px'}}>
                            { this.state.biography && this.state.biography.profile_pic_url ?
                                <img className="img-thumbnail" alt="Image placeholder" src={`/argon/img/profile/${this.state.biography.profile_pic_url}`}/>
                                :
                                <img className="img-thumbnail" alt="Image placeholder" src={`/argon/img/profile/default.jpg`}/>
                            }
                        </span>
                    </div>
                    <h4 className="text-center mt-2 mb-2">{ profile.me.name}</h4>
                    <p className="text-muted text-uppercase ls-2 text-center" style={{fontSize: '0.6em'}}>{ profile.me.email }</p>
                    <div className="row my-4">
                        <div className="col text-center">
                        <small className="text-uppercase ls-2 text-muted" style={{fontSize: '0.7em'}}>Role</small> <br/>
                            <small className="text-uppercase ls-2 text-dark" style={{fontSize: '0.7em'}}>
                                {profile.role.role_data && profile.role.role_data.name ? profile.role.role_data.name : null}
                            </small><br/>
                        </div>
                        <div className="col text-center">
                            <small className="text-uppercase ls-2 text-muted" style={{fontSize: '0.7em'}}>Jabatan <br/>
                                <span className="text-dark">{profile.occupation.error ? null : profile.occupation.data.occupation_data.name}</span>
                            </small>
                        </div>
                    </div>
                    <Link to='/user/profile' className="btn btn-outline-darker btn-block">DETAIL AKUN</Link>
                </div>
            </div>
        )
    }

    renderAdminMenu = () => {
        return (
            <Fragment>
                <hr/>
                <div className="row">
                    <div className="col-auto">
                        <i className="mt-2 fas fa-shield-alt fa-2x px-2 py-2 bg-darker text-white my-auto rounded"></i>
                    </div>
                    <div className="col">
                        <small className="text-muted text-uppercase ls-2" style={{fontSize: '0.7em'}}>menu</small>
                        <h2 className="text-darker mt--1">Protected Access</h2>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-lg-2 col-sm-6 mb-3">
                        <Link to="/admin/user-list">
                            <div className="card-body text-center shadow bg-gradient-orange text-white">
                                <i className="fas fa-chart-line fa-3x"></i>
                                <h4 className="mt-2 text-white text-uppercase">user</h4>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-2 col-sm-6 mb-3">
                        <Link to="/admin/speech-archive">
                            <div className="card-body text-center shadow bg-gradient-purple text-white">
                                <i className="fas fa-file-contract fa-3x"></i>
                                <h4 className="mt-2 text-white text-uppercase">sekretariat</h4>
                            </div>
                        </Link>
                    </div>
                </div>
            </Fragment>
        )
    }

    renderMainContent = () => {
        let last = this.state.lastDispatch
        return (
        <Fragment>
            <div className="row">
                <div className="col-lg-4 align-content-end">
                    <div style={{background: "url(/argon/img/background/7971.jpg)",backgroundSize:"cover",backgroundRepeat: "no-repeat"}} className="shadow mb-3" height="100">

                        {/* <div className="d-lg-block d-sm-none">
                            <UserNotification
                                notificationCount={8}
                                color={'text-white'}/>
                        </div> */}

                        <div className="card-body pt-8">
                            <div className="item pt-8">
                                <h4 className="display-2 text-white font-weight-300 ls-2 pt-6">HOME</h4>
                                <h4 className="text-white font-weight-500 mb-0 ls-1">Selamat Datang di aplikasi E-PIDATO</h4>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-lg-4 ">
                    <div className="mb-3">
                        <div className="card-stats bg-gradient-danger shadow text-white rounded">
                            <div className="card-body">
                                <div className="row mb-0">
                                    <div className="col my-0">
                                        <h5 className="card-title text-uppercase mb-0 text-white">Total Disposisi masuk</h5>
                                        <span className="display-2 font-weight-bold mb-0">0 </span>
                                    </div>
                                    <div className="col-auto align-content-center flex">
                                        <i className="fas fa-paper-plane fa-3x"></i>
                                    </div>
                                </div>
                                <p className="mb-0 text-sm">
                                    <span className="text-nowrap">perintah di-disposisikan </span>
                                    <small style={{fontSize: '0.6em'}} className="mt-0 text-uppercase">Periode {moment().format('MMMM YYYY')}</small>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* <div className="row">
                        <div className="col-lg-6 col-sm-6 mb-3">
                                <div className="card-body text-center bg-white shadow bg-gradient-red text-white">
                                    <i className="fas fa-chart-line fa-3x"></i>
                                    <h4 className="mt-2 text-white text-uppercase">Aktivitas</h4>
                                </div>
                        </div>
                        <div className="col-lg-6 col-sm-6 mb-3">
                                <div className="card-body text-center bg-gradient-info bg-white text-white">
                                    <i className="fas fa-bell fa-3x"></i>
                                    <h4 className="mt-2 text-white">NOTIFIKASI</h4>
                                </div>
                        </div>
                    </div> */}

                    <div className="row mb-3">
                        <div className="col-lg-12 col-sm-6">
                        <div className="card-stats bg-gradient-purple shadow rounded">
                            <div className="card-body">
                                <div className="row mb-0">
                                    <div className="col my-0">
                                        <h5 className="card-title text-uppercase text-muted mb-0 text-white">Disposisi balik</h5>
                                        <span className="display-2 font-weight-bold mb-0 text-primary  text-white">0 </span>
                                    </div>
                                    <div className="col-auto align-content-center flex">
                                        <i className="fas fa-file-signature fa-3x text-white"></i>
                                    </div>
                                </div>
                                <p className="mb-0 text-sm">
                                    <span className="text-nowrap text-white">permohonan perbaikan dokumen</span>
                                    <small style={{fontSize: '0.6em'}} className="text-muted mt-0 text-uppercase">Periode {moment().format('MMMM YYYY')}</small>
                                </p>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <div className="card shadow">
                                <div className="card-body">
                                    <span className="h2">STATUS</span><span className="text-muted text-uppercase ls-2" style={{fontSize: '0.7em'}}>&emsp;disposisi terakhir kepada</span><br/>
                                    <div className="row mt-2">
                                        <div className="col-auto">
                                            { last && last.receiver.profile && last.receiver.profile.profile_pic_url ?
                                                <img className="avatar-sm rounded-circle" alt="Image placeholder" src={`/argon/img/profile/${last.receiver.profile.profile_pic_url}`}/>
                                                :
                                                <img className="avatar-sm rounded-circle" alt="Image placeholder" src="/argon/img/profile/default.jpg"/>
                                            }
                                        </div>
                                        <div className="col-auto">
                                            <span className="h4">{last && last.receiver.name ? last.receiver.name : <small className="text-muted">Anda belum melakukan disposisi</small>}</span><br/>
                                            <span className="text-muted text-uppercase ls-2" style={{fontSize: '0.6em'}}>
                                                {last && last.receiver.role && last.receiver.role.role_data ? last.receiver.role.role_data.name : null}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="row">
                        <div className="col-lg-6 mb-3">
                            <Link to="/logout" onClick={this.handleLogout}>
                                <div className="card-body text-center bg-white shadow bg-gradient-warning text-white">
                                    <i className="fas fa-power-off fa-3x"></i>
                                    <h4 className="mt-2 text-white">SIGN OUT</h4>
                                </div>
                            </Link>
                        </div>
                    </div> */}

                </div>
                <div className="col-lg-4">
                    {this.renderProfileWidget()}
                </div>
            </div>
                {this.state.permissions.error ? null : this.renderAdminMenu()}
            </Fragment>
            );
        }

        render() {
            return (
                <Fragment>
                    <Auth active={5}/>
                    <div className="main-content">
                    <Navbar/>
                        <div className="header pt-md-7 pt-lg-7" ></div>
                            <div className="container-fluid">
                            {
                            !this.state.isReady
                            ?
                                <FadeIn>
                                    <h3 className="text-center text-dark text-uppercase ls-2 pt-md-7 pt-sm-7">Menyiapkan Data</h3>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <Lottie options={defaultOptions} height={120} width={120} />
                                    </div>
                                </FadeIn>
                            :
                                <FadeIn>
                                    {this.renderMainContent()}
                                </FadeIn>
                            }
                        <Footer />
                        </div>
                    </div>
                </Fragment>
        );
    }
}

let mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        user: state.auth.user
    };
};

let mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch({type:"SET_LOGOUT"})
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Home);
