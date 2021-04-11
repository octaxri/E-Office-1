
require('./bootstrap');

import React, { Component , Fragment } from 'react';
import ReactDOM from 'react-dom'
import {  BrowserRouter as Router, Switch, Route, HashRouter} from 'react-router-dom';

import Welcome from './main/landing/welcome';
import Home from './main/auth/Home';
import Register from './main/guest/register';
import GuestRoute from './route/GuestRoute';
import AuthRoute from './route/AuthRoute';

import store from './store/index';
import { Provider } from 'react-redux';
import axios from 'axios';
import cookie from 'js-cookie';
import jwt from 'jsonwebtoken';
import AccountRequest from './main/auth/account-request/Account-Request';
import Sidebar from './navs/Sidebar';
import AccountRequestData from './main/auth/account-request/Account-Request-Data';
import SpeechRequest from './main/auth/speech/speech-request';
import Dispatch from './main/auth/speech/all-dispatch';
import AllSpeechRequest from './main/auth/speech/all-speech-request';
import SpeechRequestData from './main/auth/speech/speech-request-data';
import ModalSuccess from './components/modal/modal-success';
import test from './components/modal/test';
import dispatchDetail from './main/auth/speech/dispatch-detail';
import Profile from './main/profile/profile';
import Certificate from './main/certificate/certificate';
import dispatchHistory from './main/auth/history/dispatch-history';
import UserDetail from './main/admin/user-detail';
import documentCheck from './main/guest/document-check';
import Archive from './main/admin/Archive';
import ArchiveDetail from './main/admin/Archive-detail';
import UserNotification from './components/notification/notification';
import documentCheckWParam from './main/guest/document-check-w-param';
import SpeechArchive from './main/admin/Speech-Archive';
import AllUser from './main/admin/All-User';
import SpeechArchiveDetail from './main/admin/Speech-Archive-Detail';
import uploadImage from './main/profile/uploadImage';
import Photo from './main/profile/upload';
import UploadImage from './main/profile/uploadImage';
import PdfSign from './main/guest/pdf/pdf-sign-test';
import Signer from './main/guest/pdf';
import About from './main/guest/about/about-me';
import Me from './main/guest/about/me';
import Education from './main/guest/about/education';
import Skills from './main/guest/about/skills';
import PastProjects from './main/guest/about/past-projects';
import 'react-app-polyfill/stable';
import ScrollToTop from './components/scroll/ScrollToTop';
import Resume from './main/guest/about/resume';
import overview from './main/guest/overview/overview';

let token = cookie.get('token');

// let jwt_secret = 'v3hamOUaXKl8IvTVS58JKLTLs09JGRX6lZqxZwgvps5CjTvs0PyFZ5V14rS9n8sO';
let jwt_secret = process.env.MIX_JWT_SECRET;
if(token){
    jwt.verify(token, jwt_secret, function(error, decoded) {
        if(error){
            token = null;
            cookie.remove('token');
        }
        // console.log(decoded);
    });
}

const interceptor = () => {
    axios.interceptors.response.use(
        response => { return response; },
        error => {
            if (
                error.request.responseType === 'blob' &&
                error.response.data instanceof Blob &&
                error.response.data.type &&
                error.response.data.type.toLowerCase().indexOf('json') != -1
            )

            {
                return new Promise((resolve, reject) => {
                    let reader = new FileReader();
                    reader.onload = () => {
                        error.response.data = JSON.parse(reader.result);
                        resolve(Promise.reject(error));
                    };

                    reader.onerror = () => {
                        reject(error);
                    };

                    reader.readAsText(error.response.data);
                });
            };

            return Promise.reject(error);
        }
    );
}

let render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <Router>
            <ScrollToTop />
                <Switch>
                    <Fragment>
                        {/* <Sidebar/> */}
                            {/* <div className="main-content"> */}

                                <GuestRoute exact path='/' component={Welcome}/>
                                {/* <GuestRoute exact path='/register' component={Register}/> */}
                                <GuestRoute exact path='/document/check' component={documentCheck}/>
                                <GuestRoute exact path='/document/:id' component={documentCheckWParam}/>

                                <GuestRoute exact path='/advanced-signing-demo' component={Signer}/>
                                <GuestRoute exact path='/about' component={About}/>
                                <GuestRoute exact path='/about/me' component={Me}/>
                                <GuestRoute exact path='/about/education' component={Education}/>
                                <GuestRoute exact path='/about/skills' component={Skills}/>
                                <GuestRoute exact path='/about/projects' component={PastProjects}/>
                                <GuestRoute exact path='/about/resume' component={Resume}/>
                                <GuestRoute exact path='/overview' component={overview}/>

                                <AuthRoute exact path='/home' component={Home}/>
                                <AuthRoute exact path='/account-request' component={AccountRequest}/>
                                <AuthRoute exact path='/account-request/data/:id' component={AccountRequestData}/>

                                <AuthRoute exact path='/speech-request' component={SpeechRequest}/>
                                <AuthRoute exact path='/speech-request/all-request' component={AllSpeechRequest}/>
                                <AuthRoute exact path='/speech-request/detail/:id' component={SpeechRequestData}/>

                                <AuthRoute exact path='/test' component={test}/>
                                <AuthRoute exact path='/test-notification' component={UserNotification}/>

                                <AuthRoute exact path='/dispatch' component={Dispatch}/>
                                <AuthRoute exact path='/dispatch/detail/:id' component={dispatchDetail}/>

                                <AuthRoute exact path='/user/profile' component={Profile}/>
                                <AuthRoute exact path='/user/upload-image' component={UploadImage}/>
                                <AuthRoute exact path='/user/photo' component={Photo}/>

                                <AuthRoute exact path='/user/certificate' component={Certificate}/>

                                <AuthRoute exact path='/history/dispatch-history' component={dispatchHistory}/>

                                {/* ADMIN */}
                                <AuthRoute exact path='/admin/user-list' component={AllUser}/>
                                <AuthRoute exact path='/admin/user-detail/:id' component={UserDetail}/>
                                <AuthRoute exact path='/admin/archive' component={Archive}/>
                                <AuthRoute exact path='/admin/speech-archive' component={SpeechArchive}/>
                                <AuthRoute exact path='/admin/speech-archive/detail/:id' component={SpeechArchiveDetail}/>
                                <AuthRoute exact path='/admin/archive-detail/:id' component={ArchiveDetail}/>

                            {/* </div> */}
                    </Fragment>
                </Switch>
            </Router>
        </Provider>,
        document.getElementById('app')
    );
};

if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        interceptor()

        axios.post("/api/profile-data")
            .then(res => {
                store.dispatch({type: "SET_LOGIN", payload: res.data});

                axios.get('/api/menu-data')
                    .then(res => {
                        store.dispatch({type: "AUTH_MENU", payload: res.data})
                })
        render();
    });
}else{
    interceptor()
    render();
}


// export default app;







