import "./css/App.css";
import { BrowserRouter } from "react-router-dom";
import RouteDefinitions from "./Routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { DEVELOPMENT_MODE } from "./settings";


function App() {
	return (
		<div className='App'>
			{/* <h1>Photos taken by the NASA rovers</h1> */}
			<BrowserRouter>
				{DEVELOPMENT_MODE ? <p style={{"color": "red"}} className="text-end pe-2">Development Mode</p> : ''}
				<RouteDefinitions />
			</BrowserRouter>
		</div>
	);
}

export default App;
