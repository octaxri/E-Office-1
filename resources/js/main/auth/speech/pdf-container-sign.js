import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { SizeMe } from 'react-sizeme';
import { Document, Page } from 'react-pdf';
import * as loading from "../../../components/loading.json"
import Lottie from 'react-lottie';
import PdfSign from '../../guest/pdf/pdf-sign-test';

const PdfContainerSign = ({isDataExist, pdfLoadMessage, url, noDataMessage, pageSelected, totalPages, transPos, sizeref, dimension, qrRef}) => {

    let [numPages, setNumPages] = useState(null);
    let [pageNumber, setPageNumber] = useState(1);
    let [dPos, setDPos] = useState({x:0, y:0})

    // const [ref, { x, y, width, height }] = useDimensions();

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        totalPages(numPages)
        setPageNumber(1);
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
        pageSelected(prevPageNumber => prevPageNumber + offset)
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
                <h2 className="text-darker text-uppercase my-2 py-3 ls-2 text-center">{pdfLoadMessage}</h2>
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
                {pageNumber <= 1
                    ? null
                    : <><small className="text-uppercase text-darker font-weight-600">Page -&nbsp;{pageNumber - 1}</small></> } <small className="text-uppercase text-darker font-weight-600">Previous&nbsp;</small>
                </button>
                <button
                    className="btn btn-no-bg shadow-none"
                    type="button"
                    disabled={pageNumber >= numPages}
                    onClick={nextPage}
                >
                <small className="text-uppercase text-yellow-calm font-weight-600">Next&nbsp;</small>
                    {pageNumber >= numPages
                        ? null
                        :
                        <><small className="text-uppercase text-darker font-weight-600">Page -&nbsp;{pageNumber + 1}</small></> }
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
                        <div className="shadow my-3" ref={sizeref}>
                            <Document
                                file={url}
                                onLoadSuccess={onDocumentLoadSuccess}
                                loading={loader}
                            >
                                <PdfSign qrRef={qrRef} dPos={(data)=>{setDPos({x:data.x, y:data.y}), transPos({x:data.x, y:data.y})}} />
                                <Page width={size.width ? size.width : 1} pageNumber={pageNumber} renderMode="canvas" />
                            </Document>
                        </div>
                        )}
                        // ref={ref}
                    />
                :
                    <>
                        <img className="img-fluid my-3" src="/argon/img/background/pdf.svg" alt="" style={{width:'100px', height:'140px'}} />
                        <small className="text-muted text-uppercase ls-1 text-center" style={{fontSize: '0.6em'}}> <i> {noDataMessage}</i></small><br/>
                    </>
            }<br/>
            <div className="justify-content-center d-flex">
                {/* <div className="row">
                    <div className="col">
                        <input type="text" value={dPos.x} />
                        <input type="text" value={dPos.y} />
                        <input type="text" defaultValue={dimension.width} />
                        <input type="text" defaultValue={dimension.height} />
                    </div>
                </div> */}
                <small className="font-weight-600 my-3 text-center text-darker text-uppercase">Page {pageNumber} of {numPages}</small>
            </div>
        </>
    )
}

export default PdfContainerSign
