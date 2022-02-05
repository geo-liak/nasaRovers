import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DatePicker from "./DatePicker";
import { DatePickerValue } from "../Context";
import { parseDate } from "../common/dateHandling";

export default function RoverCard(props) {
	const [selectedDate, setSelectedDate] = useState('');
	const dateSettings = { weekday: 'long', month: 'long', year: 'numeric', day: "numeric" };

	let navigate = useNavigate();

	const onButtonClick = () => {
		if (selectedDate === '') {
			navigate('/roverPhotos/' + props.name + "/" + props.max_date);
		} else {
			navigate('/roverPhotos/' + props.name + "/" + selectedDate);
		}
	};

	useEffect(() => {
		console.log(selectedDate);
	}, [selectedDate]);

	return (
		<>
			<DatePickerValue.Provider value={[selectedDate, setSelectedDate]}>
				<Card key={props.uniqueKey} className="roverCard">
					<Card.Body>
						<Card.Title className="">{props.name}</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">Mission {(props.status === 'complete') ? 'completed' : 'active'}</Card.Subtitle>
						<Card.Text className="">Photos taken: {props.total_photos}</Card.Text>
						<Card.Text className="my-0"> Landed on: {parseDate(props.landing_date, 'long')}</Card.Text>
						<Card.Text>{props.status === 'complete' ? 'Mission completed on: ' + parseDate(props.max_date, 'long') : ''}</Card.Text>
					</Card.Body>
					<span>
						<DatePicker min={props.landing_date} max={props.max_date} />
						<button className="btn btn-outline-primary" title={"Show photos taken on " + (selectedDate === '' ? parseDate(props.max_date, 'short') : parseDate(selectedDate, 'short'))} onClick={onButtonClick}>See photos</button>
					</span>
				</Card>
			</DatePickerValue.Provider>
		</>
	);
}
