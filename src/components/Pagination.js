import { useContext, useEffect, useState } from "react";
import { PHOTOS_PER_PAGE } from "../settings";
import { Range } from "../Context";




export default function Pagination(props) {
	const [range, setRange] = useContext(Range);
	const [page, setNewPage] = useState(1);

	useEffect(() => {
		console.log(range);
	}, [])	
	console.log('length: ', props.photosList.length);

	// // Returns a part of the photosList that corresponds to the particular page.
	const calculatePageData = () => {
		if (typeof page === "undefined") {
			setNewPage(1);
		}

		let min = page * PHOTOS_PER_PAGE - PHOTOS_PER_PAGE;
		let max = page * PHOTOS_PER_PAGE;

		setRange({
			min: min,
			max: max
		});

		// return props.photosList.slice(min, max);
	};

	// Based on the photosList and the photos per page, it calculates the number of 
	// pages
	const calculateNumberOfPages = () => {
		let totalPages = 0;

		if (props.photosList.length % PHOTOS_PER_PAGE === 0) {
			totalPages = parseInt(props.photosList.length / PHOTOS_PER_PAGE);
		} else {
			totalPages = parseInt(props.photosList.length / PHOTOS_PER_PAGE) + 1;
		}

		return totalPages;
	};

	const btnClick = () => {
		const totalNumberOfPages = calculateNumberOfPages();
		const goToPageValue = document.getElementById('pageInput').value;
		
		if (goToPageValue >= 1 || goToPageValue <= totalNumberOfPages) {
			setNewPage(goToPageValue);
		} else if (goToPageValue > totalNumberOfPages) {
			setNewPage(totalNumberOfPages);
		} else if (goToPageValue < 1) {
			setNewPage(1);
		}

		document.getElementById('pageInput').value = '';
		calculatePageData();
	}

	useEffect(() => {
		calculatePageData();
	}, [page])
	
	useEffect(() => {
		calculatePageData();
	}, [])


	return (
		<>
			<div>
				<a style={{ padding: "10px", cursor: "pointer" }}>
					Page {page} of {calculateNumberOfPages()}
				</a>
				<input id="pageInput" className="form-control mx-2" type="text" name="pageNumber" style={{ width: '70px', display: 'inline' }} />
				<button onClick={btnClick} className="btn btn-secondary">Go</button>
			</div>

		</>
	);
}
