import React from 'react';
import { Route, Redirect } from "react-router-dom";
import cookie from 'js-cookie';
import { connect } from 'react-redux';


const AuthRoute = ({ component : Component, ...rest }) => {
    // console.log(rest.loggedIn);
    // let token = cookie.get('token')
    return (
      <Route {...rest} render={ props => rest.loggedIn
        ?
            ( <Component { ...props } /> )
        :
            ( <Redirect to={{ pathname: "/", state: { from: props.location } }} /> )
            // window.location.replace("/")
        }
      />
    );
}

let mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn
    };
};

export default connect(mapStateToProps)(AuthRoute);
