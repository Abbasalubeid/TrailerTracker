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

function transfromDetailsACB(object) {
    return object;
}

function topRatedMovies(){
    return fetch(`${BASE_URL}movie/top_rated?api_key=${API_KEY}`).then(treatHTTPResponseACB).then(transformACB);
}

function trendingMovies(){
    return fetch(`${BASE_URL}trending/movie/day?api_key=${API_KEY}`).then(treatHTTPResponseACB).then(transformACB);
}

function upcomingMovies(){
    return fetch(`${BASE_URL}movie/upcoming?api_key=${API_KEY}`).then(treatHTTPResponseACB).then(transformACB);
}

function discoverMovies(){
    return fetch(`${BASE_URL}discover/movie?api_key=${API_KEY}`).then(treatHTTPResponseACB).then(transformACB);
}

function getVideo(id){
    return fetch(`${BASE_URL}movie/${id}/videos?api_key=${API_KEY}`).then(treatHTTPResponseACB).then(transformACB);
}

function getMovieDetails(id) {
    return fetch(`${BASE_URL}movie/${id}?api_key=${API_KEY}`).then(treatHTTPResponseACB).then(transfromDetailsACB);
  }

export{topRatedMovies, trendingMovies, upcomingMovies, discoverMovies, getVideo, getMovieDetails}