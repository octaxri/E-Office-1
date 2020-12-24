import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import cookie from 'js-cookie';
import UserNotification from '../components/notification/notification';
import Axios from 'axios';

class AuthNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            biography: {}
        };
    }

    handleLogout = (e) => {
        e.preventDefault();
        Axios.post('/api/auth/logout').then(cookie.remove('token'))
        this.props.logout();
    }

    componentDidMount = async () => {
        await Axios.get('/api/biography')
            .then(res => this.setState({biography : res.data}))
    }

    render() {
        let authUser = this.props.user;
        // console.log(authUser)
        return (
            <nav className="navbar navbar-top navbar-expand-md navbar-light bg-white border-bottom d-sm-none d-lg-block shadow" id="navbar-main">
                <div className="container-fluid">
                <button className="btn btn-outline-darker" onClick={() => this.props.history.goBack()}><i className="fas fa-chevron-circle-left"></i> <span className="ls-2"> BACK</span></button>
                <div className="navbar-search navbar-search-dark mr-3 d-none d-md-flex ml-lg-auto"></div>
                    {/* <a className="h4 mb-0 text-uppercase d-none d-lg-inline-block" href="#">Home</a> */}
                    <ul className="navbar-nav align-items-end d-none d-md-flex">
                    <UserNotification color={'text-gray'}/>
                        <li className="nav-item dropdown">
                            <a className="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <div className="media align-items-center">
                                    <span className="avatar avatar-sm rounded-circle">
                                    { this.state.biography && this.state.biography.profile_pic_url ?
                                        <img alt="Image placeholder" src={`/argon/img/profile/${this.state.biography.profile_pic_url}`}/>
                                        :
                                        <img alt="Image placeholder" src={`/argon/img/profile/default.jpg`}/>
                                    }
                                    </span>
                                    <div className="media-body ml-2 d-lg-block">
                                        <span className="mb-0 text-sm font-weight-bold text-darker">{authUser.me.name}</span>
                                    </div>
                                </div>
                            </a>
                            <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
                                <div className=" dropdown-header noti-title">
                                    <h6 className="text-overflow m-0">Welcome!</h6>
                                </div>
                                <div className="dropdown-divider"></div>
                                {
                                    this.props.loggedIn
                                    ?
                                    <Link to="/logout" className="dropdown-item" onClick={this.handleLogout}>
                                        <i className="ni ni-user-run"></i>
                                        <span>Logout</span>
                                    </Link>
                                    :
                                    null
                                }

                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

let mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        user: state.auth.user
    };
};

let mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch({type:"SET_LOGOUT"})
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthNavbar));

