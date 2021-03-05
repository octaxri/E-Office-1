import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import FadeIn from 'react-fade-in';
import Lottie from 'react-lottie';
import * as loading from "../../components/loading.json"

const Waiting = ({message, loadingMessage}) => {

    return (
        <>
            <FadeIn>
                <div className="container align-content-center d-flex justify-content-center" style={{height:'100vh'}}>
                    <div className="my-auto">
                        <h2 className="text-center text-dark text-uppercase ls-2">{message}</h2>
                        <div className="d-flex justify-content-center align-items-center">
                            <Lottie options={defaultOptions} height={120} width={120} />
                        </div>
                        <h4 className="text-center ls-1 text-uppercase font-weight-500 text-darker">loading {loadingMessage} data...</h4>
                    </div>
                </div>
            </FadeIn>
            {/* <FadeIn>
                <h3 className="text-center text-dark text-uppercase ls-2 pt-md-7 pt-sm-7">{message}</h3>
                <div className="d-flex justify-content-center align-items-center">
                    <Lottie options={defaultOptions} height={120} width={120} />
                </div>
                <h4 className="text-center ls-1 text-uppercase font-weight-500 text-darker">loading {loadingMessage} data...</h4>
            </FadeIn> */}
        </>
    )
}

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
};

export default Waiting
