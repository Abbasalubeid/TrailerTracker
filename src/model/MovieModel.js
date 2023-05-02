export default class MovieModel{

    constructor() {
        this.currentMovie = {}
        this.genres = [
            { id: 0, name: "All" },
            { id: 28, name: "Action" },
            { id: 878, name: "Science fiction" },
            { id: 12, name: "Adventure" },
            { id: 14, name: "Fantasy" },
            { id: 16, name: "Animation" },
            { id: 18, name: "Drama" },
            { id: 27, name: "Horror" },
            { id: 10752, name: "War" }
        ];
    }

    setCurrentMovie(movie) {
        this.currentMovie = movie;
    }

    validMovies(movies){
        function betterRankCB(movie1, movie2) {
            return movie2.vote_average - movie1.vote_average
        }
        
        function isValidCB(movie) {
            return movie.title && movie.poster_path && movie.release_date;
        }

        const validMoviesSet = new Set(movies.filter(isValidCB));
        return Array.from(validMoviesSet).sort(betterRankCB);
    }

    filteredMovies(genre, movies){
        function isInGenreCB(movie){
            return movie.genre_ids.includes(genre)
        }
        const moviesSet = new Set(movies);
        return Array.from(moviesSet).filter(isInGenreCB);
    }

    chooseTrailers(trailers){
        function originalOrOfficialCB(trailer){
            // Using the official property of each trailer is not always consistent
            return trailer.name.toLowerCase().includes("official trailer") ||
                    trailer.name.toLowerCase().includes("original trailer")
        }

        const officialTrailers = trailers.filter(originalOrOfficialCB);

        let sortedTrailers = officialTrailers.slice(0, 2);
    
          if (sortedTrailers.length === 0) {
            sortedTrailers = trailers.slice(0, 2);
          }
        
        return sortedTrailers;
    }
}