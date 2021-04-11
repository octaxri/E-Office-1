import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import Lightbox from 'react-image-lightbox';
import Fade from 'react-reveal/Fade';

const overview = (props) => {

    let [photoIndex, setPhotoIndex] = useState(0)
    let [isOpen, setIsOpen] = useState(false)
    let [activeImage, setActiveImage] = useState('')

    useEffect(() => {
        console.log( !(4 % 2))
    }, [])

    const renderHeader = () => {
        return (
            <>
                <div className="row bg-dark mb-4">
                    <div className="col py-6 px-6  text-center">
                        <p className="text-uppercase text-white" style={{fontSize: '4rem'}}>Slight Application Overview</p>
                    </div>
                </div>
            </>
        )
    }

    const renderOverview = ({title, subtitle, imgUrl, key}) => {
        return (
            <>
                <div key={key} className="row py-6">

                    <div className={`col-lg-5 h-100 col-sm-12 my-auto px-6 ${!(key % 2) === true ? 'order-lg-last order-sm-last' : 'order-lg-first order-sm-last justify-content-end d-flex'}`}>
                        <div>
                            <div className="position-relative" style={{zIndex: '99'}}>
                                <Fade right>
                                    <p className="text-uppercase text-purple text-lg-left text-sm-center" style={{fontSize:'3.5rem'}}>{title}</p><br/>
                                </Fade>
                                <Fade bottom>
                                    <p className="text-muted" style={{fontSize: '1.3em'}}>{subtitle}</p>
                                </Fade>
                            </div>
                        </div>
                    </div>
                    <Fade left>
                        <div className={`col-lg-7 px-6 py-4 my-auto ${!(key % 2) === true ? 'order-lg-first order-sm-first' : 'order-lg-last order-sm-first'}`}>
                            <div>
                                <img className="img-fluid large-shadow about-icon-animated-2s rounded" src={imgUrl} alt="" onClick={()=>{setIsOpen(true), setActiveImage(imgUrl)}} style={{cursor:'pointer'}}/>
                            </div>
                            <div className="d-none d-lg-block">
                                {/* <div className="shape-layer"> */}
                                    <div className="square"></div>
                                    <div className="square-1"></div>
                                {/* </div> */}
                            </div>
                        </div>
                    </Fade>
                </div>
            </>
        )
    }

    const overviewList = [
        {
            title : 'Actions in one page',
            subtitle: "Single Page Applications at it's finest, actions without page refreshing, parallel loading time for faster content delivery",
            imgUrl: '/argon/img/overview/1.png'
        },
        {
            title : 'Global event trigger',
            subtitle: "A single touch will activate every action which you can do based on your role",
            imgUrl:'/argon/img/overview/2.png'
        },
        {
            title : 'Queue up your work',
            subtitle: "Processing document made simple, especially signing digital documents in one go",
            imgUrl:'/argon/img/overview/3.png'
        },
        {
            title : 'Save your progress',
            subtitle: "Queues accessible everywhere. Lost connection? No worries, saved in database already",
            imgUrl:'/argon/img/overview/4.png'
        }
    ]

    const renderMain = () => {
        return (
            <>
                {renderHeader()}
                {
                    overviewList.map((list, key) => (
                        renderOverview({
                            title: list.title,
                            subtitle: list.subtitle,
                            imgUrl: list.imgUrl,
                            key: key
                        })
                    ))
                }

                {
                    isOpen == true && (
                        <Lightbox
                            mainSrc={activeImage}
                            onCloseRequest={() => {setIsOpen(false), setActiveImage('')}}
                        />
                    )
                }
            </>
        )
    }

    return(
        <>
            <div className="container-fluid">
                {renderMain()}
            </div>
        </>
    )
}

export default overview
