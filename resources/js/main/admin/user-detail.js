import React, { useState, useEffect, Fragment } from 'react';
import Axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';
import FadeIn from 'react-fade-in';
import Lottie from 'react-lottie';
import useHistory, { useParams, Link } from 'react-router-dom';
import Navigation from '../../navs/navigation/navigation';
import * as loading from "../../components/loading.json"
import ModalSuccess from '../../components/modal/modal-success';
import useModal from '../../components/modal/hook-modal';
import Auth from '../../navs/auth/Auth';
import setActiveSidebar from '../../navs/auth/hook-auth';
import { connect } from 'react-redux';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import Toast from '../../components/toast/toast';
import Navbar from '../../navs/Navbar';

const UserDetail = () => {
    moment.locale('id')
    let [userDetail,setUserDetail] = useState([]);
    let [permissions, setPermissions] = useState([]);

    let [role, setRole] = useState([]);
    let [roleList, setRoleList] = useState([]);
    let [occupation, setOccupation] = useState([]);
    let [occupationList, setOccupationList] = useState([]);
    let [field, setField] = useState([]);
    let [actField, setActField] = useState([]);
    let [fieldList, setFieldList] = useState([]);
    let [subfield, setSubfield] = useState([]);
    let [subfieldList, setSubfieldList] = useState([]);
    let [filteredSubfield, setFilteredSubfield] = useState([]);

    let [ready, setReady] = useState(false);
    let [overlayActive, setOverlayActive] = useState(false);
    const { register, handleSubmit , watch} = useForm();

    let {id} = useParams();

    useEffect(() => {
        getData();
        setActive(0);
    }, [actField]);

    const getData = async () => {
        await Axios.get('/api/permissions/user-permissions')
            .then(res => { setPermissions(res.data) },
                await Axios.get('/api/admin/user-detail?id=' + id)
                    .then(res => {
                        setUserDetail(res.data),
                        (res.data.field && res.data.field.field_id ? setActField(res.data.field.field_id) : null),
                        (res.data.role && res.data.role.role_id ? setRole(res.data.role.role_id) : null)
                    }),

                await Axios.get('/api/admin/role-list')
                    .then(res => setRoleList(res.data)),

                await Axios.get('/api/admin/occupation-list')
                    .then(res => setOccupationList(res.data)),

                await Axios.get('/api/admin/field-list')
                    .then(res => setFieldList(res.data)),

                await Axios.get('/api/admin/subfield-list')
                    .then(res => {
                        setSubfieldList(res.data),
                        actField ? setFilteredSubfield(res.data.filter(subfield => subfield.field_id === Number(actField))) : null
                    }),

                setReady(true)
            )
            .catch(error => setPermissions(error.response.data))

    }

    const onUpdateAccount = (data) => {

    }

    const setActiveField = (e) => {
        const data = subfieldList.filter(subfield => subfield.field_id === Number(e.target.value))
        setFilteredSubfield(data)
    }

    const onUpdateRole = async (data) => {
        const role = {user_id: id, role_id: data.role_id}
        await Axios.post('/api/admin/update-role', role)
            .then(res => {
                !res.data.error ?
                toast(<Toast success={1} message={res.data.success} />) :
                toast(<Toast success={0} message={res.data.error} />)
            })
    }

    const onUpdateField = async (data) => {
        const field = {user_id: id, field_id: data.field_id}
        await Axios.post('/api/admin/update-field', field)
            .then(res => {
                !res.data.error ?
                toast(<Toast success={1} message={res.data.success} />) :
                toast(<Toast success={0} message={res.data.error} />)
            })
    }

    const onUpdateOccupation = async (data) => {
        const occupation = {user_id: id, occupation_id: data.occupation_id}
        await Axios.post('/api/admin/update-occupation', occupation)
            .then(res => {
                !res.data.error ?
                toast(<Toast success={1} message={res.data.success} />) :
                toast(<Toast success={0} message={res.data.error} />)
            })
    }

    const onUpdateSubfield = async (data) => {
        const subfield = {user_id: id, subfield_id: data.subfield_id}
        await Axios.post('/api/admin/update-subfield', subfield)
            .then(res => {
                !res.data.error ?
                toast(<Toast success={1} message={res.data.success} />) :
                toast(<Toast success={0} message={res.data.error} />)
            })
    }

    const dataLabel = ({label, data}) => {
        return(
            <Fragment>
                <div className="my-3">
                    <small className="text-muted text-uppercase ls-2" style={{fontSize: '0.6em'}}>{label}:</small>
                    <p className="text-darker font-weight-600">{data}</p>
                </div>
            </Fragment>
        )
    }

    const dataLabelCenter = ({label, data}) => {
        return(
            <Fragment>
                <div className="my-4 text-center">
                    <small className="text-muted text-uppercase ls-2" style={{fontSize: '0.6em'}}>{label}:</small>
                    <p className="text-primary font-weight-600 text-uppercase ls-1">{data}</p>
                </div>
            </Fragment>
        )
    }

    const materialInput = ({label, name, placeholder, type, value}) => {
        return (
            <Fragment>
                <div className="col-lg-6 col-sm-12 text-center my-auto">
                    <small className="text-darker font-weight-600 text-capitalize text-muted">{label} :</small>
                    <input className="material-input" type={`${type}`} name={`${name}`} placeholder={`${placeholder}`} ref={register} required defaultValue={`${value}`}/>
                    <span className="highlight"></span>
                    <span className="bar"></span>
                </div>
            </Fragment>
        )
    }

    const radio = (datas, checker, name) => {
        return (
            datas.map((data, index) => (
                <Fragment key={index}>
                    <div className="d-inline-flex">
                    {/* onChange={() => setRole()} ref={register} onClick={console.log(data.id)} */}
                        <input type="radio" value={data.id} name={name} className="form-radio" ref={register} defaultChecked={data.id === checker} />
                        <label htmlFor={name}></label><small className="font-weight-500 text-darker mt-1">{data.name}</small>
                    </div><br/>
                </Fragment>
            )))
    }

    const renderMainContent = () => {
        return (
            <Fragment>
                <div className="col-lg-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col text-center">
                                    { userDetail.biography && userDetail.biography.profile_pic_url ?
                                        <img className="rounded-circle" alt="Image placeholder" src={`/argon/img/profile/${userDetail.biography.profile_pic_url}`} style={{maxWidth:'200px', maxHeight:'200px'}}/>
                                        :
                                        <img className="rounded-circle" alt="Image placeholder" src={`/argon/img/profile/default.jpg`} style={{maxWidth:'200px', maxHeight:'200px'}}/>
                                    }
                                </div>
                            </div>
                                {renderAccountForm('data akun')}
                            <div className="row">
                                <div className="col">
                                    {renderRoleForm('data role')}
                                </div>
                                <div className="col">
                                    {renderOccupationForm('data jabatan')}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    {renderFieldForm('data bidang')}
                                </div>
                                <div className="col">
                                    {renderSubfieldForm('data sub-bidang')}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }

    const renderAccountForm = (title) => {
        return (
            <Fragment>
                <h3 className="display-4 text-darker text-uppercase text-center font-weight-600 my-3">{title}</h3>
                <form onSubmit={handleSubmit(onUpdateAccount)}>
                    <div className="row">
                        {materialInput({label:'nama',name:'name',placeholder:'',type:'text',value: userDetail.name})}
                        {materialInput({label:'email',name:'email',placeholder:'',type:'text',value: userDetail.email})}
                    </div>
                    <div className="text-right">
                        <button type="submit" className="btn btn-darker my-3"><span className="text-white text-uppercase ls-2">submit</span></button>
                    </div>
                </form>
            </Fragment>
        )
    }

    const renderRoleForm = (title) => {
        return (
            <Fragment>
                <h3 className="display-4 text-darker text-uppercase text-center font-weight-600 my-3">{title}</h3>
                <form onSubmit={handleSubmit(onUpdateRole)}>
                    <div className="row">
                        <div className="col">
                            {radio(roleList, userDetail.role && userDetail.role.role_id ? userDetail.role.role_id : null , 'role_id')}
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-darker my-3"><span className="text-white text-uppercase ls-2">submit</span></button>
                    </div>
                </form>
            </Fragment>
        )
    }

    const renderOccupationForm = (title) => {
        return (
            <Fragment>
                <h3 className="display-4 text-darker text-uppercase text-center font-weight-600 my-3">{title}</h3>
                <form onSubmit={handleSubmit(onUpdateOccupation)}>
                    <div className="row">
                        <div className="col">
                            {radio(occupationList, userDetail.occupation && userDetail.occupation.occupation_id ? userDetail.occupation.occupation_id : null , 'occupation_id')}
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-darker my-3"><span className="text-white text-uppercase ls-2">submit</span></button>
                    </div>
                </form>
            </Fragment>
        )
    }

    const renderFieldForm = (title) => {
        return (
            <Fragment>
                <h3 className="display-4 text-darker text-uppercase text-center font-weight-600 my-3">{title}</h3>
                <form onSubmit={handleSubmit(onUpdateRole)}>
                    <div className="row">
                        <div className="col">
                            {/* {radio(fieldList, userDetail.field ? userDetail.field.field_id : null, 'field_id')} */}
                            { fieldList.map((data, index) => (
                                <Fragment key={index}>
                                    <div className="d-inline-flex">
                                    {/*  ref={register} onClick={console.log(data.id)} */}
                                        <input type="radio"
                                            value={data.id}
                                            name="field_id"
                                            className="form-radio" ref={register}
                                            defaultChecked={data.id === (userDetail.field && userDetail.field.field_id ? userDetail.field.field_id : null)}
                                            onChange={e => setActiveField(e)}
                                        />
                                        <label htmlFor="field_id"></label><small className="font-weight-500 text-darker mt-1">{data.name}</small>
                                    </div><br/>
                                </Fragment>
                            )) }
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-darker my-3"><span className="text-white text-uppercase ls-2">submit</span></button>
                    </div>
                </form>
            </Fragment>
        )
    }

    const renderSubfieldForm = (title) => {
        return (
            <Fragment>
                <h3 className="display-4 text-darker text-uppercase text-center font-weight-600 my-3">{title}</h3>
                <form onSubmit={handleSubmit(onUpdateSubfield)}>
                    <div className="row">
                        <div className="col">
                            {/* {radio(subfieldList, userDetail.subfield ? userDetail.subfield.subfield_id : null, 'subfield_id')} */}
                            {/* { subfieldList.filter(subfield => subfield.field_id === actField).map((data, index) => (
                                <Fragment key={index}>
                                    <div className="d-inline-flex">
                                        <input type="radio" value={data.id} name="subfield_id" className="form-radio" ref={register} defaultChecked={data.id === (userDetail.subfield && userDetail.subfield.subfield_id ? userDetail.subfield.subfield_id : null)}/>
                                        <label htmlFor="subfield_id"></label><small className="font-weight-500 text-darker mt-1">{data.name}</small>
                                    </div><br/>
                                </Fragment>
                            )) } */}
                            { !filteredSubfield ?
                                null
                                :
                                filteredSubfield.map((data, index) => (
                                    <Fragment key={index}>
                                        <div className="d-inline-flex">
                                            <input type="radio" value={data.id} name="subfield_id" className="form-radio" ref={register} defaultChecked={data.id === (userDetail.subfield && userDetail.subfield.subfield_id ? userDetail.subfield.subfield_id : null)}/>
                                            <label htmlFor="subfield_id"></label><small className="font-weight-500 text-darker mt-1">{data.name}</small>
                                        </div><br/>
                                    </Fragment>
                                ))
                            }
                            {/* {setActiveField()} */}
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-darker my-3"><span className="text-white text-uppercase ls-2">submit</span></button>
                    </div>
                </form>
            </Fragment>
        )
    }

    const subfieldRadio = () => {
        return (
            subfieldList.filter(subfield => subfield.field_id === actField).map((data, index) => (
            <Fragment key={index}>
                <div className="d-inline-flex">
                    <input type="radio" value={data.id} name="subfield_id" className="form-radio" ref={register} defaultChecked={data.id === (userDetail.subfield && userDetail.subfield.subfield_id ? userDetail.subfield.subfield_id : null)}/>
                    <label htmlFor="subfield_id"></label><small className="font-weight-500 text-darker mt-1">{data.name}</small>
                </div><br/>
            </Fragment>
        )))
    }

    const {isShowing, toggle, response, isSuccess, message, isMessage} = useModal();
    const {setActive, menuIsActive} = setActiveSidebar()

    return (
        <Fragment>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
            />
            <ModalSuccess isShowing={isShowing} hide={toggle} response={isSuccess} message={isMessage}/>
            <LoadingOverlay active={overlayActive} spinner={<Lottie options={defaultOptions} height={120} width={120} />} text='MEMPROSES DATA'>
                <Auth active={menuIsActive}/>
                <div className="main-content">
                    <Navbar/>
                    <div className="header pt-md-7 pt-lg-7" ></div>
                        <div className="container-fluid py-4">
                        {
                            ready === false
                            ?
                                <FadeIn>
                                    <h3 className="text-center text-dark text-uppercase ls-2 pt-md-7 pt-sm-7">Menyiapkan Data</h3>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <Lottie options={defaultOptions} height={120} width={120} />
                                    </div>
                                </FadeIn>
                            :
                                <Fragment>
                                    <Navigation />
                                    <div className="row justify-content-center">
                                        { renderMainContent() ?? null }
                                    </div>
                                </Fragment>
                        }
                        </div>
                </div>
            </LoadingOverlay>
        </Fragment>
    );
};

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(UserDetail);
