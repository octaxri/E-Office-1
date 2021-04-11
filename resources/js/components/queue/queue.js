import Axios from 'axios';
import moment from 'moment';
import React, { useState, useContext, useEffect, useCallback, useMemo, Fragment, useRef, createRef } from 'react';
import FadeIn from 'react-fade-in';
import Lottie from 'react-lottie';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import * as loading from "../../components/notification-loading.json"

const DocumentQueue = (props) => {
    moment.locale('en');

    let [notification, setNotification] = useState([]);
    let [counter, setCounter] = useState(Number);
    let [key, setKey] = useState(1);
    const refresh = () => setKey(key + 1);
    let [isDropdownOpen, setDropdownOpen] = useState(false);
    let ref = useRef();
    let [isReady, setReady] = useState(false);
    let history = useHistory();

    const dispatch = useDispatch()

    useOnClickOutside(ref, () => setDropdownOpen(false));

    useEffect(() => {
        // Axios.get('/api/notification/counter')
        //     .then(res => {setCounter(res.data)})
    }, [])

    const { dispatchQueues } = useSelector(state => ({
        dispatchQueues: state.dispatch_queue.dispatch
    }), shallowEqual);

    const markAsRead = (id, url) => {
        Axios.get('/api/notification/test', {
            params: {
                id: id
                }
            })
        // .then(res => {setNotification(res.data), setCounter(counter - 1)})
        .then(res => { history.push(url) })
    }

    const removeQueue = (id) => {
        dispatch({type:"REMOVE_DISPATCH_QUEUE", payload: {
                id: id
            }
        })
    }

    const notificationData = () => {
         return isDropdownOpen ? (
                dispatchQueues.map((data , keyCustom) => (
                <a href="#" className={`dropdown-item py-3 ${data.id ? 'bg-white' : 'bg-secondary'}`} key={keyCustom} style={{zIndex:99999}}>
                    <div className="row">
                        {/*
                            to={data.data.url + data.data.key}
                            onClick={()=>markAsRead(data.id, data.data.url + data.data.key)}
                            <div className="col-sm-2 col-lg-2 my-auto">
                            { data.sender_id ?
                                ( data.notification_sender_data && data.notification_sender_data.profile && data.notification_sender_data.profile.profile_pic_url ?
                                    <img className="avatar-sm rounded-circle" alt="Image placeholder" src={`/argon/img/profile/${data.notification_sender_data.profile.profile_pic_url}`}/>
                                    :
                                    <img className="avatar-sm rounded-circle" alt="Image placeholder" src="/argon/img/profile/default.jpg"/>
                                ) :
                                <img style={{height:'40px', width:'40px'}} alt="Image placeholder" src="/argon/img/brand/epidato.png"/>
                            }
                        </div> */}
                        <div className="col-sm-2 col-lg-2 my-auto">
                            <i className="las la-file-export fa-2x text-white bg-gradient-purple rounded-circle py-2 px-2"></i>
                        </div>
                        <div className="col text-break text-wrap flex-row">
                            {/* <small className="text-muted"><i className={data.data.icon}></i>&nbsp;{moment(data.created_at).fromNow()}</small><br/> */}
                            <small className="font-weight-600 keep-all text-darker"><i className="las la-user"></i>&nbsp;{data && data.id ? data.name : '-'}</small>
                            <p className="text-uppercase"><i className="las la-file-alt"></i>&nbsp;<span className="badge badge-pill badge-purple">{'dsn : '}{data && data.id ? data.document_number : '-'}</span></p>
                            <small className="text-muted mt-0" style={{fontSize:'0.7em'}}><i className="las la-clock"></i>&nbsp;Queued&nbsp;{data && data.queued_at ?  moment(data.queued_at).fromNow() : '-'}</small>
                        </div>
                        <div className="col-auto my-auto">
                            <button className="btn-icon" onClick={()=>removeQueue(data.id)}><i className="las la-trash-alt fa-2x"></i></button>
                        </div>
                    </div>
                </a>
                ))
            )
        : null
    }

    const notificationLink = () => {
        return (
            <Fragment>
                <div className={`notification-dropdown ${isDropdownOpen ? null : 'd-none'}`} style={{zIndex:99999}} style={{maxHeight:'90vh'}}>
                    <div className="dropdown-header text-muted" style={{position:'sticky'}}>
                        <p className="ls-1 text-uppercase text-dark font-weight-600" style={{fontSize:'12px'}}><span className="text-purple font-weight-600" style={{fontSize:'16px'}}>QUEUE</span> LIST</p>
                    </div>
                    <div className="mt-1 dropdown-divider"></div>
                        <div style={{maxHeight:'70vh', overflowY:'auto'}}>
                            {notificationData()}
                        </div>
                    <div className="dropdown-divider"></div>
                    <div className="card-footer py-1">
                        <div className="row">
                            <div className="col text-center">
                                <small className="text-purple font-weight-600">View All Queue</small>
                            </div>
                            <div className="col text-center">
                                <small className="text-darker font-weight-600">Reset Queue</small>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }

    const notificationBell = () => {
        return (
            <li ref={ref} key={key} className="nav-item dropdown mr-4" onClick={() => {setDropdownOpen(true)}}>
                {
                    dispatchQueues.length > 0
                    ?
                        <a className={`nav-link float-right badge-notification ${props.color}`} href="#" data-badge={dispatchQueues.length}>
                            <i className="las la-tasks fa-2x"></i>
                        </a>
                    :   <a className={`nav-link float-right badge-notification ${props.color}`} href="#">
                            <i className="las la-tasks fa-2x"></i>
                        </a>
                }
                {notificationLink()}
            </li>
        )
    }

    function useOnClickOutside(ref, handler) {
        useEffect(() => {

            const listener = event => {
                // Do nothing if clicking ref's element or descendent elements
                if (!ref.current || ref.current.contains(event.target)) {
                return;
                }

                handler(event);
            };

            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);

            return () => {
              document.removeEventListener('mousedown', listener);
              document.removeEventListener('touchstart', listener);
            };
          }, [ref, handler] );
      }

    return (
        <Fragment>
            { notificationBell() }
            {/* <p className="text-darker">{isDropdownOpen ? "true" : "false"}</p> */}
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

export default DocumentQueue;
