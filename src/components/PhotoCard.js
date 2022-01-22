import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";

export default function PhotoCard(props) {

	// let param = useParams();
	let location = useLocation();
	let navigate = useNavigate();

	let photoUrl = (location.state) ? location.state.imgsrc : props.imgsrc;

	// (location.state) ? console.log(location.state) : console.log('location is empty');

	// console.log(photoUrl);

	const areDimensionsSet = () => {
		if (
			typeof props.width === "undefined" ||
			typeof props.height === "undefined"
		) {
			return false;
		}
		return true;
	};

	return (
		<>
			{areDimensionsSet() ? (
				<img src={photoUrl} width={props.width} height={props.height} />
			) : (
				<>
					<img src={photoUrl} />
				</>
			)}
			
		</>
	);
}
