import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { MDBDatePickerV5 } from 'mdbreact';
import { useNavigate } from "react-router-dom";

export default function RoverCard(props) {
	const [selectedDate, setSelectedDate] = useState(props.max_date);
	const dateSettings = { weekday: 'long', month: 'long', year: 'numeric', day: "numeric" };

	let navigate = useNavigate();

	useEffect(() => {

	}, []);

	const onButtonClick = () => {
		navigate('/roverPhotos/' + props.name + "/" + selectedDate);
	};

	const onCardClick = () => {
		navigate('/roverPhotos/' + props.name + "/" + selectedDate);
	};

	const onDateChange = (e) => {
		setSelectedDate(e.target.value);
	};



	const style = {
		// color: "red",
		borderStyle: "solid",
		borderWidth: "2px",
		width: "45%",
		position: "center",
		margin: "20px auto",
		padding: "5px 10px",
	};

	return (
		<>
			{/* {console.log(props.name)} */}
			{/* <div key={props.id} style={style} onClick={onCardClick}>
				<h4>{props.name}</h4>
				<p>has taken {props.total_photos} images.</p>
				<p>It was landed on {new Date(props.landing_date).toLocaleDateString(undefined, dateSettings)}.</p>
				<p>Its mission is considered {(props.status === 'complete') ? 'completed on ' + (new Date(props.max_date).toLocaleDateString(undefined, dateSettings)) : props.status}.</p>
			</div>
			<input onChange={(e) => onDateChange(e)} id="date" type="date" min={props.landing_date} max={props.max_date} />
			<button onClick={onButtonClick}>See photos</button> */}
			<Card className="" style={style}>
				<Card.Body>
					<Card.Title className="">{props.name}</Card.Title>
					<Card.Subtitle className="mb-2 text-muted">Mission {(props.status === 'complete') ? 'completed' : 'active'}</Card.Subtitle>
					<Card.Text className="">Photos taken: {props.total_photos}</Card.Text>
					<Card.Text className="my-0"> Landed on: {new Date(props.landing_date).toLocaleDateString(undefined, dateSettings)}</Card.Text>
					<Card.Text>{props.status === 'complete' ? 'Mission completed on: ' + new Date(props.max_date).toLocaleDateString(undefined, dateSettings) : ''}</Card.Text>
				</Card.Body>
				<span>  <input onChange={(e) => onDateChange(e)} id="date" type="date" min={props.landing_date} max={props.max_date} />
				<button title={"Show photos taken on " + ''} onClick={onButtonClick}>See photos</button> </span>
			</Card>
		</>
	);
}
