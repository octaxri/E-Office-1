import Axios from 'axios';
import moment from 'moment';
import React, { useState, useContext, useEffect, useCallback, useMemo, Fragment, useRef, createRef } from 'react';
import FadeIn from 'react-fade-in';
import Lottie from 'react-lottie';
import { Link, Redirect, useHistory } from 'react-router-dom';
import * as loading from "../../components/notification-loading.json"

const UserNotification = (props) => {
    moment.locale('id');

    let [notification, setNotification] = useState([]);
    let [counter, setCounter] = useState(Number);
    let [key, setKey] = useState(1);
    const refresh = () => setKey(key + 1);
    let [isDropdownOpen, setDropdownOpen] = useState(false);
    let ref = useRef();
    let [isReady, setReady] = useState(false);
    let [unreadNotificationCount,setUnreadNotificationCount] = useState(Number);
    let history = useHistory();

    useOnClickOutside(ref, () => setDropdownOpen(false));

    useEffect(() => {
        Axios.get('/api/notification/counter')
            .then(res => {setCounter(res.data)})
    }, [])

    function getNotification(){
        setReady(false);
        Axios.get('/api/notification/all-notification')
            .then(res => {setNotification(res.data), setReady(true)})
    }

    const markAsRead = (id, url) => {
        Axios.get('/api/notification/test', {
            params: {
                id: id
                }
            })
        // .then(res => {setNotification(res.data), setCounter(counter - 1)})
        .then(res => {console.log(res.data), history.push(url);})
    }

    const notificationData = () => {
         return isDropdownOpen ? (
                notification.map((data , keyCustom) => (
                <a href="#" className={`dropdown-item py-3 ${data.read_at ? 'bg-white' : 'bg-secondary'}`} to={data.data.url + data.data.key} key={keyCustom} style={{zIndex:99999}} onClick={()=>markAsRead(data.id, data.data.url + data.data.key)}>
                    <div className="row">
                        <div className="col-sm-2 col-lg-2 my-auto">
                            { data.sender_id ?
                                ( data.notification_sender_data && data.notification_sender_data.profile && data.notification_sender_data.profile.profile_pic_url ?
                                    <img className="avatar-sm rounded-circle" alt="Image placeholder" src={`/argon/img/profile/${data.notification_sender_data.profile.profile_pic_url}`}/>
                                    :
                                    <img className="avatar-sm rounded-circle" alt="Image placeholder" src="/argon/img/profile/default.jpg"/>
                                ) :
                                <img style={{height:'40px', width:'40px'}} alt="Image placeholder" src="/argon/img/brand/epidato.png"/>
                            }
                        </div>
                        <div className="col-sm-8 col-lg-9 text-break text-wrap flex-row">
                            <small className="text-muted"><i className={data.data.icon}></i>&nbsp;{moment(data.created_at).fromNow()}</small><br/>
                            <small className="font-weight-600 keep-all text-darker"><b>{data.notification_sender_data ? data.notification_sender_data.name : null}</b>&nbsp;{data.data.message}</small>
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
                <div className={`notification-dropdown ${isDropdownOpen ? null : 'd-none'}`} style={{zIndex:99999}} style={{maxHeight:'90vh', overflowY:'auto'}}>
                    <div className="dropdown-header text-muted" style={{position:'sticky'}}>
                        <p className="ls-1 text-uppercase text-dark" style={{fontSize:'12px'}}>notifikasi</p>
                    </div>
                    <div className="mt-1 dropdown-divider"></div>
                    { isReady ?
                        notificationData()
                        :
                        <FadeIn>
                            <div className="d-flex justify-content-center align-items-center mb-1">
                                <Lottie options={defaultOptions} height={50} width={50} />
                            </div>
                            <h5 className="text-center text-dark text-uppercase ls-2">Menyiapkan Notifikasi</h5>
                        </FadeIn>
                    }
                    <div className="card-footer">
                        <small className="text-center text-primary">mark all as read</small>
                    </div>
                </div>
            </Fragment>
        )
    }

    const notificationBell = () => {
        return (
            <li ref={ref} key={key} className="nav-item dropdown mr-4" onClick={() => {setDropdownOpen(true), (isDropdownOpen ? null : getNotification()), refresh()}}>
                {
                    counter > 0
                    ?
                        <a className={`nav-link float-right badge-notification ${props.color}`} href="#" data-badge={counter}>
                            <i className="fas fa-bell fa-2x"></i>
                        </a>
                    :   <a className={`nav-link float-right badge-notification ${props.color}`} href="#">
                            <i className="fas fa-bell fa-2x"></i>
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

export default UserNotification;
