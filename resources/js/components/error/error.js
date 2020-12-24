import React, { Fragment } from 'react';

const ErrorPage = (props) => {
    return (
        <Fragment>
                <div className="col justify-content-center text-center my-auto">
                    <img className="img-fluid" src="/argon/img/error/error.png"/>
                    <h2 className="text-primary text-capitalize">{props.error}</h2>
                </div>
        </Fragment>
    );
};

export default ErrorPage;
