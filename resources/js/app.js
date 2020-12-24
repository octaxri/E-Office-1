
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
import uploadImage from './main/profile/uploadImage';
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

let render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <Router>
                <Switch>
                    <Fragment>
                        {/* <Sidebar/> */}
                            {/* <div className="main-content"> */}
                                <GuestRoute exact path='/' component={Welcome}/>
                                <GuestRoute exact path='/register' component={Register}/>
                                <GuestRoute exact path='/document/check' component={documentCheck}/>
                                <GuestRoute exact path='/document/:id' component={documentCheckWParam}/>

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
                                <AuthRoute exact path='/user/upload-image' component={uploadImage}/>

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
        axios.post("/api/profile-data")
        .then(res => {
            store.dispatch({type: "SET_LOGIN", payload: res.data
        });
        render();
    });
}else{
    render();
}


// export default app;







