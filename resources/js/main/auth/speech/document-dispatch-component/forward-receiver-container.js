import React, { useState, useContext, useEffect, useCallback, useMemo, Fragment } from 'react';
import Fade from 'react-reveal/Fade';
import Axios from 'axios';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';

const FwdReceiverContainer = ({id, textSearch, toggle, response, message, active, overlayMessage, handleChangeFilter, userData, permissions, apiState}) => {

    let [submitActive, setSubmitActive] = useState(false);
    let [receiverList, setReceiverList] = useState([]);
    let [returnTo, setReturnToData]     = useState([]);
    let history = useHistory();

    useEffect(()=> {
        getData()
    }, [])

    const onFileChange = (event) => {
        setFile(event.target.files[0]);
        setFileName(event.target.files[0].name)
        // console.log(event.target.files[0].name)
    }

    const getData = async () => {
        await Axios.get("/api/dispatch/send-to?id=" + id)
            .then(res => {
                setReceiverList(res.data)
                apiState('receiver')
                // console.log(res.data)
            })

        await Axios.get('/api/dispatch/send-back-to?id=' + id)
            .then(res => {
                setReturnToData(res.data)
                apiState('previous document sender')
            })
    }

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        let formData = new FormData();
        formData.append('id', data.id);
        formData.append('to', data.to);
        formData.append('order', data.order);
        formData.append('message', data.message);
        formData.append('file', file);
        // console.log(data)
        setOverlayActive(true)
            Axios.post('/api/dispatch/dispatch-forward' , formData)
                .then(res => {
                    res.data.success ?
                    setTimeout(() => {
                        setOverlayActive(false);
                        toggle(), response(true), message(res.data.success)
                        setTimeout(() => {
                            history.push('/dispatch');
                        }, 2000)
                    }, 2000)
                    :
                    setTimeout(() => {
                        setOverlayActive(false);
                        response(false), toggle(), message(res.data.error)
                    }, 2000)
                })
    };

    // const dispatchForm = () => {
    //     return(
    //         <Fragment>
    //             <form onSubmit={handleSubmit(onDispatch)}>
    //                 <div className="card bg-dark">
    //                     <div className="card-header bg-darker">
    //                         <small className="text-white ls-2 text-uppercase">disposisikan kepada :</small>
    //                             <div className="my-2" key="2">
    //                                 <input className="material-input-inverse bg-dark" type="text" name="search" placeholder="Find User..." onChange={() => handleChangeFilter(event) }/>
    //                                 <span className="highlight-inverse"></span>
    //                                 <span className="bar-inverse"></span>
    //                             </div>
    //                     </div>
    //                     <input type="hidden" name="id" value={id} ref={register}/>
    //                     <input type="hidden" name="order" value={receiverList.current_order} ref={register}/>
    //                     <div className="card-body px-4 py-3" style={{minHeight: '20vh', maxHeight: '70vh', overflowY:'auto'}}>
    //                         { speech.is_true === 1 ? renderOriginReceiver() : renderReceiver()}
    //                     </div>

    //                     <div className="card-footer bg-darker px-2">
    //                         {uploadPDF()}
    //                         <textarea className="form-control bg-dark my-2" name="message" rows="3" placeholder="Pesan Anda" ref={register}></textarea>
    //                         {
    //                             receiverList.sign_allowed === 1 ?
    //                             <button type="submit" className="btn btn-success text-white btn-block" disabled={submitActive == false ? true : false}>
    //                                 <span className="text-uppercase ls-2">tanda tangan & disposisi</span>
    //                             </button>
    //                             :
    //                             <button type="submit" className="btn btn-success text-white btn-block" disabled={submitActive == false ? true : false}>
    //                                 <span className="text-uppercase ls-2">disposisi</span>
    //                             </button>
    //                         }
    //                     </div>
    //                 </div>
    //             </form>
    //         </Fragment>
    //     )
    // }

    // const renderReceiver = () => {
    //     console.log(receiverList.user)
    //     return(
    //         receiverList.user ?
    //             receiverList.user.filter(user => user.user_data.name.includes(textSearch)).map(receiver => (
    //                 receiver.role_id === 1 ?
    //                     <label key={receiver.user_id} className={""} style={{width:'100%'}}>
    //                         {receiverContent(receiver)}
    //                     </label>
    //                     :
    //                     receiver.user_data.field ?
    //                         receiver.user_data.field.field_id === props.user.field.data.field_id
    //                             ?
    //                             <label key={receiver.user_id} className={"hover mb-3"} style={{width:'100%'}}>
    //                                 {receiverContent(receiver)}
    //                             </label>
    //                             :
    //                             null
    //                         :
    //                         null
    //             ))
    //             :
    //         <p className="text-white text-center">data tidak ditemukan</p>
    //     )
    // }

    const receiverContent = (receiver) => {
        return(
            <Fragment key={receiver.user_id}>
                <input type="radio" name="to" className="card-input-element-outline" value={receiver.user_id} ref={register} onChange={e => setSubmitActive(true)}/>
                    <div className="card-input py-3" style={{height:'80px'}} >
                        <div className="container-fluid card-cs">
                            <div className="row">
                                <div className="col">
                                    <div className="row">
                                        <div className="col-auto my-auto">
                                            { receiver.user_data.profile
                                                ?
                                                <img className="avatar-sm rounded-circle" alt="Image placeholder" src={`/argon/img/profile/${receiver.user_data.profile.profile_pic_url}`}/>
                                                :
                                                <img className="avatar-sm rounded-circle" alt="Image placeholder" src="/argon/img/profile/default.jpg"/>
                                            }
                                        </div>
                                        <div className="col my-auto">
                                            <span className="text-darker" style={{fontSize: '1em'}}>{receiver.user_data.name}</span><br/>
                                            <span className="text-yellow-calm text-uppercase ls-2" style={{fontSize: '0.6em'}}>{receiver.role_data.name}</span>
                                        </div>
                                    </div>
                                </div>
                            <div className="col-auto icon text-center"></div>
                        </div>
                    </div>
                </div>
            </Fragment>
         )
     }

    // const renderOriginReceiver = () => {
    //     return(
    //         receiverList.user ?
    //             receiverList.user.filter(origin => origin.user_id === request.origin.id).map(receiver => (
    //                 <label key={receiver.user_id} className={"card-lift-sm--hover mb-3"} style={{width:'100%'}}>
    //                     {receiverContent(receiver)}
    //                 </label>
    //             ))
    //         :
    //         <p className="text-white text-center">data tidak ditemukan</p>
    //     )
    // }

    const renderReceiver = () => {
        return(
            receiverList.user ?
            receiverList.user.filter(user => user.user_data.name.toUpperCase().includes(textSearch.toUpperCase())).map((receiver, index) => (
                receiver.role_id === 1 ?
                <Fade bottom key={key}>
                    <label className="hover my-0 py-0" style={{width:'100%'}} key={index} >
                        {receiverContent(receiver)}
                    </label>
                </Fade>
                :
                (
                    receiver.user_data.field
                    ?
                        (
                            receiver.user_data.field.field_id === userData.field.data.field_id
                            ?
                            <Fade bottom key={index}>
                                <label className={"hover my-0 py-0"} style={{width:'100%'}} key={index}>
                                    {receiverContent(receiver)}
                                </label>
                            </Fade>
                            :
                            null
                        )
                    :
                    null
                )
            ))
            :
            <p className="text-center text-yellow-calm">Loading User Data..</p>
            // <Fragment></Fragment>
        )
    }

    const uploadPDF = () => {
        return(
            <Fragment>
            <div className="row">
                <div className="col d-inline-flex">
                {
                    permissions.filter(permission => permission.permission_id === 9).map(filteredPermission => (
                        filteredPermission ?
                            <Fragment key={filteredPermission.id}>
                                <label class="btn btn-sm btn-outline-white btn-file">
                                    <span className="ls-2 text-uppercase font-weight-600" style={{fontSize:'0.7em'}}><i className="fas fa-file-pdf text-white"></i> Upload</span>
                                    <input ref={register} type="file" name="file" id="file" style={{display:'none'}} onChange={onFileChange}/>
                                </label>
                                { fileName ?
                                    <div className="row">
                                        <div className="col d-inline-flex">
                                            <p className="text-white" style={{fontSize: '0.7em'}}>&nbsp;{fileName}</p>
                                        </div>
                                    </div>
                                : null
                                }
                            </Fragment>
                        :
                        null
                    ))
                }
                </div>
            </div>
            </Fragment>
        )
    }

    const receiverComponent = () => {
        return (
            <>
                <div className="container-fluid my-2" key="2">
                    <input className="material-input-inverse bg-lighter" type="text" name="search" placeholder="Find User..." onChange={()=>handleChangeFilter(event)}/>
                    <span className="highlight-inverse"></span>
                    <span className="bar-inverse"></span>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" name="id" value={id} ref={register}/>
                        <div className="card-input-body bg-lighter mx-lg-0 mx-4" style={{minHeight: '10vh',height: '50vh', overflowY:'auto'}}>
                                {renderReceiver()}
                        </div>
                        <div className="card-input-form bg-lighter px-4 px-lg-3">
                            {/* <small className="text-yellow-calm font-weight-600 ls-1" style={{fontSize: '0.7em'}}>Message :</small> */}
                            {uploadPDF()}
                            <textarea className="form-control my-2 text-dark" name="message" rows="3" placeholder="Write your Message or Note here..." ref={register}></textarea>
                            <button type="submit" className="btn bg-yellow-calm btn-block" disabled={submitActive == false ? true : false}>
                                <span className="text-uppercase text-white ls-2">dispatch request</span>
                            </button>
                        </div>
                </form>
            </>
        )
    }

    // const renderReject = () => {
    //     return (
    //             receiverList.user.filter(user => user.user_data.name.toUpperCase().includes(textSearch.toUpperCase())).map(receiver => (
    //             <label key={receiver.user_id} className="hover my-0 py-0" style={{width:'100%'}}>
    //                 <input type="radio" name="to" className="card-input-element-outline" value={receiver.user_id} ref={register} onChange={e => setSubmitActive(true)}/>
    //                     <div className="card-input py-3" style={{height:'80px'}} >
    //                         <div className="container-fluid card-cs">
    //                             <div className="row">
    //                                 <div className="col">
    //                                     <div className="row">
    //                                         <div className="col-auto my-auto">
    //                                             { receiver.user_data.profile
    //                                                 ?
    //                                                 <img className="avatar-sm rounded-circle" alt="Image placeholder" src={`/argon/img/profile/${receiver.user_data.profile.profile_pic_url}`}/>
    //                                                 :
    //                                                 <img className="avatar-sm rounded-circle" alt="Image placeholder" src="/argon/img/profile/default.jpg"/>
    //                                             }
    //                                         </div>
    //                                         <div className="col my-auto">
    //                                             <span className="text-darker" style={{fontSize: '1em'}}>{receiver.user_data.name}</span><br/>
    //                                             <span className="text-yellow-calm text-uppercase ls-2" style={{fontSize: '0.6em'}}>{receiver.role_data.name}</span>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             <div className="col-auto icon text-center"></div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </label>
    //     )))
    // }

    // const rejectComponent = () => {
    //     return (
    //         <form onSubmit={handleSubmit(onSubmit)}>
    //             <input type="hidden" name="id" value={id} ref={register}/>
    //                 <div className="card-input-body bg-lighter mx-lg-0 mx-4" style={{height: '50vh', overflowY:'auto'}}>
    //                     <Fade bottom>
    //                         {renderReject()}
    //                     </Fade>
    //                 </div>
    //                 <div className="card-input-form bg-lighter px-4 px-lg-3">
    //                     <small className="text-yellow-calm font-weight-600" style={{fontSize: '0.7em'}}>Message :</small>
    //                     <textarea className="form-control my-2 text-dark" name="message" rows="3" placeholder="Reason of document rejection or Return..." ref={register}></textarea>
    //                     <button type="submit" className="btn bg-red btn-block" disabled={submitActive == false ? true : false}>
    //                         <span className="text-uppercase text-white ls-2">submit</span>
    //                     </button>
    //                 </div>
    //         </form>
    //     )
    // }

    return (
        <>
            {/* <Fade right> */}
                <div className="col-lg-3 col-sm-12 bg-lighter mx-0 px-0 position-lg-fixed position-sm-absolute shadow" style={{minHeight:'calc(90vh)',maxHeight:'calc(100vh)', right:'0px'}}>
                <div className="bg-lighter" style={{minWidth:'27vh', maxWidth:'100%'}}>
                    <div className="card-header bg-lighter">
                        {/* <div className="nav-wrapper"> */}
                            <ul className="nav justify-content-between" id="receiver-tab" role="tablist">
                                <li className="nav-item text-left">
                                    <a
                                        className="mb-sm-3 mb-md-0 active"
                                        id="receiver-tab-title"
                                        data-toggle="tab"
                                        href="#receiver-tab-content"
                                        role="tab"
                                        aria-controls="tabs-icons-text-1"
                                        aria-selected="true"
                                    >
                                        <h4 className="text-darker text-uppercase ls-1"><span className="text-yellow-calm">dispatch</span> to :</h4>
                                    </a>
                                </li>
                                <li className="text-right">
                                    <a
                                        className="mb-sm-3 mb-md-0"
                                        id="reject-tab-title"
                                        data-toggle="tab"
                                        href="#reject-tab-content"
                                        role="tab"
                                        aria-controls="reject-tab-content"
                                        aria-selected="false"
                                    >
                                        <h4 className="text-darker text-uppercase ls-1"><span className="text-yellow-calm">return</span> to :</h4>
                                    </a>
                                </li>
                            </ul>
                        {/* </div> */}
                    </div>
                    <div className="tab-content" id="myTabContent">
                            <div className="tab-pane active" id="receiver-tab-content" role="tabpanel" aria-labelledby="receiver-tab-title">
                                {receiverComponent()}
                            </div>
                            <div className="tab-pane" id="reject-tab-content" role="tabpanel" aria-labelledby="reject-tab-title">
                                {/* {rejectComponent()} */}
                        </div>
                    </div>
                </div>
                </div>
                {/* </Fade> */}
        </>
    )
}

export default FwdReceiverContainer
