export default class MovieModel{

    constructor() {
        this.currentMovie = {}
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

        const validMovies = movies.filter(isValidCB)
        return validMovies.sort(betterRankCB);
    }

    filteredMovies(genre, movies){
        function isInGenreCB(movie){
            return movie.genre_ids.includes(genre)
        }

        let enoughMovies = movies;
        if (movies.length > 30) {
            enoughMovies = movies.slice(0, 20);
        }

        return enoughMovies.filter(isInGenreCB);
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