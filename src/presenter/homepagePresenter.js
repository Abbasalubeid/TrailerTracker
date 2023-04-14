import React from "react";
import {discoverMovies} from "../model/fetchSource.js"
import MovieCard from "../view/movieCard.js";
import MoviePoster from "../view/moviePoster.js";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function HomepagePresenter(){
    const [popularMovies, setPopularMovies] = React.useState([]);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1700 },
            items: 6
          },
        LargerDesktop: {
            breakpoint: { max: 1700, min: 1100},
            items: 5
          },
        desktop: {
          breakpoint: { max: 1100, min: 850},
          items: 3
        },
        largerTablet: {
          breakpoint: { max: 850, min: 600 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 600, min: 350 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 350, min: 0 },
          items: 1
        }
      };

    function mountACB(){
        discoverMovies().then((movies) => setPopularMovies(movies));
    }

    React.useEffect(mountACB, []);

    return (
        <div>
          <MoviePoster></MoviePoster>
          <Carousel 
        responsive={responsive} 
        showDots={true}
        keyBoardControl={true}
        >
          {popularMovies &&
            popularMovies.map((movie) => (
              <MovieCard
                key = {movie.id}
                movie = {movie}
              />
            ))}
        </Carousel>
        </div>

      );
}