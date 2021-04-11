import React, { Fragment, useEffect, useState } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import Lottie from 'react-lottie';
import * as loading from "../../components/loading.json";
import FadeIn from 'react-fade-in';
import Navigation from '../../navs/navigation/navigation';
import Auth from '../../navs/auth/Auth';
import setActiveSidebar from '../../navs/auth/hook-auth';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Navbar from '../../navs/Navbar';
import download from 'downloadjs';

const SpeechArchive = (props) => {
    let [allDispacth, setAllDispacth] = useState([]);
    let [isReady, setIsReady] = useState(undefined);
    let [month, setMonth]  = useState(null);
    let [year, setYear]  = useState(null);
    let [yearList, setYearList]  = useState([]);

    useEffect(() => {
        setActive(6);
        setTimeout(() => {
            setIsReady(true)
         }, 2000);

         Axios.get('/api/admin/speech-archive')
         .then(res => {
             setAllDispacth(res.data)
         })

         Axios.get('/api/admin/speech-archive/year-list')
         .then(res => {
             setYearList(res.data)
         })
    }, []);

    const handleMonthChange = (event) => {
        setMonth(event)
    }

    const handleYearChange = (event) => {
        setYear(event)
    }

    const reset = async () => {
        setIsReady(false)
        await Axios.get('/api/admin/speech-archive')
         .then(res => {
             setAllDispacth(res.data)
        })
        setIsReady(true)
    }

    const getFilteredArchive = async () => {
        setIsReady(false);
        Axios.get('/api/admin/speech-archive', { params: { month: month+1, year: year } })
            .then(res => {
             setAllDispacth(res.data)
        })
        setIsReady(true);
    }

    const downloadReport = () => {
        setIsReady(false);
        Axios.get('/api/admin/generate-speech-report', { params: { month: month+1, year: year }, responseType: 'blob' })
            .then(res => {
                const content = res.headers['content-type'];
                download(res.data, 'LAPORAN-' + moment().month(month).format('MMMM') + '-' + year + '.zip', content)
        })
        setIsReady(true);
    }

    const dispatchState = ({status, Svalue, Rvalue}) => {
        if (status === 3) {
            return (
                <small className="bg-gradient-primary px-1 py-1 rounded text-white font-weight-500">
                    <i className="fas fa-paperclip"></i> document signed
                </small>
            )
        }
    }

    const filterForm = () => {
        return(
            <Fragment>
                <div className="col col-sm-12 col-lg-auto">
                    {/* <div className="card-body"> */}
                        <div class="btn-group">
                            <button type="button" class="btn btn-primary">{month!==null ? moment().month(month).format('MMMM') : 'Month'}</button>
                            <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="sr-only">Toggle Dropdown</span>
                            </button>
                            <div class="dropdown-menu">
                                {
                                    [...Array(12)].map((x, i) =>
                                        // <ObjectRow key={i} />
                                        <a class="dropdown-item" href="#" onClick={()=>handleMonthChange(i)}>{moment().month(i).format('MMMM')}</a>
                                      )
                                }
                            </div>
                        </div>

                        <div class="btn-group mx-2">
                            <button type="button" class="btn btn-primary">{year!==null ? year : 'Year'}</button>
                            <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="sr-only">Toggle Dropdown</span>
                            </button>
                            <div class="dropdown-menu">
                                {
                                    yearList.map((data, key) => (
                                        <a class="dropdown-item" href="#" key={key} onClick={()=>handleYearChange(data.year)}>{data.year}</a>
                                    ))
                                }
                            </div>
                        </div>

                        <button className="btn btn-darker mx-2" onClick={()=>getFilteredArchive()}>Filter</button>
                        <button className="btn bg-gradient-success mx-2 text-white" onClick={()=>reset()}>Reset</button>

                    {/* </div> */}
                </div>
                <div className="col text-right">
                    {/* <div className="card-body"></div> */}
                    <button
                        className="btn btn-darker ls-1"
                        onClick={()=>downloadReport()}
                        disabled={month == null || year == null ? true : false}
                        >
                        <i className="fas fa-print"></i>&nbsp;
                        DOWNLOAD REPORT
                    </button>
                </div>

            </Fragment>
        )
    }

    const renderMainContent = () => {
        return (
            <Fragment>
            {allDispacth.map( (data, index) => (
            <Fragment key={index}>
                <div className="col-lg-4 col-sm-12 my-2 card-lift-sm-dark--hover">
                    <Link to={{ pathname: '/admin/speech-archive/detail/'+ data.speech_data.id, id: data.speech_data.id }}>
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
                                                    <i className="fas fa-paperclip"></i> 1 document
                                                </small>&nbsp;
                                                </>
                                                :
                                                <>
                                                <div className="d-inline-flex">
                                                    <small className="bg-gradient-danger px-1 py-1 rounded text-white font-weight-500"><i className="fas fa-unlink"></i> no attachment</small>
                                                </div>&nbsp;
                                                </>
                                            }
                                            { dispatchState({status: data.speech_data.status, Svalue: data.speech_data.sender.role.role_data.role_level, Rvalue: data.speech_data.receiver.role.role_data.role_level}) }
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
        ))}
        </Fragment>
        );
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
                    !isReady || isReady == false
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
                            <div className="row mb-2">
                                {filterForm()}
                            </div>
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

export default connect(mapStateToProps)(SpeechArchive);
