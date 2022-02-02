import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DatePicker from "./DatePicker";

export default function RoverCard(props) {
	const [selectedDate, setSelectedDate] = useState(props.max_date);
	const dateSettings = { weekday: 'long', month: 'long', year: 'numeric', day: "numeric" };

	let navigate = useNavigate();

	

	const onButtonClick = () => {
		navigate('/roverPhotos/' + props.name + "/" + selectedDate);
	};

	const onCardClick = () => {
		navigate('/roverPhotos/' + props.name + "/" + selectedDate);
	};

	const onDateChange = (e) => {
		setSelectedDate(e.target.value);
	};

	useEffect(() => {
		console.log(selectedDate);
	}, [selectedDate]);

	return (
		<>
			<Card key={props.uniqueKey} className="roverCard">
				<Card.Body>
					<Card.Title className="">{props.name}</Card.Title>
					<Card.Subtitle className="mb-2 text-muted">Mission {(props.status === 'complete') ? 'completed' : 'active'}</Card.Subtitle>
					<Card.Text className="">Photos taken: {props.total_photos}</Card.Text>
					<Card.Text className="my-0"> Landed on: {new Date(props.landing_date).toLocaleDateString(undefined, dateSettings)}</Card.Text>
					<Card.Text>{props.status === 'complete' ? 'Mission completed on: ' + new Date(props.max_date).toLocaleDateString(undefined, dateSettings) : ''}</Card.Text>
				</Card.Body>
				<span>
					<DatePicker min={props.landing_date} max={props.max_date} selectedDateValue={setSelectedDate} />
					{/* <i class="far fa-calendar-alt"></i> */}
					{/* <input className="btn btn-outline-dark me-2 px-2" onChange={(e) => onDateChange(e)} id="date" type="date" min={props.landing_date} max={props.max_date} /> */}
					<button className="btn btn-outline-primary" title={"how photos taken on " + ''} onClick={onButtonClick}>See photos</button>
				</span>
			</Card>
		</>
	);
}
