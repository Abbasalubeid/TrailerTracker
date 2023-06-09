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
  return fetch(`${BASE_URL}movie/upcoming?api_key=${API_KEY}&primary_release_date.gte=${new Date().toISOString()}&primary_release_date.lte=${new Date(new Date().getFullYear() + 1, 0, 1).toISOString()}`)
  .then(treatHTTPResponseACB).then(transformACB);
}

function discoverMovies(page, genre = 0, sortBy = "", minVoteCount = 500) {
  const sortByParam = sortBy ? `&sort_by=${sortBy}` : "";
  const minVoteCountParam = `&vote_count.gte=${minVoteCount}`;
  const url = genre === 0
    ? `${BASE_URL}discover/movie?api_key=${API_KEY}&page=${page}${sortByParam}${minVoteCountParam}`
    : `${BASE_URL}discover/movie?api_key=${API_KEY}&page=${page}&with_genres=${genre}${sortByParam}${minVoteCountParam}`;
  
    return fetch(url)
      .then(treatHTTPResponseACB)
      .then(transformACB);
  }

function getVideo(id){
    return fetch(`${BASE_URL}movie/${id}/videos?api_key=${API_KEY}`).then(treatHTTPResponseACB).then(transformACB);
}

function getMovieDetails(id) {
    return fetch(`${BASE_URL}movie/${id}?api_key=${API_KEY}`).then(treatHTTPResponseACB).then(transfromDetailsACB);
  }

function getMovieByName(name) {
    return fetch(`${BASE_URL}search/movie?api_key=${API_KEY}&query=${name}`).then(treatHTTPResponseACB).then(transformACB);
  }

function getRecommendations(id) {
    return fetch(`${BASE_URL}movie/${id}/recommendations?api_key=${API_KEY}`).then(treatHTTPResponseACB).then(transformACB);
  }

function getCredits(id) {
    return fetch(`${BASE_URL}movie/${id}/credits?api_key=${API_KEY}`).then(treatHTTPResponseACB).then(transfromDetailsACB);
  }

export{topRatedMovies, trendingMovies, upcomingMovies, discoverMovies, getVideo, getMovieDetails, getMovieByName, getRecommendations, getCredits}