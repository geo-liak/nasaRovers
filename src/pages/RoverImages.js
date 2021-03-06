import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, } from "react-router-dom";
import Pagination from "../components/Pagination";
import {  API_KEY, PHOTOS_PER_PAGE } from "../settings";
import ImageCard from "../components/ImageCard";
import { Range } from "../Context";

export default function RoverImages(props) {
	const [retrievedPhotosList, setRetrievedPhotosList] = useState([]);
	const [photosForPage, setPhotosForPage] = useState([]);
	const [range, setRange] = useState({ min: 1, max: PHOTOS_PER_PAGE });
	const navigate = useNavigate();
	let param = useParams();

	useEffect(() => {
		setPhotosForPage(retrievedPhotosList.slice(range.min, range.max));
	}, []);

	useEffect(() => {
		setPhotosForPage(retrievedPhotosList.slice(range.min, range.max));
	}, [range]);


	const URL_BEGINNING =
		"https://api.nasa.gov/mars-photos/api/v1/rovers/" +
		param.rover.toLowerCase();
	const URL_DATE_PART = param.date
		? "/photos?earth_date=" + param.date
		: "/photos?sol=1000";
	const URL_API_KEY = "&api_key=" + API_KEY;

	useEffect(() => {
		if (typeof param.rover !== "undefined") {
			axios.get(URL_BEGINNING + URL_DATE_PART + URL_API_KEY)
				.then((res) => {
					setRetrievedPhotosList(res.data.photos);
				})
				.catch(function (error) {
					if (error.response) {
					}
				})
		}
	}, []);

	const backClick = () => {
		navigate(-1);
	};

	return (
		<>
			<Range.Provider value={[range, setRange]}>
				<h3>Photos by {param.rover}</h3>
				<button onClick={backClick} className="btn btn-primary" >Return to Rovers</button>


				<div >
					{photosForPage.map((photo, index) => {
						return (
							<ImageCard key={index} {...photo} />
						);
					})}
				</div>

				{retrievedPhotosList.length > 0 ? <Pagination photosList={retrievedPhotosList} /> : ''}
			</Range.Provider>
		</>
	);
}
