import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, } from "react-router-dom";
import PhotoCard from "../components/PhotoCard";
import Pagination, { calculateNumberOfPages, calculatePageData } from "../components/Pagination";


export default function RoverImages(props) {
	const [photosList, setPhotosList] = useState([]);
	const [photosForPage, setPhotosForPage] = useState([]);
	const navigate = useNavigate();
	let param = useParams();

	const itemsPerPage = 10;
	let pages = 1;

	// console.clear();
	console.log("Image width:", props.width);
	console.log("Image height:", props.height);
	console.log("url parameter rover:", param.rover);
	console.log("url parameter date:", param.date);

	// const API_KEY = "DEMO_KEY";
	const API_KEY = "vuvuUIFsCQhCJlgXemaYG2Db3CSnqNQTaQ35rj5m";

	const URL_BEGINNING =
		"https://api.nasa.gov/mars-photos/api/v1/rovers/" +
		param.rover.toLowerCase();
	const URL_DATE_PART = param.date
		? "/photos?earth_date=" + param.date
		: "/photos?sol=1000";
	const URL_API_KEY = "&api_key=" + API_KEY;

	// const photosList = require("../data/photosCuriocity.json").data.photos;

	useEffect(() => {
		if (typeof param.rover !== "undefined") {
			axios.get(URL_BEGINNING + URL_DATE_PART + URL_API_KEY).then((res) => {
				console.log("res:");
				console.log(res);
				console.log(res.data.photo);
				setPhotosList(res.data.photos);
			});
		}
	}, []);

	// const calculatePageData = (page) => {
	// 	if (typeof page === "undefined") {
	// 		page = 1;
	// 	}

	// 	let min = page * itemsPerPage - itemsPerPage;
	// 	let max = page * itemsPerPage;

	// 	setPhotosForPage(photosList.slice(min, max));
	// 	console.log(photosForPage);
	// };

	const photoClick = (imgsrc) => {
		navigate("/photo/", { state: { imgsrc: imgsrc } });
	};

	const backClick = () => {
		navigate(-1);
	};

	useEffect(() => {
		setPhotosForPage(calculatePageData(1, photosList));
	}, [photosList]);

	return (
		<>
			<h3>Photos by {param.rover}</h3>
			<a
				style={{
					border: "1px solid blue",
					padding: "4px 10px",
					cursor: "pointer",
				}}
				onClick={backClick}>
				Return to rovers
			</a>
			{photosForPage.map((photo) => {
				return (
					<div key={photo.id} style={{ overflow: "hidden" }}>
						<div
							style={{
								float: "left",
								border: "2px solid green",
								padding: "5px",
								margin: "2px auto",
								height: "82px",
							}}>
							Photo id: {photo.id} <br />
							Taken on: {photo.earth_date} <br />
							Camera: {photo.camera.full_name} ({photo.camera.name})
						</div>
						<div
							style={{ float: "left" }}
							onClick={() => {
								photoClick(photo.img_src);
							}}>
							<PhotoCard width='100px' height='100px' imgsrc={photo.img_src} />
						</div>
					</div>
				);
			})}
			<Pagination photosList={photosList} />
		</>
	);
}
