import React from 'react';
import MovieDetails from '../view/movieDetails.js';
import  YouTube from 'react-youtube';
import {getVideo} from "../model/fetchSource.js"

export default function DetailsPresenter(props){
    const [currentMovieTrailers, setCurrentMovieTrailers] = React.useState([]);



    function mountACB(){
      getVideo(props.movie.id).then((movie) => {
        setCurrentMovieTrailers(movie);
      });
    }
  
    function renderTrailer() {
      const trailer = currentMovieTrailers.find(vid => vid.official == true);
      return trailer ? <YouTube videoId={trailer.key} /> : null;
    }
        
    React.useEffect(mountACB, []);

    return (
      <>
        <MovieDetails
        movie = {props.movie}/>
        <div>
            {currentMovieTrailers ? renderTrailer() : null}
        </div>
      </>
    );
}