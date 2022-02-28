
import { MDBCard } from "mdb-react-ui-kit";
import { useRef, useState } from "react";
import ImageModal from "./ImageModal";
import { parseDate } from "../common/dateHandling";
import { ShowImage } from "../Context";


export default function ImageCard(props) {

    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        setShowModal(!showModal);
    }

    return (
        <ShowImage.Provider value={[showModal, setShowModal]}>
            <MDBCard onClick={() => {handleClick()}} style={{ width: '18rem', display: 'inline-block' }} className="bg-image hover-overlay m-3">
                <div className='bg-image hover-overlay' style={{ maxWidth: '24rem' }}>
                    <img src={props.img_src} className='w-100' />
                    <div
                        className='mask text-start d-flex align-items-end p-3'
                        style={{
                            background: 'linear-gradient(45deg, rgba(29, 236, 197, 0.4), rgba(91, 14, 214, 0.3) 100%)',
                            color: '#fff'
                        }}
                    >
                        <span className='align-text-bottom'>
                            <span className="description">Photo id: </span>{props.id} <br />
                            <span className="description">Taken on: </span>{parseDate(props.earth_date, 'short')} <br />
                            <span className="description">Camera: </span>{props.camera.full_name + ' (' + props.camera.name + ')'}
                        </span>
                    </div>
                </div>

                <ImageModal {...props} />
            </MDBCard>
        </ShowImage.Provider>
    )
}