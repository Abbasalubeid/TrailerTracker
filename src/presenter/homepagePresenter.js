import React from "react";
import {topRatedMovies, trendingMovies, upcomingMovies} from "../model/fetchSource.js"
import MovieCarousel from "../view/movieCarousel.js"
import Loading from "../view/loading.js";
import {numberOfCards, numberOfPosters} from "../model/constants.js"

export default function HomepagePresenter(props){
  const [topRated, setTopRated] = React.useState({data: [], error: null});
  const [trendMovies, setTrendMovies] = React.useState({data: [], error: null});
  const [upcomMovies, setupcomMovies] = React.useState({data: [], error: null});  
  const [error, setError] = React.useState(null);

    async function fetchData(fetchFunction, setData) {
      return new Promise((resolve) => {
        fetchFunction()
          .then(result => {
            setData({ data: result, error: null });
            resolve(true);
          })
          .catch(error => {
            setData({ data: [], error: error.message });
            resolve(false); 
          });
      });
    }

    function mountACB(){
      let fetchesSucceeded = 0;
  
      const fetchOperations = [
        fetchData(topRatedMovies, setTopRated),
        fetchData(trendingMovies, setTrendMovies),
        fetchData(upcomingMovies, setupcomMovies),
      ];
      // Use Promise.allSettled to keep track of all fetches
      Promise.allSettled(fetchOperations).then((results) => {
        results.forEach((result) => {
          if (result.status === 'fulfilled' && result.value === true) {
            fetchesSucceeded += 1;
          }
        });

        if (fetchesSucceeded === 0) {
          setError(new Error("We're sorry, but we are unable to fetch the data at this moment. Please ensure you're connected to the internet and try again")); // Error only when all fetches fails
        } 
      });
    }

    React.useEffect(mountACB, []);
    
  
    function setCurrentMovieACB(movie){
      props.model.setCurrentMovie(movie);
    }


    return (
      <Loading loading={false} error={error}>
          <>
            {!trendMovies.error && 
              <MovieCarousel 
                movies={trendMovies.data} 
                numberOfItems={numberOfPosters} 
                poster={true}
                title={"Trending"}
                onMovieChoice={setCurrentMovieACB}
              />
            }
            {!topRated.error && 
              <MovieCarousel 
                movies={topRated.data} 
                numberOfItems={numberOfCards}
                title={"Top rated"}
                onMovieChoice={setCurrentMovieACB}

              />
            }
            {!upcomMovies.error && 
              <MovieCarousel 
                movies={upcomMovies.data} 
                numberOfItems={numberOfCards} 
                title={"Upcoming"}
                onMovieChoice={setCurrentMovieACB}
              />
            }
          </>
      </Loading>
    );
}