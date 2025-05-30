import { useState } from "react";
import { NavBar } from "./NavBar";
import { Search } from "./Search";
import { NumResults } from "./NumResults";
import { Main } from "./Main";
import { Box } from "./Box";
import { MovieList } from "./MovieList";
import { WatchedMoviesList } from "./WatchedMoviesList";
import { WatchedSummary } from "./WatchedSummary";

import { tempMovieData } from "../tempMovieData";
import { tempWatchedData } from "../tempMovieData";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <NavBar>
        <Search />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          <MovieList movies={movies} />
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box>
      </Main>
    </>
  );
}


