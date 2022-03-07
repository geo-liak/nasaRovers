import { useContext, useEffect, useState } from "react";
import { PHOTOS_PER_PAGE } from "../settings";
import { Range } from "../Context";

export default function Pagination(props) {
	const [range, setRange] = useContext(Range);
	const [page, setNewPage] = useState(1);

	const detectKey = (e) => {
		if (e.keyCode === 13) {
			const inputElement = document.getElementById('pageInput');
			if (document.activeElement === inputElement && inputElement.value !== '') {
				btnClick();
			}
		}
	}

	useEffect(() => {
		document.addEventListener('keydown', detectKey);
		return () => {
			document.removeEventListener('keydown', detectKey);
		}
	}, [])


	// Calculates the start and end point of the photosList that will be shown on
	// the particular page.
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

	const validateNewPageValue = (goToPageValue) => {
		const totalNumberOfPages = calculateNumberOfPages();

		if (goToPageValue >= 1 && goToPageValue <= totalNumberOfPages) {
			setNewPage(goToPageValue);
		}
		else if (goToPageValue > totalNumberOfPages) {
			setNewPage(totalNumberOfPages);
		}
		else if (goToPageValue < 1) {
			setNewPage(1);
		}

	}

	const btnClick = () => {
		const goToPageValue = (document.getElementById('pageInput').value === "" ? NaN : Number(document.getElementById('pageInput').value));

		validateNewPageValue(goToPageValue);

		document.getElementById('pageInput').value = '';
		calculatePageData();
	}

	const nextPage = () => {
		validateNewPageValue(page + 1);
	}

	const previousPage = () => {
		validateNewPageValue(page - 1);
	}
	useEffect(() => {
		calculatePageData();
	}, [page])

	useEffect(() => {
		calculatePageData();
	}, [])

	return (
		<>
			{calculateNumberOfPages() > 1 ?
				<div>
					<span title={page === 1 ? 'You are already at the first page' : "Go to first page"} onClick={() => { validateNewPageValue(1) }}><i class="fas fa-angle-double-left"></i></span>
					<span title={page === 1 ? 'You are already at the first page' : 'Go to page ' + (page - 1)} onClick={previousPage}><i class="fas fa-angle-left px-2"></i></span>
					<a style={{ padding: "10px", cursor: "pointer" }}>
						Page {page} of {calculateNumberOfPages()}
					</a>
					<input id="pageInput" className="form-control mx-2" type="text" name="pageNumber" style={{ width: '70px', display: 'inline' }} />
					<button onClick={btnClick} className="btn btn-secondary">Go</button>
					<span title={page === calculateNumberOfPages() ? 'You are already at the last page' : 'Go to page ' + (page + 1)} onClick={nextPage}><i class="fas fa-angle-right px-3"></i></span>
					<span title={page === calculateNumberOfPages() ? 'You are already at the last page' : "Go to the last page"} onClick={() => { validateNewPageValue(calculateNumberOfPages()) }}><i class="fas fa-angle-double-right"></i></span>
				</div>
				: ''
			}
		</>
	);
}
