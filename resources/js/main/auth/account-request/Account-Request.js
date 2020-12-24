import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Navigation from '../../../navs/navigation/navigation';
import { connect } from 'react-redux';
import Auth from '../../../navs/auth/Auth';
import Navbar from '../../../navs/Navbar';

class AccountRequest extends Component {
    constructor(props){
        super(props);
        this.state = {
            AccountReqData: [],
            success: false,
            errors: {}
        }
    }

    componentDidMount(){
        Axios.get('/api/account-request/all')
        .then(res => {
            this.setState({
                success : true,
                AccountReqData : res.data
            });
        });
    }

    renderAccountRequestData = () => {
        return this.state.AccountReqData.map(data => (
            <div className="col-lg-6 mb-4 card-lift--hover" key={data.id}>
                <Link to={{ pathname: '/account-request/data/' + data.id, id: data.id }}>
                    <div className="rounded shadow bg-gradient-dark ">
                        <div className="row">
                            <div className="col-auto my-auto">
                                <div className="container text-center pt-2">
                                    <i className="fas fa-file-pdf fa-4x text-white text-center py-2 px-2 rounded"></i>
                                </div>
                            </div>
                            <div className="col-auto">
                                <div className="card-body">
                                    <h4 className="text-uppercase text-darker mb-0 text-white">{data.name}</h4>
                                    <small className="text-white" style={{fontSize:'0.7em'}}><i className="far fa-clock"></i> {moment(data.created_at).format('MMMM Do YYYY, hh:mm:ss')}</small><br/>
                                    { data.status == 0 ?
                                        <small className="text-uppercase text-muted" style={{fontSize:'0.7em'}}>status : waiting</small> : ''
                                    }
                                </div>
                            </div>
                        </div>
                        {/* <div className="bg-darker float-right text-white rounded px-1 py-1 my-1 mx-1" style={{fontSize:'0.6em'}}>DATA 00</div> */}
                    </div>
                </Link>
            </div>
        ));
    }

    render() {
        return (
            <Fragment>
                <Auth active={7}/>
                <div className="main-content">
                <Navbar/>
                <div className="header pt-md-7 pt-lg-7" ></div>
                    <div className="container-fluid py-4">
                        <Navigation/>
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="row">
                                    {this.renderAccountRequestData()}
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <small className="text-uppercase ls-2">data</small>
                                <h1 className="font-weight-400 ls-1">Permintaan Akun</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

let mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        user: state.auth.user,
        // url: state.mainURL
    };
};

export default connect(mapStateToProps)(AccountRequest);
