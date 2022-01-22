import { useEffect, useState } from "react";

const itemsPerPage = 5;

export const calculateNumberOfPages = (photosList) => {
	let totalPages = 0;

	// if (typeof photosList.isArray() && photosList.length > 0) {
	if (photosList.length % itemsPerPage === 0) {
		totalPages = parseInt(photosList.length / itemsPerPage);
	} else {
		totalPages = parseInt(photosList.length / itemsPerPage) + 1;
	}

	console.log("total pages:", totalPages);

	return totalPages;
	// }
};

export const calculatePageData = (page, photosList) => {
	if (typeof page === "undefined") {
		page = 1;
	}

	let min = page * itemsPerPage - itemsPerPage;
	let max = page * itemsPerPage;

	return photosList.slice(min, max);
};

export default function Pagination(props) {
	console.log(props);

	const [elements, setElements] = useState([]);

	const ancorClick = () => {
		console.log("clicked ancor");
	};

	const createPages = () => {
		const totalPages = calculateNumberOfPages(props.photosList);
		console.log("inside method", totalPages);

		let tempElements = [];
		for (let i = 0; i < totalPages; i++) {
			tempElements.push((i + 1).toString());
		}
		setElements(tempElements);
		console.log(tempElements);
	};

	useEffect(() => {
		console.log("useeffect");

		createPages();
	}, []);

	return (
		<>
			{elements.map((element) => {
				return (
					<a
						style={{ padding: "10px", cursor: "pointer" }}
						onClick={ancorClick}>
						{element}
					</a>
				);
			})}
		</>
	);
}
