import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

// props:
// min: the minimum date available for selection in the datepicker
// max: the maximum date available for selection in the datepicker
// selectedDateValue: a date setter
export default function DatePicker(props) {
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [isDateSelected, setIsDateSelected] = useState(false);
    const [tempDate, setTempDate] = useState();


    function toggleModal(e) {
        setShowModal(!showModal);
    }

    const clearDate = () => {
        setSelectedDate('');
        setIsDateSelected(false)
    }

    const handleHide = (e) => {
        let dateValue = document.getElementById('date').value;
        setSelectedDate(dateValue);
        toggleModal(e);
    }

    const showDate = () => {
        document.getElementById('dateInfo').innerText = (typeof selectedDate === 'undefined' ? '' : selectedDate);
    }

    const onDateChange = (e) => {
        setTempDate(e.target.value);
    };

    useEffect(() => {
        (selectedDate === '') ? setIsDateSelected(false) : setIsDateSelected(true);
        if (!showModal) {
            showDate();
        }

        if (showModal) {

        }
    }, [showModal]);

    useEffect(() => {
        props.selectedDateValue(selectedDate);
    }, [selectedDate]);

    return (
        <>
            <div style={{ display: 'inline' }} title={selectedDate} className="container newWidth">

                <i
                    id="dateIcon"
                    class={`far fa-calendar-alt ${isDateSelected ? 'dateIconSelectedDate' : ''} `}
                    style={{ fontSize: '23px' }}
                    title={selectedDate}
                    onClick={toggleModal}
                >
                </i>

                {isDateSelected ? <span
                    id="clearDateBtn"
                    onClick={clearDate}
                    style={{
                        fontSize: '15px',
                        fontWeight: '100',
                        cursor: 'pointer',
                        top: '-3px',
                        left: '1px',
                        position: 'relative',

                        // }} title="Clear selected date" className={`ps-2 }`}>&times;</span> : ''}
                    }} title="Clear selected date" className={`ps-2 ${!isDateSelected ? 'hide' : ''}`}>&times;</span> : ''}


                <span onClick={toggleModal} id="dateInfo" className="ps-2" style={{ position: 'relative', top: '-1px' }}>{selectedDate}</span>


                <Modal 
                    id="modal"
                    centered="true"
                    onHide={handleHide}
                    backdrop={true}
                    show={showModal}
                    className="backdropColor-light"
                >
                    <input
                        className="btn inline"
                        id="date"
                        value={tempDate}
                        onChange={(e) => onDateChange(e)}
                        type="date"
                        style={{ display: 'inline' }}
                        min={props.min}
                        max={props.max}
                    />
                </Modal>
            </div>
        </>
    )
}