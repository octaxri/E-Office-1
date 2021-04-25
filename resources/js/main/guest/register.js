import React, { Component, Fragment } from 'react';
import { Document, Page } from 'react-pdf';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fadeIn } from 'react-animations'
import * as loading from "../../components/loading.json"

import GuestSidebar from '../../navs/Sidebar';
import FadeIn from 'react-fade-in';
import Lottie from 'react-lottie';
import Navigation from '../../navs/navigation/navigation';
import FooterLanding from '../../navs/Footer-Landing';
import Guest from '../../navs/guest/Guest';
// import * as Navigation from '../../navs/navigation/navigation';

const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
};

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
};

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            numPages: null,
            scale: 1.0,
            isLoading : false,

            namaOPD: '',
            emailOPD: '',
            passwordOPD: '',
            konfirmasiPasswordOPD: '',
            errors:{},
            success:{},
            ready: false
        };
    }

    handleOPDInput = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]:value})
    }

    onFileChange = (event) => {
        this.setState({
          file: event.target.files[0],
        });
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    }

    clearForm = (e) => {
        this.setState({
            namaOPD: '',
            emailOPD: '',
            passwordOPD: '',
            konfirmasiPasswordOPD: '',
            file:''
        });
    }

    disableForm = (e) => {

    }

    componentDidMount = () => {
        this.setState({ready: true})
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.setState({ isLoading: true });
        if (this.state.file !== null){
            let formData = new FormData();
            formData.append('name', this.state.namaOPD);
            formData.append('email', this.state.emailOPD);
            formData.append('password', this.state.passwordOPD);
            formData.append('file', this.state.file);
            // console.log(...formData);

            if (this.state.passwordOPD == this.state.konfirmasiPasswordOPD){
                axios
                .post("/api/auth/register", formData)
                .then(res => {
                    this.setState({
                        success: res.data.success,
                        isLoading : false
                    });
                    this.clearForm()

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
                })
                .catch(e => this.setState({errors: e.data}));
            }
        }
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

    renderMainContent = () => {
        const { file, numPages } = this.state;
        let success = this.state.success;
        let error = this.state.errors;
        return (
            <Fragment>
                <div className="col-lg-7 col-md-auto shadow bg-white my-3" style={{backgroundSize:"contain"}}>
                                    {/* <div className=""> */}
                        <div className="card-body px-lg-4 px-sm-1">
                            <div className="bg-darker px-2 mb-2">
                                {/* <h4 className="display-4 text-uppercase ls-2 font-weight-500 text-center text-white">form registrasi</h4> */}
                            </div>
                            <form action="" className="navbar-search navbar-search-light text-center mx-1 px-lg-4 px-sm-2" onSubmit={this.handleFormSubmit}>
                                <div className="form-group mb-4">
                                    <small className="text-uppercase ls-2">nama organisasi</small>
                                    <div className="input-group input-group-alternative">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                                        </div>
                                        <input
                                            className="form-control"
                                            placeholder="Nama Organisasi anda"
                                            type="text"
                                            name="namaOPD"
                                            onChange={this.handleOPDInput}
                                            value={this.state.namaOPD}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group mb-4">
                                    <small className="text-uppercase ls-2">Email organisasi</small>
                                    <div className="input-group input-group-alternative">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                                        </div>
                                        <input
                                            className="form-control"
                                            placeholder="Username Anda"
                                            type="email"
                                            name="emailOPD"
                                            onChange={this.handleOPDInput}
                                            value={this.state.emailOPD}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group mb-4">
                                    <small className="text-uppercase ls-2">Password</small>
                                    <div className="input-group input-group-alternative">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-lock"></i></span>
                                        </div>
                                        <input
                                            className="form-control"
                                            placeholder="Password Anda"
                                            type="password"
                                            name="passwordOPD"
                                            onChange={this.handleOPDInput}
                                            value={this.state.passwordOPD}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group mb-4">
                                    <small className="text-uppercase ls-2">Konfirmasi Password</small>
                                    <div className="input-group input-group-alternative">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-lock"></i></span>
                                        </div>
                                        <input
                                            className="form-control"
                                            placeholder="Konfirmasi Password Anda"
                                            type="password"
                                            name="konfirmasiPasswordOPD"
                                            onChange={this.handleOPDInput}
                                            value={this.state.konfirmasiPasswordOPD}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group mb-4">
                                    <label class="btn btn-outline-darker btn-file">
                                        <i class="far fa-plus-square"></i> Upload Scan Surat Permohonan <input type="file" name="file" id="file" onChange={this.onFileChange} style={{display:'none'}} required />
                                    </label>
                                </div>

                                <Document file={file} onLoadSuccess={this.onDocumentLoadSuccess} options={options}>
                                {
                                    Array.from(new Array(numPages),
                                    (el, index) => (
                                            <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={0.8}/>
                                        ),
                                    )
                                }
                                </Document>

                                <button
                                    type="submit"
                                    className="btn bg-darker text-white text-uppercase mt-3"
                                    disabled={this.state.isLoading}
                                    >
                                    {this.state.isLoading ? <div><i className='fas fa-circle-notch fa-spin'></i> Mengirimkan permohonan</div>  : "submit permohonan akun"}
                                </button>
                            </form>

                        </div>
                </div>
                <div className="col-lg-3 py-4" style={{background: "url(/argon/img/background/7971.jpg)",backgroundSize:"cover",backgroundRepeat: "no-repeat"}}>
                    <div className="card-body">
                        {/* <div className="bg-white px-2">
                            <h4 className="display-4 text-uppercase text-darker ls-2 font-weight-500">keterangan</h4>
                        </div>
                        <ol className="text-white pl-3" style={{fontSize:"0.8em"}}>
                            <li className="mb-2">
                                Silahkan masukkan Email Organisasi Anda, dimana email ini akan digunakan aktivasi dan informasi akun.
                            </li>
                            <li className="mb-2">
                                Upload PDF surat permohonan pengajuan akun untuk Aplikasi E-Pidato. PDF berupa scan surat yang telah ditanda tangani oleh Kepala Organisasi
                            </li>
                            <li className="mb-2">
                                Jika Akun disetujui, akan ada notifikasi email di email yang telah anda registrasikan. Info juga akan ditampilkan di halaman landing E-Pidato
                            </li>
                        </ol> */}
                    </div>
                </div>
            </Fragment>
        )
    }

    render() {
        return (
            <Fragment>
                <ToastContainer
                    position="top-right"
                    autoClose={10000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    draggable
                />
                    <Guest active={2}/>
                    <div className="main-content">
                            <div className="container-fluid">
                            {
                                this.state.ready === false
                                ?
                                    <FadeIn>
                                        <h3 className="text-center text-dark text-uppercase ls-2 pt-md-7">Menyiapkan Data</h3>
                                        <div className="d-flex justify-content-center align-items-center">
                                            <Lottie options={defaultOptions} height={120} width={120} />
                                        </div>
                                    </FadeIn>
                                :
                                    <Fragment>
                                        <Navigation />
                                        <div className="row py-4">
                                            { this.renderMainContent() ?? null }
                                        </div>
                                    </Fragment>
                            }
                            <FooterLanding/>
                            </div>
                    </div>
            </Fragment>
        );
    }
}

export default Register;
