import React from 'react';
import MovieDetails from '../view/movieDetails.js';
import TrailerCard from '../view/trailerCard.js';
import {getVideo} from "../model/fetchSource.js"

export default function DetailsPresenter(props){
    const [currentMovieTrailers, setCurrentMovieTrailers] = React.useState([]);

    function mountACB(){
      getVideo(props.movie.id).then((movie) => {
        setCurrentMovieTrailers(movie);
      });
    }
  
    function renderTrailers() {
      return currentMovieTrailers.map(trailer => (
        <TrailerCard key={trailer.id} trailer={trailer} />
      ));
    }
        
    React.useEffect(mountACB, []);

    return (
      <>
        <MovieDetails movie={props.movie} />
        {currentMovieTrailers && renderTrailers()}
      </>
    );
}