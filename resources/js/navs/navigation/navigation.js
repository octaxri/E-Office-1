import React, { Component } from 'react';
import {withRouter} from 'react-router';

const Navigation = ({history, location}) => (
    <div className="mb-4 bg-secondary mx--4 d-lg-none" style={{position:'sticky',top:0, zIndex:3}}>
        <button className="mt-3 mb-2 btn btn-white mx-4 d-lg-none" onClick={() => history.goBack()}><i className="fas fa-chevron-circle-left"></i> <span className="ls-2"> BACK</span></button>
    </div>
);

export default withRouter(Navigation);
