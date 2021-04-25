import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import main from './main.json'
import packaging from './packaging.json'
import signature from './signature.json'
import frontend from './frontend.json'
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

const dependencies = () => {

    const fixedContent = () => {
        return (
            <>
                <div className="about-shape-circle-30 position-absolute bg-white about-icon-animated-2s left-8"></div>
                <div className="about-shape-circle-10 position-absolute bg-white about-icon-animated-2s top-6 left-8"></div>
                <div className="about-shape-circle-30 position-absolute bg-white about-icon-animated-2s top-6 left-6"></div>
                <div className="about-shape-circle-10 position-absolute bg-white right-2 bottom-2 about-icon-animated-2s mb-8"></div>
                <div className="about-shape-circle-30 position-absolute bg-white about-icon-animated-2s top-8 left-8"></div>
                <div className="about-shape-circle-30 position-absolute bg-lighter bottom--9 left-4 about-icon-animated-2s mb-8"></div>
                <div className="about-shape-circle-30 position-absolute bg-lighter bottom--7 left-8 about-icon-animated-2s mb-8"></div>
                <div className="about-shape-circle position-absolute bg-white right-2 top-6 about-icon-animated-2s"></div>
                <div className="about-shape-circle-10 position-absolute bg-lighter right-2 top-6 about-icon-animated-2s"></div>
                <div className="about-shape-circle-10 position-absolute bg-lighter right-8 bottom-8 about-icon-animated-2s mb-8"></div>
                <div className="about-shape-circle-30 position-absolute bg-lighter right-6 top-6 about-icon-animated-2s"></div>
                {/* <i className="las la-file-code text-white about-icon-animated mt-8" style={{fontSize:'30vw'}}></i> */}
                <i className="las la-project-diagram text-white about-icon-animated-2s mt-8" style={{fontSize:'30vw'}}></i>
            </>
        )
    }

    // const lists = [
    //     {
    //         name: 'wdwd',
    //         version: 'wdwdwd',
    //         url: 'wdwdwd'
    //     }
    // ]

    const listItem = ({name, version, url}) => {
        return (
            <>
                <li className="py-1">
                    <span className="text-darker font-weight-600">{name}</span>
                    <small className="text-muted"> ver. {version}</small> <a target="_blank" href={url} className="badge badge-pill badge-purple">link</a>
                </li>
            </>
        )
    }

    const renderMainContent = () => {
        return (
            <>
                <div className="row">
                    <div className="col-lg-4 h-100vh py-4 px-4 d-none d-md-block position-relative">
                        <div className="position-fixed">
                            <Fade top>
                                {fixedContent()}
                            </Fade>
                            {/* <div style={{height:'50vh'}} className="bg-gradient-primary"></div> */}
                        </div>
                    </div>
                    <div className="col-lg-8 bg-white">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col py-4 px-lg-6">
                                    <p className="text-muted text-uppercase overflow-hidden" style={{fontSize:'3vw'}}>project
                                        <span>
                                            <p className="text-uppercase text-primary ls-1" style={{fontSize:'5vw'}}>dependencies</p>
                                        </span>
                                    </p>

                                    <Link to={'/'} className="btn bg-primary"><span className="ls-1 font-weight-500 text-white">BACK HOME</span></Link>

                                    <hr/>
                                    <div className="container-fluid">
                                        <div className="row">
                                            <Fade bottom>
                                                <div className="col">
                                                    <p style={{fontSize:'20px'}} className="text-primary">Main Dependencies</p>
                                                    <ul style={{listStyleType:'none', margin:'0'}} className="pl-2">
                                                        {
                                                            main.map( list => (
                                                                listItem({
                                                                    name: list.name,
                                                                    version: list.version,
                                                                    url: list.url
                                                                })
                                                                ))
                                                            }
                                                    </ul>
                                                </div>
                                            </Fade>
                                            <Fade bottom>
                                                <div className="col">
                                                <p style={{fontSize:'20px'}} className="text-primary text-capitalize">package Manager</p>
                                                    <ol>
                                                        {
                                                            packaging.map( list => (
                                                                listItem({
                                                                    name: list.name,
                                                                    version: list.version,
                                                                    url: list.url
                                                                })
                                                            ))
                                                        }
                                                    </ol>
                                                </div>
                                            </Fade>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <Fade bottom>
                                                <div className="col">
                                                    <p style={{fontSize:'20px'}} className="text-primary">Frontend Dependencies</p>
                                                    <ul style={{listStyleType:'none', margin:'0'}} className="pl-2">
                                                        {
                                                            frontend.map( list => (
                                                                listItem({
                                                                    name: list.name,
                                                                    version: list.version,
                                                                    url: list.url
                                                                })
                                                                ))
                                                        }
                                                    </ul>
                                                </div>
                                            </Fade>

                                            <Fade bottom>
                                                <div className="col">
                                                <p style={{fontSize:'20px'}} className="text-primary text-capitalize">Signature Processing</p>
                                                    <ol>
                                                        {
                                                            signature.map( list => (
                                                                listItem({
                                                                    name: list.name,
                                                                    version: list.version,
                                                                    url: list.url
                                                                })
                                                                ))
                                                            }
                                                    </ol>
                                                </div>
                                            </Fade>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <Fade bottom>
                                                <div className="col">
                                                    <p style={{fontSize:'20px'}} className="text-primary">Images Used</p>
                                                    <ul style={{listStyleType:'none', margin:'0'}} className="pl-2">
                                                        {
                                                            listItem({
                                                                name: 'mountains-lake-house',
                                                                version: '1.0',
                                                                url: 'https://pixabay.com/photos/mountains-lake-house-lake-house-1587287/'
                                                            })
                                                        }
                                                        {
                                                            listItem({
                                                                name: 'meadow',
                                                                version: '1.0',
                                                                url: 'https://pixabay.com/photos/meadow-bokeh-nature-dew-dewdrop-4485609/'
                                                            })
                                                        }
                                                        {
                                                            listItem({
                                                                name: 'Boat Lake',
                                                                version: '1.0',
                                                                url: 'https://pixabay.com/photos/boat-lake-nature-water-mountain-4899802/'
                                                            })
                                                        }
                                                        {
                                                            listItem({
                                                                name: 'Profile Faces',
                                                                version: '1.0',
                                                                url: 'https://uifaces.co/'
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            </Fade>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Fade left>
                <div className="container-fluid bg-gradient-blue">
                    {renderMainContent()}
                </div>
            </Fade>
        </>
    )
}

export default dependencies
