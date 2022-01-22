import "./css/App.css";
import { BrowserRouter } from "react-router-dom";
import RouteDefinitions from "./Routes";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
	return (
		<div className='App'>
			{/* <h1>Photos taken by the NASA rovers</h1> */}
			<BrowserRouter>
				<RouteDefinitions />
			</BrowserRouter>
		</div>
	);
}

export default App;
