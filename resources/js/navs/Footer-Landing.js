import React, { Component } from 'react';
import moment from 'moment';

class FooterLanding extends Component {
    render() {
        return (
            <div class="font-small bg-gradient-footer pt-4 text-white mx-0 mx--4">
            <div class="card-body mx-0">
                <div class="row vertical-divider">
                <div className="col my-auto col-lg-3 text-center">
                    {/* <img src="/argon/img/brand/logo.png" alt=""/><br/> */}
                    <img src="/argon/img/brand/google-play.webp" alt="" style={{width:'200px'}} className="my-2"/>
                </div>
                <div class="col-md-4 col mx-auto col-lg-5">
                    <h3 class="font-weight-bold text-uppercase mt-3 mb-4 text-white">E-Pidato</h3>
                    <p>Aplikasi diperuntukkan untuk aktivitas disposisi pidato menggunakan fitur tanda-tangan digital - mempermudah distribusi dokumen antar Organisasi Pemerintahan</p>
                </div>
                <div class="col-md-2 col-lg-4 mx-auto">
                    <h5 class="font-weight-bold text-uppercase mt-3 mb-4 text-white text-justify">Contact Info : </h5>

                    <ul class="list-unstyled">
                    <li>
                        <p>kantor@bappedajambi.go.id</p>
                    </li>
                    <li>
                        <p>Jl. RM. Nur Atmadibrata No. 1 Telp. 62507, 63494 – Fax. 65598, 62122 - Komplek Perkantoran Gubernur Telanai Pura</p>
                    </li>
                    </ul>

                    <ul class="list-unstyled list-inline">
                        <li class="list-inline-item">
                        <a class="btn-floating btn-fb mx-1">
                            <i class="fab fa-facebook-f"> </i>
                        </a>
                        </li>
                        <li class="list-inline-item">
                        <a class="btn-floating btn-tw mx-1">
                            <i class="fab fa-twitter"> </i>
                        </a>
                        </li>
                    </ul>

                </div>

                </div>
                <div className="text-center">

                </div>
            </div>
            <div class="footer-copyright text-center py-3 bg-darker mt-3">© 2020 Copyright -
                <a href="https://e-pidato.bappeda-provjambi.net/" className="text-white"> BAPPEDA PROVINSI JAMBI</a>
            </div>

            </div>
        );
    }
}


export default FooterLanding;
