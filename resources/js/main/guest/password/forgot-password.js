import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import Guest from '../../../navs/guest/Guest';
import { ToastContainer, toast } from 'react-toastify';
import Toast from '../../../components/toast/toast';

const ForgotPassword = (props) => {

    useEffect(()=> {

    }, [])

    const showToast = (e) => {
        e.preventDefault();
        toast(Toast('las la-lock', 'text-danger', 'Reset Password feature is temporarily disabled', 'text-darker'))
    }

    const renderMainContent = () => {
        return (
            <>
                <div className="col-lg-5 col-sm-6 px-3" style={{zIndex:'999'}}>
                    <div className="card bg-lighter shadow px-3">
                        <div className="card-body">
                            <img src="/argon/img/brand/brand.png" className="img-center" alt="" style={{width:'140px', height: '120px'}}/> <br/>
                            <small className="text-yellow calm text-uppercase" style={{fontSize: '30px'}}>Reset <span className="text-darker">password</span></small>
                            {/* <img src="/argon/" alt=""/> */}
                            <p className="my-3 font-weight-600" style={{fontSize: '0.7em'}}>Please fill your email below if you forgot your password</p>
                            <form onSubmit={(e)=>showToast(e)}>
                                <input
                                    className="form-control no-autofill my-4 py-3"
                                    placeholder="Your Email"
                                    type="text"
                                    name="email"
                                    required
                                    // ref={departmentForm}
                                />
                                <button type="submit" className="btn bg-yellow-calm text-uppercase text-white text-center"><span className="ls-2 text-uppercase font-weight-500">submit</span></button>
                            </form>

                        </div>
                        <hr className="py-0 my-2 mx-4"/>
                        <div className="card-footer bg-lighter my-3">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-auto">
                                        <i className="las la-paper-plane text-yellow-calm" style={{fontSize: '60px'}}></i>
                                    </div>
                                    <div className="col">
                                        <small className="text-grey font-weight-600" style={{fontSize: '0.7em'}}>Verification code will be sent via email. If You didn't receive any email, please click submit again in 30 seconds.</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-uppercase text-white text-center my-3" style={{fontSize:'0.8em'}}>open e-office project - 2020</p>
                </div>
            </>
        )
    }

    return (
        <>
            <Guest/>
            <div className="main-content">
                <div className="container-fluid h-100vh bg-yellow-calm">
                    <div className="row h-100 justify-content-center align-items-center">
                        {renderMainContent()}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="position-absolute bottom-0" style={{zIndex:'1'}}>
                            <path fill="#fcc96a" fill-opacity="1" d="M0,288L96,224L192,32L288,224L384,160L480,64L576,288L672,96L768,192L864,288L960,224L1056,32L1152,64L1248,224L1344,0L1440,32L1440,320L1344,320L1248,320L1152,320L1056,320L960,320L864,320L768,320L672,320L576,320L480,320L384,320L288,320L192,320L96,320L0,320Z"></path>
                        </svg>
                    </div>

                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={10000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
            />
        </>
    )
}

export default ForgotPassword
