import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import Overlay from '../../../components/loading-overlay/overlay';
import useOverlay from '../../../components/loading-overlay/state';
import useModal from '../../../components/modal/hook-modal';
import ModalSuccess from '../../../components/modal/modal-success';
import Waiting from '../../../components/waiting/waiting';
import Navbar from '../../../navs/Navbar';
import PdfContainerSign from '../../auth/speech/pdf-container-sign';
import Navigation from '../../../navs/navigation/navigation';
import Guest from '../../../navs/guest/Guest';
import useDimensions from "react-use-dimensions";
import Fade from 'react-reveal/Fade';
import Axios from 'axios';
import { useForm } from 'react-hook-form';

const Signer = () => {

    let [ready, setReady] = useState(false)
    let [loadState, setLoadState] = useState('')
    let [dPos, setDPos] = useState({x:0, y:0})
    let [page, setPage] = useState(1)
    let [totalPages, setTotalPages] = useState(1)

    useEffect(()=>{
        setReady(true)
    }, [])

    const download = (res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'signed.pdf')
        document.body.appendChild(link)
        link.click()
    }

    const { register, handleSubmit } = useForm();

    const onSignTest = async (data) => {

        console.log(data)
        active(true), overlayMessage('signing your document')
        await Axios.post('/api/demo/sign-test-selector', data, {responseType: 'blob'})
            .then( res => {
                active(false)
                toggle()
                response(true)
                dismiss(true)
                message('Your Document is Signed!')
                download(res)
                // console.log(res.data.success)
            })
            .catch(error => {
                // console.log(error.response.data.error)
                active(false)
                toggle()
                response(false)
                message(error.response.data.error)
            })
    }

    const [ref, size] = useDimensions();
    const [qrRef, qrSize] = useDimensions();

    const pdfContainer = () => {
        return (
            <>
                <div className="col-lg-8 col-sm-12 mx-0 py-4">
                    <PdfContainerSign
                        isDataExist={true}
                        pdfLoadMessage={'preparing pdf file'}
                        url={'argon/demo-speech/template/template.pdf'}
                        noDataMessage='no official request document attached'
                        pageSelected={(data)=>setPage(data)}
                        totalPages={(data)=>setTotalPages(data)}
                        transPos={(data)=>setDPos({x:data.x, y:data.y})}
                        sizeref={ref}
                        dimension={size}
                        qrRef={qrRef}
                    />
                </div>
            </>
        )
    }

    const renderDemoForm = () => {
        return (
            <>
                <Fade right>
                <div className="card-body" style={{overflowY:'auto', height:'90vh'}}>
                    <em><small className="text-lowercase text-darker">*Try to resize & all value will also changes</small></em>
                    <hr className="my-2" />
                    <h4 className="text-yellow-calm font-weight-600 text-uppercase">QR signature</h4>
                    {/* <div className="line-dec"></div> */}
                    <div className="row">
                        <div className="col">
                            <small className="text-uppercase text-yellow-calm ls-1 font-weight-600">X <span className="text-darker" style={{fontSize:'0.7em'}}>Position :</span></small>
                            <p className="text-darker font-weight-600">{Math.round((dPos.x + Number.EPSILON) * 100) / 100}px</p>
                        </div>
                        <div className="col">
                            <small className="text-uppercase text-yellow-calm ls-1 font-weight-600">Y <span className="text-darker" style={{fontSize:'0.7em'}}>Position :</span></small>
                            <p className="text-darker font-weight-600">{Math.round((dPos.y + Number.EPSILON) * 100) / 100}px</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <small className="text-uppercase text-yellow-calm ls-1 font-weight-600">QR <span className="text-darker" style={{fontSize:'0.7em'}}>Width :</span></small>
                            <p className="text-darker font-weight-600">{qrSize.width ? (Math.round((qrSize.width + Number.EPSILON) * 100) / 100) : 0}px</p>
                        </div>
                        <div className="col">
                            <small className="text-uppercase text-yellow-calm ls-1 font-weight-600">QR <span className="text-darker" style={{fontSize:'0.7em'}}>Height :</span></small>
                            <p className="text-darker font-weight-600">
                                { qrSize.height ?
                                    <>{Math.round((qrSize.width + Number.EPSILON) * 100) / 100}px&nbsp;({Math.round((qrSize.height + Number.EPSILON) * 100) / 100})</>
                                    :
                                    0
                                }
                            </p>
                        </div>
                    </div>

                    <hr className="my-2"/>
                    <h4 className="text-yellow-calm font-weight-600 text-uppercase">PDF container</h4>
                    <div className="row">
                        <div className="col">
                            <small className="text-uppercase text-yellow-calm ls-1 font-weight-600">CT <span className="text-darker" style={{fontSize:'0.7em'}}>Width :</span></small>
                            <p className="text-darker font-weight-600">{Math.round((size.width + Number.EPSILON) * 100) / 100}</p>
                        </div>
                        <div className="col">
                            <small className="text-uppercase text-yellow-calm ls-1 font-weight-600">CT <span className="text-darker" style={{fontSize:'0.7em'}}>Height :</span></small>
                            <p className="text-darker font-weight-600">{Math.round((size.height + Number.EPSILON) * 100) / 100}</p>
                        </div>
                    </div>
                    <em><small className="text-lowercase text-darker">*Scroll a little to refresh value</small></em>

                    <hr className="my-2"/>
                    <h4 className="text-yellow-calm font-weight-600 text-uppercase">Page Selected</h4>
                    <div className="row">
                        <div className="col">
                            <small className="text-uppercase text-yellow-calm ls-1 font-weight-600">IN <span className="text-darker" style={{fontSize:'0.7em'}}>Page :</span></small>
                            <p className="text-darker font-weight-600">{page}</p>
                        </div>
                        <div className="col">
                            <small className="text-uppercase text-yellow-calm ls-1 font-weight-600">Total <span className="text-darker" style={{fontSize:'0.7em'}}>Page :</span></small>
                            <p className="text-darker font-weight-600">{totalPages}</p>
                        </div>
                    </div>

                    <hr className="my-2"/>

                    <form onSubmit={handleSubmit(onSignTest)}>
                        <input type="hidden" name="xPos" defaultValue={dPos.x} ref={register}/>
                        <input type="hidden" name="yPos" defaultValue={dPos.y} ref={register}/>
                        <input type="hidden" name="sign_page" defaultValue={page} ref={register}/>
                        <input type="hidden" name="ct_width" defaultValue={size.width} ref={register}/>
                        <input type="hidden" name="ct_height" defaultValue={size.height} ref={register}/>
                        <input type="hidden" name="qr_width" defaultValue={qrSize.width} ref={register}/>
                        <input type="hidden" name="qr_height" defaultValue={qrSize.height} ref={register}/>
                        <h4 className="text-yellow-calm font-weight-600 text-uppercase">Signing Form</h4>
                        <div className="my-4">
                            <small className="text-uppercase text-yellow-calm ls-1 font-weight-600">CERT <span className="text-darker" style={{fontSize:'0.7em'}}>Passphrase :</span></small>
                            <input className="material-input-inverse bg-lighter text-darker" type="password" name="password" placeholder="Input : 2020v2" ref={register}/>
                            <span className="highlight-inverse"></span>
                            <span className="bar-inverse"></span>
                        </div>
                        <button type="submit" className="btn bg-yellow-calm text-white btn-block"><span className="text-uppercase ls-2">sign pdf</span></button>
                    </form>

                </div>
                </Fade>
            </>
        )
    }

    const calculationContainer = () => {
        return (
            <>
                <div className="col-lg-3 col-sm-12 bg-lighter mx-0 px-0 position-lg-fixed position-sm-relative shadow" style={{height:'100%', right:'0px'}}>
                    <div className="bg-lighter" style={{minWidth:'27vh', maxWidth:'100%'}}>
                            {/* <div className="nav-wrapper"> */}
                                <ul className="nav justify-content-between my-0 mt-2 px-4" id="receiver-tab" role="tablist">
                                    <li className="nav-item text-left">
                                        <a
                                            className="mb-sm-3 mb-md-0 active"
                                            id="receiver-tab-title"
                                            data-toggle="tab"
                                            href="#receiver-tab-content"
                                            role="tab"
                                            aria-controls="tabs-icons-text-1"
                                            aria-selected="true"
                                        >
                                            <h4 className="text-darker text-uppercase ls-1"><span className="text-yellow-calm">State</span> Observer :</h4>
                                        </a>
                                    </li>
                                </ul>
                            {/* </div> */}
                        <div className="tab-content position-relative" id="myTabContent">
                                <div className="tab-pane active" id="receiver-tab-content" role="tabpanel" aria-labelledby="receiver-tab-title">
                                    {renderDemoForm()}
                                </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const renderMainContent = () => {
        return (
            <>
                <div className="row px-0">
                    {pdfContainer()}
                    {calculationContainer()}
                </div>
            </>
        )
    }


const {isShowing, toggle, response, isSuccess, message, isMessage, dismiss, allowDismiss} = useModal();
const { isActive, active, isOverlayMessage, overlayMessage} = useOverlay()

    return (
        <>
            <ModalSuccess isShowing={isShowing} hide={toggle} response={isSuccess} message={isMessage} allowDismiss={allowDismiss}/>
            <Overlay
                showing={isActive}
                message={isOverlayMessage}
                children={
                    <>
                        <Guest active={14}/>
                        <div className="main-content bg-white">
                            <div className="container-fluid">
                            {/* <Navbar/> */}
                                {
                                ready === false
                                ?
                                <Waiting message={'getting the page ready'} loadingMessage={loadState}/>
                                :
                                    <>
                                        <div className="container-fluid">
                                        <Navigation />
                                            <div className="header" ></div>
                                            { renderMainContent()}
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </>
                }
            />
        </>
    )
}

export default Signer
