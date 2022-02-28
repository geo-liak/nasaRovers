import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { parseDate } from "../common/dateHandling";
import { ShowImage } from "../Context";

export default function ImageModal(props, ref) {
    const [showModal, setShowModal] = useContext(ShowImage);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [infoVisibilityBeingChecked, checkInfoVisibility] = useState(false);

    const detectKey = (e) => {
        
            if (e.key === 'i' || e.key === 'I' || e.keyCode === 9) {
                checkInfoVisibility(true);
            } else if (e.key === 'f' || e.key === 'F') {
                toggleFullscreen(e);
            } else if (e.keyCode === 27) {
                isFullscreen ? toggleFullscreen(e) : closeTheModal(e);
            }
       
    }
 
    useEffect(() => {
        document.addEventListener('keydown', detectKey);
        return () => {
            document.removeEventListener('keydown', detectKey);
        }
    }, [])

    const handleInfoIconClick = () => {
        checkInfoVisibility(true);
    }

    const closeTheModal = (e) => {
        e.preventDefault();
        setShowModal(false);
    }

    const toggleModal = () => {
        setShowModal(currentShowModal => !currentShowModal);
    }

    const toggleFullscreen = (e) => {
        e.preventDefault();
        setIsFullscreen(currentFullscreen => !currentFullscreen);
    }

    useEffect(() => {
        if (showModal) {
            setIsFullscreen(false);
        }
    }, [showModal])

    useEffect(() => {
        let infoText = document.getElementById('imageInformation');
        let infoIcon = document.getElementById('info');

        if (infoIcon && infoText) {
            if (isFullscreen) {
                infoText.classList.add('hide');
                infoIcon.classList.add('hide');
            } else {
                infoText.classList.add('hide');
                infoIcon.classList.remove('hide');
            }
        }
    }, [isFullscreen]);

    useEffect(() => {
        let infoText = document.getElementById('imageInformation');
        let infoIcon = document.getElementById('info');

        if (infoVisibilityBeingChecked) {
            if (infoText) {
                if (isFullscreen) {
                    infoText.classList.add('hide');
                    infoIcon.classList.add('hide');
                } else {
                    infoText.classList.toggle('hide');
                    infoIcon.classList.toggle('hide');
                }
            }
        }
        checkInfoVisibility(false);
    }, [infoVisibilityBeingChecked])

    const handleHide = () => {
        setShowModal(false);
    }

    return (
        <>
            <Modal onClick={(e) => { e.stopPropagation() }} backdrop={true} fullscreen={isFullscreen} show={showModal} className="backdropColor" onHide={handleHide}  >
                <div>
                    <div
                        onClick={(e) => toggleFullscreen(e)}
                        style={{ zIndex: '1', position: 'absolute', height: '85%', width: '100%' }}
                        className={isFullscreen ? 'cursor-zoomOut' : `cursor-zoomIn`}>
                    </div>
                    <span
                        onClick={toggleModal}
                        style={{ zIndex: '2' }}
                        id="closeButton"
                        className={`position-absolute top-0 end-0 closeModalX cursor-pointer ${isFullscreen ? 'px-5' : 'px-3'}`}>&times;
                    </span>
                    <img className="width-100" src={props.img_src} />

                    <div id="imageInformation" className="mask text-start d-flex align-items-end hide">
                        <span onClick={handleInfoIconClick} className="width-100 align-text-bottom infoBackgroundColor px-3 pb-1 pt-4">
                            <span className="description ">Photo id: </span>{props.id} <br />
                            <span className="description ">Taken on: </span>{parseDate(props.earth_date, 'short')} <br />
                            <span className="description ">Camera: </span>{props.camera.full_name + ' (' + props.camera.name + ')'}
                        </span>
                    </div>

                    <div id="info" className={`mask text-end d-flex align-items-end ${isFullscreen ? 'hide' : ''}`}>
                        <span className={`width-100 align-text-bottom text-end p-2 ${isFullscreen ? 'pe-5' : 'pe-3'} infoColor`} >
                            <i onClick={handleInfoIconClick} className="fas fa-info-circle cursor-pointer" style={{ zIndex: '3' }}></i>
                        </span>
                    </div>
                </div>
            </Modal>
        </>
    )
}