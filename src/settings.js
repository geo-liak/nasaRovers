const KEY_TYPE = 'normal'; //demo or normal
export const DEVELOPMENT_MODE = false; // If true then json-server is used
const PORT = 4001; // json-server port

export const PHOTOS_PER_PAGE = 8;

// NASA's open APIs have certain limitations:
// A demo key allows for:
// • Hourly Limit: 30 requests per IP address per hour.
// • Daily Limit: 50 requests per IP address per day.
// A normal key allows for:
// • Hourly Limit: 1,000 requests per hour
const determineApiKeys = () => {
    switch (KEY_TYPE) {
        case "demo":
            return "DEMO_KEY";
        default:
            return "vuvuUIFsCQhCJlgXemaYG2Db3CSnqNQTaQ35rj5m";
    }
}

const determineUrls = () => {
    switch (DEVELOPMENT_MODE) {
        case true:
            return urls_jsonServer;
        default:
            return urls_nasa;
    }
}

export const API_KEY = determineApiKeys();

const urls_nasa = {
    domain: "https://api.nasa.gov",
    rovers: "https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=" + API_KEY,
    photos: "https://api.nasa.gov/mars-photos/api/v1/rovers/:rover/photos?:date&api_key=" + API_KEY
}
const urls_jsonServer = {
    domain: "http://localhost:" + PORT,
    rovers: "http://localhost:" + PORT + "/rovers",
    roverPhotos: "http://localhost:" + PORT + "/roverPhotos"
}

export const URL = determineUrls();




