export default class MovieModel{

    constructor() {
        this.currentMovie = {}
    }

    setCurrentMovie(movie) {
        this.currentMovie = movie;
    }

    validMovies(movies){
        function isValidCB(movie) {
            return movie.title && movie.poster_path && movie.release_date;
        }

        return movies.filter(isValidCB)
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

    filterMovies(movies, genre) {
      let filteredMovies = movies.slice(0, 30)

      // Filter movies by genre
      if (genre !== 0) {
        filteredMovies = filteredMovies.filter(movie => movie.genre_ids.includes(genre));
      }
      return filteredMovies;
    }

    sortedMovies(validMovies, activeSortingFilter) {

      if (!activeSortingFilter) {
        return validMovies;
      }
      validMovies.sort((a, b) => {
        switch (activeSortingFilter) {
          case "vote_average.desc":
            return b.vote_average - a.vote_average;
          case "vote_average.asc":
            return a.vote_average - b.vote_average;
          case "popularity.desc":
            return b.popularity - a.popularity;
          case "popularity.asc":
            return a.popularity - b.popularity;
          case "release_date.desc":
            return new Date(b.release_date) - new Date(a.release_date);
          case "release_date.asc":
            return new Date(a.release_date) - new Date(b.release_date);
          default:
            return 0;
        }
      });

      return validMovies;
    }
}