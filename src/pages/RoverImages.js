import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, } from "react-router-dom";
import Pagination from "../components/Pagination";
import { URL, API_KEY, PHOTOS_PER_PAGE } from "../settings";
import ImageCard from "../components/ImageCard";
import { Range } from "../Context";

export default function RoverImages(props) {
	const [retrievedPhotosList, setRetrievedPhotosList] = useState([]);
	const [photosForPage, setPhotosForPage] = useState([]);
	const [range, setRange] = useState({ min: 1, max: PHOTOS_PER_PAGE });
	const navigate = useNavigate();
	let param = useParams();

	useEffect(() => {
		console.log('start');
		console.log(range);
		setPhotosForPage(retrievedPhotosList.slice(range.min, range.max));
	}, []);

	useEffect(() => {
		console.log(range);
		setPhotosForPage(retrievedPhotosList.slice(range.min, range.max));
	}, [range]);


	console.log("Image width:", props.width);
	console.log("Image height:", props.height);
	console.log("url parameter rover:", param.rover);
	console.log("url parameter date:", param.date);


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
					// console.log("res:");
					// console.log(res);
					// console.log(res.data.photos);
					setRetrievedPhotosList(res.data.photos);
				})
				.catch(function (error) {
					if (error.response) {
						// console.log(error.response.data);
						// console.log(error.response.status);
					}
				})
		}
	}, []);



	const photoClick = (imgsrc) => {
		navigate("/photo/", { state: { imgsrc: imgsrc } });
	};

	const backClick = () => {
		navigate(-1);
	};

	// useEffect(() => {
	// 	setPhotosForPage(calculatePageData(1, retrievedPhotosList));
	// }, [retrievedPhotosList]);

	return (
		<>
			<Range.Provider value={[range, setRange]}>
				<h3>Photos by {param.rover}</h3>
				<button onClick={backClick} className="btn btn-primary" >Return to Rovers</button>


				<div >
					{photosForPage.map((photo) => {
						return (
							<>
								<ImageCard {...photo} />
							</>
						);
					})}
				</div>

				{retrievedPhotosList.length > 0 ? <Pagination photosList={retrievedPhotosList} /> : ''}
			</Range.Provider>
		</>
	);
}
