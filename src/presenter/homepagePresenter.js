import React from "react";
import {topRatedMovies, trendingMovies, upcomingMovies} from "../model/fetchSource.js"
import MovieCarousel from "../view/movieCarousel.js"

export default function HomepagePresenter(){
    const [topRated, setTopRated] = React.useState([]);
    const [trendMovies, setTrendMovies] = React.useState([]);
    const [upcomMovies, setupcomMovies] = React.useState([]);

    const responsiveCards = {
      desktop1: { breakpoint: { max: 4000, min: 1700 }, items: 9 },
      desktop2: { breakpoint: { max: 1700, min: 1300 }, items: 7 },
      desktop3: { breakpoint: { max: 1300, min: 1080 }, items: 6 },
      tablet1: { breakpoint: { max: 1080, min: 805 }, items: 5 },
      tablet2: { breakpoint: { max: 805, min: 660 }, items: 4 },
      tablet3: { breakpoint: { max: 660, min: 510 }, items: 3 },
      mobile1: { breakpoint: { max: 380, min: 0 }, items: 2 },
      mobile2: { breakpoint: { max: 310, min: 0 }, items: 1 }
    };
  
    const responsivePosters = {
      desktop1: { breakpoint: { max: 4000, min: 1750 }, items: 4},
      desktop2: { breakpoint: { max: 1750, min: 1550 }, items: 3, partialVisibilityGutter: 70 },
      desktop3: { breakpoint: { max: 1550, min: 1470 }, items: 3, partialVisibilityGutter: 40},
      desktop4: { breakpoint: { max: 1470, min: 1350 }, items: 3},
      tablet1: { breakpoint: { max: 1350, min: 1200 }, items: 2, partialVisibilityGutter: 150},
      tablet2: { breakpoint: { max: 1200, min: 1030 }, items: 2, partialVisibilityGutter: 65},
      tablet3: { breakpoint: { max: 1030, min: 910 }, items: 2}, 
      tablet4: { breakpoint: { max: 910, min: 788 }, items: 1, partialVisibilityGutter: 320 },
      tablet5: { breakpoint: { max: 788, min: 680 }, items: 1, partialVisibilityGutter: 200 },
      mobile1: { breakpoint: { max: 680, min: 510 }, items: 1, partialVisibilityGutter: 120 },
      mobile2: { breakpoint: { max: 510, min: 460 }, items: 1, partialVisibilityGutter: 70 },
      mobile3: { breakpoint: { max: 460, min: 420 }, items: 1, partialVisibilityGutter: 30 },
      mobile4: { breakpoint: { max: 420, min: 0 }, items: 1},
    };

    function mountACB(){
        topRatedMovies().then((movies) => setTopRated(movies));
        trendingMovies().then((movies) => setTrendMovies(movies));
        upcomingMovies().then((movies) => setupcomMovies(movies));
    }

    React.useEffect(mountACB, []);

    return (
      <>
        <MovieCarousel movies={trendMovies} responsiveConfig={responsivePosters} 
        poster={true}
        title={"Trending"}/>
        <MovieCarousel movies={topRated} responsiveConfig={responsiveCards}
        title={"Top rated"} />
        <MovieCarousel movies={upcomMovies} responsiveConfig={responsiveCards} 
        title={"Upcoming"}/>
      </>
    );
}