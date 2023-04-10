import { BASE_URL, API_KEY } from "./apiConfig.js"

function treatHTTPResponseACB(response) {

    if (response.status !== 200)
        throw new Error("HTTP response wrong status: " + response.status);
    else
        return response.json();
}

function transformACB(object) {
    return object.results;
}

function discoverMovies(){
    return fetch(BASE_URL + "discover/movie?api_key=" + API_KEY).then(treatHTTPResponseACB).then(transformACB);
}

export{discoverMovies}