
import { MDBCard } from "mdb-react-ui-kit";

export default function ImageCard(props) {

    // This is the card that will be used in the rover's photo list.
    // The PhotoCard is about to be deleted.
    
    return (
        <MDBCard style={{ width: '18rem', display: 'inline-block' }} className="bg-image hover-overlay m-3">
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
                        <span style={{ color: '#fff8' }}>Photo id: </span>{props.id} <br />
                        <span style={{ color: '#fff8' }}>Taken on: </span>{props.earth_date} <br />
                        <span style={{ color: '#fff8' }}>Camera: </span>{props.camera.full_name + ' (' + props.camera.name + ')'}
                    </span>
                </div>
            </div>
        </MDBCard>
    )
}