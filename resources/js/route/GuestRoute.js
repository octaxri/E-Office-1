import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
// import cookie from 'js-cookie';
import { connect } from 'react-redux';

let GuestRoute =({ component : Component, ...rest }) => {

    // let token = cookie.get('token')

    return (
      <Route {...rest}
        render={ props => !rest.loggedIn
          ? (<Component { ...props } />)
          : (
            <Redirect
              to={{
                pathname: "/home",
                state: { from: props.location }
              }}
            />
            // window.location.replace("/home")
          )
        }
      />
    );
}

let mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        user: state.auth.user
    };
};

export default connect(mapStateToProps)(GuestRoute);

// export default GuestRoute;
