import { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { DatePickerValue } from "../Context";

// props:
// min: the minimum date available for selection in the datepicker
// max: the maximum date available for selection in the datepicker
// selectedDateValue: a date setter
export default function DatePicker(props) {
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useContext(DatePickerValue);
    const [isDateSelected, setIsDateSelected] = useState(false);
    const [tempDate, setTempDate] = useState();
	const dateSettings = { day: "numeric", month: 'numeric', year: 'numeric'};


    useEffect(() => {
        while (typeof document.getElementById('date') === 'null') {
            document.getElementById('date').value = '';
        }
    }, [])

    function toggleModal() {
        setShowModal(!showModal);
    }

    const clearDate = () => {
        setSelectedDate('');
        setTempDate('');
        setIsDateSelected(false)
    }

    const handleHide = () => {
        let dateValue = document.getElementById('date').value;
        setSelectedDate(dateValue);
        toggleModal();
    }

    const onDateChange = (e) => {
        setTempDate(e.target.value);
    };

    useEffect(() => {
        (selectedDate === '') ? setIsDateSelected(false) : setIsDateSelected(true);
    }, [showModal]);


    return (
        <>
            <div title={selectedDate} className="container newWidth inline">

                <i
                    id="dateIcon"
                    className={`dateIconSize far fa-calendar-alt ${isDateSelected ? 'dateIconSelectedDate' : ''} `}
                    title={selectedDate}
                    onClick={toggleModal}
                >
                </i>

                {isDateSelected ? <span
                    id="clearDateBtn"
                    onClick={clearDate}
                    title="Clear selected date"
                    className={`clearDate ps-2 ${!isDateSelected ? 'hide' : ''}`}>&times;</span> : ''}


                <span onClick={toggleModal} id="dateInfo" className="dateInfo ps-2" >{isDateSelected ? new Date(selectedDate).toLocaleDateString(undefined, dateSettings) : ''}</span>


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
                        min={props.min}
                        max={props.max}
                    />
                </Modal>
            </div>
        </>
    )
}