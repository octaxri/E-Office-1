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
import { useForm } from 'react-hook-form';

const AllUser = () => {
    let [userList,setUserList] = useState([]);
    let [permissions, setPermissions] = useState([]);
    let [ready, setReady] = useState(false);
    let [overlayActive, setOverlayActive] = useState(false);
    const { register, handleSubmit , watch} = useForm();

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        await Axios.get('/api/permissions/user-permissions')
            .then(res => {
                setPermissions(res.data),
                Axios.get('/api/admin/user-list')
                    .then(res => setUserList(res.data)),

                setReady(true)
            })
            .catch(error => {setPermissions(error.response.data), setReady(true)})
    }

    const onAddUser = async (data) => {
        setOverlayActive(true)
        await Axios.post('/api/admin/add-user', data)
            .then(res => {
                setTimeout(() => {
                    setOverlayActive(false);
                    toggle(), response(true), message(res.data.success), dismiss(true)
                }, 2000)
            })
    }

    const tableRow = () => {
        return userList.map(user => (
            <Fragment>
                <tr className="my-4">
                    <th scope="row">
                        <div className="media align-items-center">
                            { user.profile && user.profile.profile_pic_url ?
                                <img className="avatar-sm rounded-circle" alt="Image placeholder" src={`/argon/img/profile/${user.profile.profile_pic_url}`}/>
                                :
                                <img className="avatar-sm rounded-circle" alt="Image placeholder" src={`/argon/img/profile/team-4-800x800.jpg`}/>
                            }
                            <div className="media-body">
                                <span className="name mb-0 text-sm">&emsp;{user.name}</span>
                            </div>
                        </div>
                    </th>
                    <td className="budget">
                        { user.role && user.role.role_data ?
                            user.role.role_data.name
                            :
                            <span className="text-white bg-gradient-dark py-1 px-1 rounded text-uppercase"><small>-</small></span>
                        }
                    </td>
                    <td>
                        { user.occupation && user.occupation.occupation_data ?
                            user.occupation.occupation_data.name
                            :
                            <span className="text-white bg-gradient-dark py-1 px-1 rounded text-uppercase"><small>-</small></span>
                        }
                    </td>
                    <td>
                        { user.field && user.field.field_data ?
                                user.field.field_data.name
                                :
                                <span className="text-white bg-gradient-dark py-1 px-1 rounded text-uppercase"><small>-</small></span>
                            }
                    </td>
                    <td>
                        { user.subfield && user.subfield.subfield_data ?
                                user.subfield.subfield_data.name
                                :
                                <span className="text-white bg-gradient-dark py-1 px-1 rounded text-uppercase"><small>-</small></span>
                            }
                    </td>
                    <td className="align-items-center">
                        <Link to={{ pathname: `/admin/user-detail/${user.id}`, id: user.id }} className="btn btn-darker text-uppercase"><span className="ls-2">Detail</span></Link>
                    </td>
                </tr>
            </Fragment>
        )
    )

    }

    const addUserForm = () => {
        return(
            <Fragment>
                    <div className="col-lg-6">
                        <div className="row">
                            <div className="col-auto">
                                <i className="mt-2 fas fa-list fa-2x px-2 py-2 bg-darker text-white my-auto rounded"></i>
                            </div>
                            <div className="col">
                                <small className="text-muted text-uppercase ls-2" style={{fontSize: '0.7em'}}>data</small>
                                <h2 className="text-darker mt--1">Form tambah User</h2>
                            </div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onAddUser)}>
                                <div class="row">
                                    <div className="col">
                                        <input className="form-control" type="text" name="name" placeholder="Nama User" ref={register}/>
                                    </div>
                                    <div className="col">
                                        <input className="form-control" type="text" name="email" placeholder="Email User" ref={register}/>
                                    </div>
                                    <button type="submit" className="btn btn-success"><span className="ls-2 text-uppercase">submit</span></button>
                                </div>
                            </form>
                        </div>
                    </div>
            </Fragment>
        )
    }

    const renderMainContent = () => {
        return (
            <Fragment>
                <div className="row">
                    {addUserForm()}
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table align-items-center">
                                    <thead className="bg-darker text-white">
                                        <tr>
                                            <th scope="col" className="sort">Nama Lengkap</th>
                                            <th scope="col" className="sort">Role</th>
                                            <th scope="col" className="sort">Jabatan</th>
                                            <th scope="col" className="sort">Bidang</th>
                                            <th scope="col" className="sort">Sub-Bidang</th>
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

                                        { permissions.error ? <Error error={permissions.error}/> : renderMainContent()}

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

export default AllUser;
