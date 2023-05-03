const numberOfCards = {
    desktop1: { breakpoint: { max: 4000, min: 1700 }, items: 9 },
    desktop2: { breakpoint: { max: 1700, min: 1300 }, items: 7 },
    desktop3: { breakpoint: { max: 1300, min: 1080 }, items: 6 },
    tablet1: { breakpoint: { max: 1080, min: 805 }, items: 5 },
    tablet2: { breakpoint: { max: 805, min: 660 }, items: 4 },
    tablet3: { breakpoint: { max: 660, min: 510 }, items: 3 },
    mobile1: { breakpoint: { max: 510, min: 310 }, items: 2 },
    mobile2: { breakpoint: { max: 310, min: 0 }, items: 1 }
  };

  const numberOfPosters = {
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

  const genres = [
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

const sortingFilters = [
  { id: "topRatedDesc", name: "IMDB rating (High to Low)" },
  { id: "topRatedAsc", name: "IMDB rating (Low to High)" },
  { id: "popularityDesc", name: "Most Popular (High to Low)" },
  { id: "popularityAsc", name: "Most Popular (Low to High)" },
  { id: "newestFirst", name: "Newest to Oldest" },
  { id: "oldestFirst", name: "Oldest to Newest" },
  { id: "alphabeticalAsc", name: "Alphabetical Order (A-Z)" },
  { id: "alphabeticalDesc", name: "Alphabetical Order (Z-A)" },
  { id: "shuffle", name: "Random Shuffle" },
  { id: "trendingDesc", name: "Trending (High to Low)" },
  { id: "trendingAsc", name: "Trending (Low to High)" }
];


export {numberOfPosters, numberOfCards, genres, sortingFilters}