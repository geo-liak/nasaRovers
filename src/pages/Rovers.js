import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import RoverCard from "../components/RoverCard";
// import { API_KEY } from "../settings";
import { URL } from '../settings';

export default function Rovers() {
	// const URL =
	// "https://api.nasa.gov/mars-photos/api/v1/rovers?sol=1000&page=2&api_key=";
	// const API_KEY = "DEMO_KEY";
	// const API_KEY = "vuvuUIFsCQhCJlgXemaYG2Db3CSnqNQTaQ35rj5m";

	const [firstRender, setFirstRender] = useState(true);
	const [retrievedData, setRetrievedData] = useState();

	useEffect(() => {
		console.log(URL.rovers)
		axios.get(URL.rovers).then((res) => {
			console.log(res);
			setRetrievedData(res.data);
		});
		setFirstRender(false);
	}, []);



	return (
		<>
		<div>
			<h1> NASA Rovers</h1>
			{typeof retrievedData !== "undefined"
				? retrievedData.rovers.map((rover, index) => {
					return <RoverCard uniqueKey={index} key={index} {...rover} />;
				})
				: (!firstRender) ? "Information about NASA rovers could not be retrieved. Please try later." : ""}
		</div>
		</>
	);
}
