import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Lottie from 'react-lottie';
import * as success from "../success-yellow.json"
import * as error from "../error.json"

const successOptions = {
    loop: true,
    autoplay: true,
    animationData: success.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
};

const errorOptions = {
    loop: true,
    autoplay: true,
    animationData: error.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
};

const Modal = ({ isShowing, hide, children , allowDismiss}) => isShowing ? ReactDOM.createPortal(
    <React.Fragment>
      <div className="c-modal-overlay"/>
      <div className="c-modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className="c-modal rounded justify-content-center">
            {children}
            {/* {
                response === true ?
                <Fragment>
                    <Lottie options={successOptions} height={120} width={120}></Lottie>
                    <h2 className="text-darker font-weight-600 ls-2 text-uppercase text-center">Success</h2>
                    <p className="text-darker font-weight-500 my-4 text-center">{message}</p>
                    {
                        allowDismiss === true
                        ?
                        <div className="row justify-content-center">
                            <button type="button" className="btn btn-outline-darker text-uppercase" data-dismiss="modal" aria-label="Close" onClick={hide}>close</button>
                        </div>
                        :
                        <h5 className="text-muted my-4 text-center">Redirect in 2 seconds...</h5>
                    }
                </Fragment>
                :
                <Fragment>
                    <Lottie options={errorOptions} height={180} width={180}></Lottie>
                    <h2 className="text-darker font-weight-500 ls-2 text-uppercase text-center">Error</h2>
                    <p className="text-darker font-weight-500 my-4 text-center">{message}</p>
                    <div className="row justify-content-center">
                        <button type="button" className="text-white btn text-uppercase bg-gradient-danger" data-dismiss="modal" aria-label="Close" onClick={hide}>close</button>
                    </div>
                </Fragment>
            } */}
        </div>
      </div>
    </React.Fragment>, document.body
  ) : null;

export default Modal;
