import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { parseDate } from "../common/dateHandling";


export default function ImageModal(props) {
    const [isFullsreen, setIsFullscreen] = useState(false);

    const closeTheModal = () => {
        props.showing(false);
    }

    const showInfo = () => {
        document.getElementById('imageInformation').classList.toggle('hide');
        document.getElementById('info').classList.toggle('hide');
    }

    const toggleFullscreen = () => {
        console.log('toggle fullscreen')
        setIsFullscreen(!isFullsreen);
    }

    useEffect(() => {
        console.log(isFullsreen);
        let closeBtn = document.getElementById('closeButton');
        if (isFullsreen) {
            closeBtn.classList.remove('px-3');
            closeBtn.classList.add('px-5');
        } else {
            closeBtn.classList.remove('px-5');
            closeBtn.classList.add('px-3');
        }
    }, [isFullsreen]);

    const detectKey = (e) => {
        if (e.key === 'i' || e.key === 'I' || e.keyCode === 9) {
            showInfo();
        } else if (e.keyCode === 27) {
            closeTheModal();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', detectKey);
        return () => {
            document.removeEventListener('keydown', detectKey);
        }
    }, [])


    return (
        <>
            <Modal onKeydown={(e) => { detectKey(e) }} fullscreen={isFullsreen} keyboard="true" show="true" className="backdropColor modal">
                <span id="closeButton" className="position-absolute top-0 end-0 px-3 closeModalX" onClick={closeTheModal}>&times;</span>
                <img onClick={toggleFullscreen} src={props.img_src} />
                <div id="imageInformation" className="mask text-start d-flex align-items-end hide">
                    <span className="width-100 align-text-bottom infoBackgroundColor px-3 pb-1 pt-4">
                        <span className="description ">Photo id: </span>{props.id} <br />
                        <span className="description ">Taken on: </span>{parseDate(props.earth_date, 'short')} <br />
                        <span className="description ">Camera: </span>{props.camera.full_name + ' (' + props.camera.name + ')'}
                    </span>
                </div>
                <div onClick={showInfo} id="info" className="mask text-end d-flex align-items-end">
                    <span className="width-100 align-text-bottom text-end p-2 pe-3 infoColor" ><i class="fas fa-info-circle"></i></span>
                </div>
                <div class="tooltip bs-tooltip-top" role="tooltip">
                    <div class="arrow"></div>
                    <div class="tooltip-inner">
                        Some tooltip text!
                    </div>
                </div>
            </Modal>
        </>
    )
}   