import axios from 'axios';
import Movie from '../models/Movie';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_API_URL = 'https://api.themoviedb.org/3';

// Fetch movies from the TMDB API and upsert them into the database
const fetchMovies = async () => {
  try {
    const response = await axios.get(`${TMDB_API_URL}/movie/popular`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US',
        page: 1, // Start with the first page; you can iterate through pages if needed
      },
    });

    const movies = response.data.results;
    console.log("🚀 ~ fetchMovies ~ movies:", movies)

    for (const movie of movies) {
      await Movie.upsert({
        id: movie.id, // Using the TMDB ID as primary key if it's unique
        title: movie.title,
        release_date: movie.release_date,
        overview: movie.overview,
        popularity: movie.popularity,
      });
    }

    console.log('Movies have been successfully fetched and stored');
  } catch (error) {
    console.error('Error fetching movies from TMDB:', error);
  }
};

export default fetchMovies;
