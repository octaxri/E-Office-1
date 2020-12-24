import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class OPDList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        };
    }

    componentDidMount() {
        const url = `/api/data-opd/get`;
        axios.get(url)
        .then(
            response => response.data
        )
        .then((data) =>
        {
            this.setState({ tasks: data })
        })
    }

    renderTasks() {
        return this.state.tasks.map(task => (
            <div className="card mb-2" key={task.id}>
                <div className="card-body">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h3 className="text-uppercase"><i className="fas fa-sitemap text-darker"></i> {task.name}</h3>
                                <small className="text-muted text-uppercase ls-2" style={{fontSize:'0.7em'}}>email : {task.email}</small>
                            </div>
                            <div className="col">
                                {task.status == 1 ? <span className="bg-gradient-dark text-white text-uppercase px-2 py-1 rounded"><small><i className="fas fa-check"></i> diterima</small></span> : ''}
                                {task.status == 2 ? <span className="bg-gradient-dark text-white text-uppercase px-2 py-1 rounded"><small><i className="fas fa-check"></i> ditolak</small></span> : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ));
    }

    render() {
        return (
                <div className="row" style={{zIndex: 999}}>
                    <div className="col mb-4">
                        <div className="card shadow">
                            <div className="card-header">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <h6 className="text-uppercase text-muted ls-1 mb-1">AKUN DITERIMA</h6>
                                        <h2 className="mb-0 text-dark">Disetujui oleh Kepala BAPPEDA</h2>
                                    </div>
                                    <div className="col text-right">
                                        <Link to="/register">
                                            <button className="btn bg-dark text-white"><span className="text-uppercase ls-2">register</span></button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body bg-lighter">
                                {this.renderTasks()}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 mb-4">
                        <div className="card shadow" style={{zIndex:999}}>
                            <div className="card-body">
                                <div className="justify-content-center text-center">
                                    <h3 className="text-uppercase text-dark">DOWNLOAD</h3>
                                    <a href="https://play.google.com/store/apps/details?id=com.bappeda.e_sibuk_bangat"><img src="https://img.icons8.com/color/96/000000/google-play.png"/></a>
                                </div>
                                <div className="row mt-4 justify-content-center">
                                    <h3 className="text-muted text-uppercase text-center">E-PIDATO ON PLAYSTORE</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

        );
    }

}

export default OPDList;
