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

    filterAndSortMovies({ movies, genre, sortType }) {
      let filteredMovies = movies.slice(0, 30)
      
      // Filter movies by genre
      if (genre !== 0) {
        filteredMovies = filteredMovies.filter(movie => movie.genre_ids.includes(genre));
      }
      
      // Sort movies
      switch(sortType) {
        case "topRatedDesc":
          filteredMovies.sort((a, b) => b.vote_average - a.vote_average);
          break;
        case "topRatedAsc":
          filteredMovies.sort((a, b) => a.vote_average - b.vote_average);
          break;
        case "popularityDesc":
          filteredMovies.sort((a, b) => b.popularity - a.popularity);
          break;
        case "popularityAsc":
          filteredMovies.sort((a, b) => a.popularity - b.popularity);
          break;
        case "newestFirst":
          filteredMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
          break;
        case "oldestFirst":
          filteredMovies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
          break;
        case "alphabeticalAsc":
          filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "alphabeticalDesc":
          filteredMovies.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case "shuffle":
          filteredMovies.sort(() => Math.random() - 0.5);
          break;
        case "trendingDesc":
          filteredMovies.sort((a, b) => b.popularity - a.popularity || b.vote_average - a.vote_average);
          break;
        case "trendingAsc":
          filteredMovies.sort((a, b) => a.popularity - b.popularity || a.vote_average - b.vote_average);
          break;
        default:
          break;
      }
    
      return filteredMovies;
    }
    

    
}