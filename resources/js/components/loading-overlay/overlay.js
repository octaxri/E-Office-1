import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import Lottie from 'react-lottie';
import * as loading from "../../components/loading.json"

const Overlay = ({showing, children, message}) => {

    const cardLoader = () => {
        return(
            <>
                <div className="card my-auto" style={{position:'fixed', top:"30%"}}>
                    <div className="card-body">
                        <h2 className="text-darker text-uppercase my-2 ls-2">{message}</h2>
                        <Lottie options={defaultOptions} height={120} width={120} />
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <LoadingOverlay active={showing} spinner={cardLoader()}>
                {children}
            </LoadingOverlay>
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

export default Overlay
