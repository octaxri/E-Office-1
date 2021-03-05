import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { Document, Page } from 'react-pdf';
import sizeMe, { SizeMe } from 'react-sizeme';
import * as loading from "../../../components/loading.json"
import Lottie from 'react-lottie';
import PdfSign from '../../guest/pdf/pdf-sign-test';

const SizedPdfContainer = (url, loadMessage, dPos, isNumPages) => {

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
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
                {/* <h2 className="text-darker text-uppercase my-2 ls-2 text-center">{loadMessage}</h2> */}
                <Lottie options={defaultOptions} height={120} width={120} />
            </>
        )
    }

    return (
        <SizeMe
            monitorHeight={true}
            refreshRate={128}
            refreshMode={"debounce"}
            render={({ size }) => (
                <div className="shadow my-3">
                    <Document
                        file={url}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={loader}
                    >
                        <PdfSign dPos={(data)=>dPos({x:data.x, y:data.y})} />
                    <Page width={size.width ? size.width : 1} pageNumber={pageNumber} renderMode="svg"/>
                    {/* <small>{size.width},{size.height}</small> */}
                    {/* {isDimension({width:size.width, height:size.height})} */}
                    </Document>
                </div>
            )}
            // onSize={(size)=>setDimension({width:size.width, height:size.height})}
        />
    )
}

export default withSize()(SizedPdfContainer)
