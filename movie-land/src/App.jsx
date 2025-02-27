import { useState, useEffect, use } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

// const movie1 = {
//   //static data
//   Title: "Batman v Superman: Dawn of Justice (Ultimate Edition)",
//   Year: "2016",
//   imdbID: "tt18689424",
//   Type: "movie",
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BOTRlNWQwM2ItNjkyZC00MGI3LThkYjktZmE5N2FlMzcyNTIyXkEyXkFqcGdeQXVyMTEyNzgwMDUw._V1_SX300.jpg",
// };

// Function to handle search
const handleSearch = () => {
  if (search.trim() !== "") {
    searchMovies(search);
  }
};

// Function to handle Enter key press
const handleKeyDown = (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
};

const API_KEY = "39e170a9";
const API_URL = `http://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}`;
const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };
  useEffect(() => {
    searchMovies("batman");
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search for a movie"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <img
          src={SearchIcon}
          alt="Search"
          onClick={() => searchMovies(search)}
        />
      </div>

      {movies.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
