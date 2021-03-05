import Axios from 'axios';
import React, { Fragment } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useModal from '../../components/modal/hook-modal';

const Demo = ({OverlayActive, overlayMessage, toggle, response, message, dismiss}) => {
    let [file, setFile] = useState();
    let [fileName, setFileName] = useState('');
    const { register: testForm, handleSubmit: handleSignTest } = useForm();

    const download = (res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'signed.pdf')
        document.body.appendChild(link)
        link.click()
    }

    function handleFocusBack(){
        // console.log('focus-back');
        window.removeEventListener('focus', handleFocusBack);
        setFile(null)
        setFileName('')
    }

    const onFileChange = (event) => {
        setFile(event.target.files[0])
        setFileName(event.target.files[0].name)
        window.removeEventListener('focus', handleFocusBack);
        // console.log(event.target.files[0])
    }

    function fileInputClicked(){
        window.addEventListener('focus', handleFocusBack);
        // console.log('focus');
    }

    const onSignTest = async (data) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('signature_position', data.signature_position);
        formData.append('password', data.password);
        // console.log(formData.get('file'));

        OverlayActive(true), overlayMessage('signing your document')
        await Axios.post('/api/demo/sign-test', formData, {responseType: 'blob'})
            .then( res => {
                OverlayActive(false)
                toggle()
                response(true)
                dismiss(true)
                message('Your Document is Signed!')
                download(res)
                // console.log(res.data.success)
            })
            .catch(error => {
                // console.log(error.response.data.error)
                OverlayActive(false)
                toggle()
                response(false)
                message(error.response.data.error)
            })

    }

    const radio = (value, name, title) => {
        return (
            <Fragment>
                <div className="d-inline-flex">
                {/* onChange={() => setRole()} ref={register} onClick={console.log(data.id)} */}
                    <input type="radio" value={value} name={name} className="form-radio" ref={testForm} />
                    <label htmlFor={name}></label>
                    <small className="font-weight-500 text-white mt-1 mr-3">{title}</small>
                </div><br/>
            </Fragment>
        )
    }

    return (
        <div>
            <form onSubmit={handleSignTest(onSignTest)}>
                <div className="row">
                    <div className="col-2">
                        <div className="form-group mb-4">
                            <label className="bg-white px-3 py-3 btn-file my-auto rounded">
                                <i className="fas fa-file-upload fa-2x text-center"></i>
                                <input type="file" name="file" id="file" style={{display:'none'}} ref={testForm} onChange={onFileChange} onClick={()=>fileInputClicked()} required/>
                            </label>
                        </div>
                    </div>
                    <div className="col-10 text-left">
                        <h5 className="text-white">Try upload PDF file</h5>
                        <small className="text-white">{!file && !fileName ? 'File not yet uploaded' : <>{fileName}&nbsp;<i className="fas fa-check-circle"></i></> }</small>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-left">
                        <div className="d-inline-flex">
                            {radio('BOTTOM_LEFT', 'signature_position', 'Bottom Left')}
                            {radio('BOTTOM_MID', 'signature_position', 'Bottom Mid')}
                            {radio('BOTTOM_RIGHT', 'signature_position', 'Bottom Right')}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="material-form-control mt-4 pb-0 mb-1" key="2">
                            <input className="material-input bg-transparent text-white" type="password" name="password" ref={testForm} required/>
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label className="material-label">
                                <span className="text-uppercase ls-1 text-white" style={{fontSize:'0.7em'}}>passphrase</span>
                            </label>
                        </div>
                        <small className="text-white mt-0">passphrase : 2020v2</small>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                    <button type="submit" className="btn bg-white text-darker text-uppercase my-1 font-weight-500"><span className="ls-2">sign document</span></button>
                    <Link to="/advanced-signing-demo" className="btn bg-darker text-white text-uppercase my-1 font-weight-500"><span className="ls-2">draggable demo</span></Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Demo;
