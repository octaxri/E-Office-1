import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import Fade from 'react-reveal/Fade';
import Axios from 'axios';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';

const ReqReceiverContainer = ({id, receiverList, textSearch, toggle, response, message, active, overlayMessage, handleChangeFilter}) => {

    let [submitActive, setSubmitActive] = useState(false);
    let history = useHistory();

    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        active(true), overlayMessage('Processing Request...')
        await Axios.post('/api/speech-request/dispatch-request', data)
                .then(res => {
                    res.data.success ?
                    setTimeout(() => {
                        active(false);
                        toggle(), response(true), message(res.data.success)
                        setTimeout(() => {
                            history.push('/speech-request/all-request')
                        }, 2000)
                    }, 2000) :
                    // console.log(res.data);
                    setTimeout(() => {
                        // console.log(data)
                        active(false);
                        response(false), toggle(), message(res.data.error)
                    }, 2000)
                })
    };

    const renderReceiver = () => {
        return(
            receiverList.filter(user => user.user_data.name.toUpperCase().includes(textSearch.toUpperCase())).map(receiver => (
                <label key={receiver.user_id} className="hover my-0 py-0" style={{width:'100%'}}>
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
                </label>
            ))
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
                            <Fade bottom>
                                {renderReceiver()}
                            </Fade>
                        </div>
                        <div className="card-input-form bg-lighter px-4 px-lg-3">
                            <small className="text-yellow-calm font-weight-600 ls-1" style={{fontSize: '0.7em'}}>Message :</small>
                            <textarea className="form-control my-2 text-dark" name="message" rows="3" placeholder="Write your Message or Note here..." ref={register}></textarea>
                            <button type="submit" className="btn bg-yellow-calm btn-block" disabled={submitActive == false ? true : false}>
                                <span className="text-uppercase text-white ls-2">dispatch request</span>
                            </button>
                        </div>
                </form>
            </>
        )
    }

    const renderReject = () => {
        return (
                receiverList.filter(user => user.user_data.name.toUpperCase().includes(textSearch.toUpperCase())).map(receiver => (
                <label key={receiver.user_id} className="hover my-0 py-0" style={{width:'100%'}}>
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
                </label>
        )))
    }

    const rejectComponent = () => {
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" name="id" value={id} ref={register}/>
                    <div className="card-input-body bg-lighter mx-lg-0 mx-4" style={{height: '50vh', overflowY:'auto'}}>
                        <Fade bottom>
                            {renderReject()}
                        </Fade>
                    </div>
                    <div className="card-input-form bg-lighter px-4 px-lg-3">
                        <small className="text-yellow-calm font-weight-600" style={{fontSize: '0.7em'}}>Message :</small>
                        <textarea className="form-control my-2 text-dark" name="message" rows="3" placeholder="Reason of document rejection or Return..." ref={register}></textarea>
                        <button type="submit" className="btn bg-red btn-block" disabled={submitActive == false ? true : false}>
                            <span className="text-uppercase text-white ls-2">submit</span>
                        </button>
                    </div>
            </form>
        )
    }

    return (
        <>
            <Fade right>
                <div className="col-lg-4 col-sm-10 bg-lighter mx-0 px-0">
                <div className="bg-lighter position-lg-fixed position-sm-absolute shadow" style={{minHeight:'calc(90vh)',maxHeight:'calc(100vh)', minWidth:'27vw', maxWidth:'100%'}}>
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
                            <div className="tab-pane show active" id="receiver-tab-content" role="tabpanel" aria-labelledby="receiver-tab-title">
                                {receiverComponent()}
                            </div>
                            <div className="tab-pane" id="reject-tab-content" role="tabpanel" aria-labelledby="reject-tab-title">
                            {rejectComponent()}
                            {/* <div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input type="hidden" name="id" value={id} ref={register}/>
                                    <div className="card-input-body bg-lighter mx-lg-0 mx-4" style={{height: '50vh', overflowY:'auto'}}>
                                        {renderReject()}
                                    </div>
                                    <div className="card-input-form bg-lighter px-4 px-lg-3">
                                        <small className="text-uppercase text-muted font-weight-600" style={{fontSize: '0.7em'}}>message :</small>
                                        <textarea className="form-control my-2 text-dark" name="message" rows="3" placeholder="Reason of document rejection or Return..." ref={register}></textarea>
                                        <button type="submit" className="btn bg-yellow-calm btn-block" disabled={submitActive == false ? true : false}>
                                            <span className="text-uppercase text-white ls-2">dispatch request</span>
                                        </button>
                                    </div>
                            </form>
                            </div> */}
                        </div>
                    </div>
                </div>
                </div>
                </Fade>
        </>
    )
}

export default ReqReceiverContainer
