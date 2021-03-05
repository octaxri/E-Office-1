import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

class Footer extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="px-0 mt-4 mb-0">
                    <div className={this.props.loggedIn == true ? '' : 'bg-darker'}>
                            <div className="row align-items-center justify-content-xl-between">
                                <div className="col">
                                    <p className="font-weight-bold ml-1 text-darker text-uppercase">{moment().format('YYYY')} - By : Gerardus Yuda Iswara</p>
                                </div>
                                <div className="col-xl-6">
                                    <ul className="nav nav-footer justify-content-center justify-content-xl-end">
                                        <li className="nav-item"></li>
                                    </ul>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}

let mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        user: state.auth.user
    };
};

export default connect(mapStateToProps)(Footer);
