import React from 'react';
import MovieDetails from '../view/movieDetails.js';
import TrailerCard from '../view/trailerCard.js';
import {getVideo} from "../model/fetchSource.js"

export default function DetailsPresenter(props){
    const [currentMovieTrailers, setCurrentMovieTrailers] = React.useState([]);
    const [videoError, setVideoError] = React.useState(false);

    function mountACB(){
      getVideo(props.movie.id).then((movie) => {
        setCurrentMovieTrailers(movie);
      });
    }
  
    function renderTrailers() {
      const officialTrailers = currentMovieTrailers.filter(trailer => (
        // Using the official property of each trailer is not always consistent
        trailer.name.toLowerCase().includes("official trailer") ||
        trailer.name.toLowerCase().includes("original trailer")
      ));
      let sortedTrailers = officialTrailers.slice(0, 2);

      if (sortedTrailers.length === 0) {
        sortedTrailers = currentMovieTrailers.slice(0, 2);
      }
    
      return sortedTrailers.map(trailer => (
        <TrailerCard key={trailer.id} trailer={trailer}
        videoError = {videoError}
        onVideoError = {errorOccuredACB} />
      ));
    }

    function errorOccuredACB(){
      setVideoError(true)
    }
        
    React.useEffect(mountACB, []);

    return (
      <>
        <MovieDetails movie={props.movie} />
        {currentMovieTrailers && renderTrailers()}
      </>
    );
}