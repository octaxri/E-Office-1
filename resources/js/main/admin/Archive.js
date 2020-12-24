import React, { useState, useContext, useEffect, useCallback, useMemo, Fragment } from 'react';
import ModalSuccess from '../../components/modal/modal-success';
import LoadingOverlay from 'react-loading-overlay';
import Auth from '../../navs/auth/Auth';
import FadeIn from 'react-fade-in';
import Lottie from 'react-lottie';
import Navigation from '../../navs/navigation/navigation';
import * as loading from "../../components/loading.json"
import Axios from 'axios';
import useModal from '../../components/modal/hook-modal';
import { Link } from 'react-router-dom';
import Navbar from '../../navs/Navbar';

const Archive = () => {
    let [userList,setUserList] = useState([]);
    let [permissions, setPermissions] = useState([]);
    let [ready, setReady] = useState(false);
    let [overlayActive, setOverlayActive] = useState(false);

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        await Axios.get('/api/permissions/user-permissions')
            .then(res => {
                setPermissions(res.data),
                Axios.get('/api/admin/writer-list')
                    .then(res => setUserList(res.data)),

                setReady(true)
            })
            .catch( error => {setPermissions(error.response.data), setReady(true)} )
    }

    const tableRow = () => {
        return userList.map(user => (
                <Fragment>
                    <tr className="my-4">
                        <th scope="row">
                            <div className="media align-items-center">
                                { user.user_data.profile && user.user_data.profile.profile_pic_url ?
                                    <img className="avatar-sm rounded-circle" alt="Image placeholder" src={`/argon/img/profile/${user.user_data.profile.profile_pic_url}`}/>
                                    :
                                    <img className="avatar-sm rounded-circle" alt="Image placeholder" src={`/argon/img/profile/default.jpg`}/>
                                }
                                <div className="media-body">
                                    <span className="name mb-0 text-sm">&emsp;{user.user_data.name}</span>
                                </div>
                            </div>
                        </th>
                        <td className="align-items-center">
                            {user.speech_written}
                        </td>
                        <td className="align-items-center">
                            <Link to={{ pathname: `/admin/archive-detail/${user.user_data.id}`, id: user.user_data.id }} className="btn btn-darker text-uppercase"><span className="ls-2">Detail</span></Link>
                        </td>
                    </tr>
                </Fragment>
            )
        )
    }

    const renderMainContent = () => {
        return (
            <Fragment>
                <div className="col-lg-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table align-items-center">
                                    <thead className="bg-darker text-white">
                                        <tr>
                                            <th scope="col" className="sort">Nama Lengkap</th>
                                            <th scope="col" className="sort">Jumlah Pidato ditulis</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="list bg-dark text-white">
                                        {tableRow()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-body">

                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }

    const {isShowing, toggle, response, isSuccess, message, isMessage, dismiss, allowDismiss} = useModal();

    return (
        <Fragment>
            <ModalSuccess isShowing={isShowing} hide={toggle} response={isSuccess} message={isMessage} allowDismiss={allowDismiss}/>
            <LoadingOverlay active={overlayActive} spinner={ <Lottie options={defaultOptions} height={120} width={120} /> } text='MEMPROSES DATA'>
                <Auth/>
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
                                        { permissions.error ? <Error error={permissions.error}/> : renderMainContent()}
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
}

export default Archive;
