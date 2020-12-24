import React, { Component, Fragment } from 'react';
import Navigation from '../../../navs/navigation/navigation';
import { Document, Page } from 'react-pdf';
import Axios from 'axios';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import Lottie from 'react-lottie';
import * as loading from "../../../components/loading.json";
import FadeIn from 'react-fade-in';
import Auth from '../../../navs/auth/Auth';
import Navbar from '../../../navs/Navbar';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
};

class SpeechRequest extends Component {
    constructor(props){
        super(props);
        this.state = {
            numPages: null,
            scale: 1.0,
            file: '',
            theme: '',
            event: '',
            toList: [],
            to:'',
            overlayActive : false,
            submitActive : false,
            isReady: undefined,
            errors: {}
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('theme', this.state.theme);
        data.append('event', this.state.event);
        data.append('to', this.state.to);
        data.append('status', this.state.status);
        this.state.file !== null ? data.append('file', this.state.file) : '';

        this.setState({overlayActive: true});
            setTimeout(() => {
                this.setState({overlayActive: false});
                this.clearForm();
                this.showToast();
            }, 2000, clearTimeout())
        Axios.post('/api/speech-request/send-request', data)
        // .then(
        //     setTimeout(() => {
        //         history.push('/home')
        //     }, 2000)
        // );
    }

    onFileChange = (event) => {
        this.setState({
          file: event.target.files[0],
        });
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState( {[name]:value} )
    }

    enableSubmit = () => {
        this.setState({submitActive:true});
    }

    clearForm = (e) => {
        this.setState({
            theme: '',
            event: '',
            to:'',
            file:'',
            submitActive: false
        });
    }

    componentDidMount = async () => {
        await Axios.get('/api/speech-request/send-to')
            .then(res => {
                this.setState({ toList: res.data })
            });

        this.setState({ isReady: true });
    }

    componentWillUnmount(){
        clearTimeout(this.timer);
    }

    renderToList = () => {
        return this.state.toList.map(to => (
                <label key={to.user_id} className="card-lift-sm--hover">
                    <input type="radio" name="to" className="card-input-element" value={to.user_id} onChange={this.handleUserInput} onClick={this.enableSubmit} checked={this.state.to === `${to.user_id}`}/>
                        <div className="card card-input">
                            <div className="container">
                                <div className="row my-2">
                                    <div className="col my-auto">
                                        <div className="row">
                                            <div className="col-auto">
                                                <img className="avatar-sm rounded-circle" alt="Image placeholder" src="/argon/img/theme/team-4-800x800.jpg"/>
                                            </div>
                                            <div className="col">
                                                <span style={{fontSize: '1em'}}>{to.user_data.name}</span><br/>
                                                <span className="text-muted text-uppercase ls-2" style={{fontSize: '0.6em'}}>{to.role_data.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                <div className="col-auto icon text-center"></div>
                            </div>
                        </div>
                    </div>
                </label>
            ));
    }

    renderMainContent = () => {
        const { file, numPages } = this.state;
        return (
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-6">
                            <h6 className="text-uppercase text-muted ls-1 mb-1">form</h6>
                            <h2 className="mb-0 text-dark text-capitalize">form pengajuan pidato</h2>
                        </div>
                        <div className="col">
                            <div className="card bg-darker py-2">
                                <ol className="text-white my-auto">
                                    <li><small><b>File PDF</b> berisi tentang materi yang akan disampaikan sesuai dengan tema pidato.</small></li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    <div className="separator separator-bottom">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                            <path fill="#f3f4f5" fillOpacity="1" d="M0,160L60,170.7C120,181,240,203,360,218.7C480,235,600,245,720,213.3C840,181,960,107,1080,85.3C1200,64,1320,96,1380,112L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                        </svg>
                    </div>
                </div>
                <div className="card-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl col-sm-12">
                                <form className="" onSubmit={this.handleFormSubmit}>
                                    <div className="form-group mb-4" key="2">
                                        <input className="material-input" type="text" name="theme" onChange={this.handleUserInput} required/>
                                        <span className="highlight"></span>
                                        <span className="bar"></span>
                                        <label className="material-label"><span className="text-uppercase ls-1" style={{fontSize:'0.7em'}}>tema pidato</span></label>
                                    </div>
                                    <div className="form-group" key="1">
                                        <input className="material-input" type="text" name="event" onChange={this.handleUserInput} required/>
                                        <span className="highlight"></span>
                                        <span className="bar"></span>
                                        <label className="material-label"><span className="text-uppercase ls-1" style={{fontSize:'0.7em'}}>acara saat pidato dibutuhkan</span></label>
                                    </div>

                                    <div className="form-group mb-4">
                                        <label className="btn btn-outline-darker btn-file">
                                            <i className="far fa-plus-square"></i> Upload PDF<input type="file" name="file" id="file" onChange={this.onFileChange} style={{display:'none'}} />
                                        </label>
                                        <small className="font-italic text-muted">* opsional</small>
                                    </div>

                                    <span className="text-uppercase ls-1 text-muted" style={{fontSize:'0.7em'}}>submit request kepada:</span><br/>
                                    {this.renderToList()}

                                    <button type="submit" className="btn btn-darker my-2" disabled={this.state.submitActive == false ? true : false}>
                                        <span className="text-uppercase ls-2">submit request pidato</span>
                                    </button>
                                </form>

                            </div>
                            <div className="col">
                                <Document file={file} onLoadSuccess={this.onDocumentLoadSuccess}>
                                {
                                    Array.from(new Array(numPages),
                                    (el, index) => (
                                            <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={0.8}/>
                                        ),
                                    )
                                }
                                </Document>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    showToast = () => {
        let Msg = () => (
            <div className="py-3 inline-block">
                <div className="row">
                    <div className="col-auto">
                        <i className="fas fa-check-double fa-3x"></i>
                    </div>
                    <div className="col">
                        <small className="text-muted ls-2 text-uppercase" style={{fontSize:'0.6em'}}>success</small><br/>
                        <h4 className="text-dark ls-1">Registrasi Berhasil!</h4>
                    </div>
                </div>
            </div>
        )
        toast(<Msg />);
    }

    render() {
        return (
            <Fragment>
                <LoadingOverlay active={this.state.overlayActive} spinner={<Lottie options={defaultOptions} height={120} width={120} />} text='MEMPROSES DATA'>
                    <Auth active={10}/>
                    <div className="main-content">
                        <Navbar/>
                        <div className="header pt-md-7 pt-lg-7" ></div>
                        <div className="container-fluid py-4">
                        {
                        !this.state.isReady
                        ?
                            <FadeIn>
                                <h3 className="text-center text-dark text-uppercase ls-2 pt-md-7">Menyiapkan Data</h3>
                                <div className="d-flex justify-content-center align-items-center">
                                    <Lottie options={defaultOptions} height={120} width={120} />
                                </div>
                            </FadeIn>
                        :
                            <Fragment>
                                <ToastContainer position="top-right" autoClose={10000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} draggable/>
                                <Navigation />
                                {this.renderMainContent()}
                            </Fragment>
                        }
                        </div>
                    </div>
                </LoadingOverlay>
            </Fragment>
        );
    }
}

let mapStateToProps = state => {
    return {
        user: state.auth.user
    };
};

export default connect(mapStateToProps)(SpeechRequest);
