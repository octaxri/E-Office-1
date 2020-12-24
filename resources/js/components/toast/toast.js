import React, { Component, Fragment } from 'react';

const Toast = (props) => {
    props.success === 1 ? color = 'text-primary' : color = 'text-danger'
    return (
        <Fragment>
            <div className="row">
                <div className="col-auto my-auto mx-auto">
                    <i className={`fa fa-check-square fa-2x ${color}`}></i>
                </div>
                <div className="col">
                    <small className="text-muted ls-2 text-uppercase" style={{fontSize:'0.6em'}}>{props.success === 1 ? 'success' : 'error'}</small><br/>
                    <p className="text-dark ls-1" style={{fontSize:'0.9em'}}>{props.message}</p>
                </div>
            </div>
        </Fragment>
    )
};

export default Toast;
