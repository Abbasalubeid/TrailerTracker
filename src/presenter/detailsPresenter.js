import React from 'react';
import { useParams } from "react-router-dom";
import MovieDetails from '../view/movieDetails.js';
import TrailerCard from '../view/trailerCard.js';
import {getVideo, getMovieDetails, getRecommendations, getCredits} from "../model/fetchSource.js"
import MovieCarousel from '../view/movieCarousel.js';
import Loading from "../view/loading.js";
import {numberOfCards} from "../model/constants.js"


export default function DetailsPresenter(props){
    const { id } = useParams();
    const [currentMovie, setCurrentMovie] = React.useState(props.model.currentMovie);
    const [currentMovieTrailers, setCurrentMovieTrailers] = React.useState([]);
    const [failedTrailers, setFailedTrailers] = React.useState([]);
    const [recommendations, setRecommendations] = React.useState([]);
    const [credits, setCredits] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [loadKey, setLoadKey] = React.useState(Date.now());

    async function fetchData(fetchFunction, setData) {
      let success = false;
  
      try {
        const result = await fetchFunction();
        setData(result);
        success = true;
      } catch (error) {
        setData({ data: [], error: error.message });

      }
      return success;
    }
  
    function mountACB() {
      document.documentElement.scrollTop = 0;
      let fetchesSucceeded = 0;

      let fetchOperations = [
        fetchData(() => getVideo(id), setCurrentMovieTrailers),
        fetchData(() => getRecommendations(id), setRecommendations),
        fetchData(() => getCredits(id), setCredits)
      ];
    
      // If currentMovie.id does not match id, fetch movie details
      if (currentMovie.id != id) {
        fetchOperations.unshift(fetchData(() => getMovieDetails(id), setCurrentMovie));
      }
    
      Promise.allSettled(fetchOperations).then(results => {
        results.forEach((result) => {
          if (result.status === 'fulfilled' && result.value === true) {
            fetchesSucceeded += 1;
          }
        });
  
        if (fetchesSucceeded === 0) {
          setError(new Error("We're sorry, but we are unable to fetch the data at this moment. Please ensure you're connected to the internet and try again"));
        }
        setIsLoading(false);
      });
    }
    
    function renderTrailers() {
      if (!currentMovieTrailers || currentMovieTrailers.length === 0) {
        return null;
      }

     const sortedTrailers = props.model.chooseTrailers(currentMovieTrailers)
    
      return sortedTrailers.map(trailer => {
        if (failedTrailers.includes(trailer.id)) {
          return null;
        }
        return (
          <TrailerCard key={trailer.id} trailer={trailer} 
          onVideoError={handleVideoErrorACB} />
        )
      });
    }

    function handleVideoErrorACB(trailerId) {
      setFailedTrailers([...failedTrailers, trailerId]);
    }

    function setCurrentMovieACB(movie) {
      props.model.setCurrentMovie(movie);
      setCurrentMovie(movie);
      setLoadKey(Date.now());
    }

    React.useEffect(mountACB, [id]);

    return (
      <Loading loading={isLoading} key={loadKey} error={error}>
        <>
          {!currentMovie.error && <MovieDetails movie={currentMovie} cast={credits.cast} />}
          {!currentMovieTrailers.error && currentMovieTrailers.length > 0 && renderTrailers()}
          {!recommendations.error && recommendations.length > 0 && (
            <MovieCarousel
              title={"Recommendations"}
              numberOfItems={numberOfCards}
              movies={props.model.validMovies(recommendations)}
              onMovieChoice={setCurrentMovieACB}
            />
          )}
        </>
      </Loading>
    );
}