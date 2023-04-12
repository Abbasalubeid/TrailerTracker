import React from "react";
import {discoverMovies} from "../model/fetchSource.js"
import MovieCardView from "../view/movieCardView.js";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function MovieCardPresenter(){
    const [popularMovies, setPopularMovies] = React.useState([]);

    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 10
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

    function mountACB(){
        discoverMovies().then((movies) => setPopularMovies(movies));
    }

    React.useEffect(mountACB, []);

    return (
        <Carousel responsive={responsive} className="movie-card-container">
          {popularMovies &&
            popularMovies.map((movie) => (
              <MovieCardView
                key = {movie.id}
                movie = {movie}
              />
            ))}
        </Carousel>
      );
}