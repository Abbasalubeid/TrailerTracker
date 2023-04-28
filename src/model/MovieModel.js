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
}