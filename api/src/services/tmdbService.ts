import axios from "axios";
import Movie from "../models/Movie";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_API_URL = "https://api.themoviedb.org/3/discover/movie";

// Fetch movies from the TMDB API and upsert them into the database
const fetchMovies = async () => {
  try {
    const latestMovie = await Movie.findOne({
      order: [["createdAt", "DESC"]],
    });
    const currentPage = latestMovie?.syncPage ? latestMovie?.syncPage + 1 : 1;

    const response = await axios.get(`${TMDB_API_URL}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: "pt-BR",
        page: currentPage,
      },
    });

    const movies = response.data.results;

    for (const movie of movies) {
      await Movie.upsert({
        id: movie.id, // Using the TMDB ID as primary key if it's unique
        title: movie.title,
        release_date: movie.release_date,
        overview: movie.overview,
        syncPage: currentPage,
        popularity: movie.popularity,
      });
    }

    console.log("Movies have been successfully fetched and stored");
  } catch (error) {
    console.error("Error fetching movies from TMDB:", error);
  }
};

export default fetchMovies;
