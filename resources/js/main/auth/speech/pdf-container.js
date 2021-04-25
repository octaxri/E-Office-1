import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { SizeMe } from 'react-sizeme';
import { Document, Page } from 'react-pdf';
import * as loading from "../../../components/loading.json"
import Lottie from 'react-lottie';

const PdfContainer = ({isDataExist, pdfLoadMessage, url, noDataMessage}) => {

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    const loader = () => {
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: loading.default,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice"
            }
        }

        return(
            <>
                <h2 className="text-darker text-uppercase my-2 ls-2 text-center">{pdfLoadMessage}</h2>
                <Lottie options={defaultOptions} height={120} width={120} />
            </>
        )
    }

    return (
        <>
            {/* <h4 className="text-yellow-calm text-uppercase ls-2">Official <span className="text-darker ls-1">request document:</span></h4><br/> */}
            <div className="justify-content-center text-center">
                <button
                    className="btn btn-no-bg shadow-none"
                    type="button"
                    disabled={pageNumber <= 1}
                    onClick={previousPage}
                >
                {pageNumber <= 1 ? null : <><small className="text-uppercase text-darker font-weight-600">Page -&nbsp;{pageNumber - 1}</small></> }
                <small className="text-uppercase text-darker font-weight-600">&nbsp;Previous</small>
                </button>
                <button
                    className="btn btn-no-bg shadow-none"
                    type="button"
                    disabled={pageNumber >= numPages}
                    onClick={nextPage}
                >
                <small className="text-uppercase text-purple font-weight-600">Next&nbsp;</small>
                {pageNumber >= numPages ? null : <><small className="text-uppercase text-darker font-weight-600">Page -&nbsp;{pageNumber + 1}</small></> }
                </button>
                <br/>
            </div>
            { isDataExist
                ?
                    <SizeMe
                        monitorHeight
                        refreshRate={128}
                        refreshMode={"debounce"}
                        render={({ size }) => (
                        <div className="shadow my-3">
                            <Document
                                file={url}
                                onLoadSuccess={onDocumentLoadSuccess}
                                loading={loader}
                            >
                            <Page width={size.width ? size.width : 1} pageNumber={pageNumber} renderMode="svg"/>
                            </Document>
                        </div>
                        )}
                    />
                :
                    <>
                        <img className="img-fluid my-3" src="/argon/img/background/pdf.svg" alt="" style={{width:'100px', height:'140px'}} />
                        <small className="text-muted text-uppercase ls-1 text-center" style={{fontSize: '0.6em'}}> <i> {noDataMessage}</i></small><br/>
                    </>
            }<br/>
            <div className="justify-content-center d-flex">
                <small className="font-weight-600 my-3 text-center text-darker text-uppercase">Page {pageNumber} of {numPages}</small>
            </div>
        </>
    )
}

export default PdfContainer
