import { Route, Routes } from "react-router-dom";
import RoverImages from "./pages/RoverImages";
import Rovers from "./pages/Rovers";

export default function RouteDefinitions() {
    return (
        <Routes>
            <Route path='/' element={<Rovers />} />
            <Route path='/rovers' element={<Rovers />} />
            <Route exact path='/roverPhotos/:rover/:date' element={<RoverImages />} />
            <Route exact path='/roverPhotos/:rover/' element={<RoverImages />} />
        </Routes>
    )
}