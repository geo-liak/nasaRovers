const KEY_TYPE = 'demo'; //demo or normal
const DEVELOPMENT_MODE = false; // If true then json-server is used
const PORT = 4001; // json-server port

export const PHOTOS_PER_PAGE = 5;

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
    rovers: "https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=" + API_KEY
}
const urls_jsonServer = {
    rovers: "http://localhost:" + PORT + "/rovers"
}

export const URL = determineUrls();




