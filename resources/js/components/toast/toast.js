import React, { Component, Fragment } from 'react';

const Toast = (icon, iconColor, message, messageColor, type) => {
    // props.success === 1 ? color = 'text-primary' : color = 'text-danger'
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-auto mx-auto my-auto">
                        <div className="h-100">
                            <i className={`${icon} ${iconColor}`} style={{fontSize:'40px'}}></i>
                        </div>
                    </div>
                    <div className="col my-auto bg-white">
                        <small className="text-muted ls-2 text-uppercase font-weight-600" style={{fontSize:'0.6em'}}>{type ? type : 'message'}</small><br/>
                        <p className={`${messageColor}`} style={{fontSize:'0.9em'}}>{message}</p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default Toast;
