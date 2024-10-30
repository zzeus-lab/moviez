// src/__tests__/tmdbService.test.ts
import axios from "axios";
import fetchMovies from "../services/tmdbService";
import Movie from "../models/Movie";

// Mock the Movie model
jest.mock("../models/Movie");
jest.mock("axios");

describe("tmdbService", () => {
  const mockedMovies = [
    {
      id: 1,
      title: "Movie One",
      release_date: "2022-01-01",
      overview: "Overview of Movie One",
      popularity: 100,
    },
    {
      id: 2,
      title: "Movie Two",
      release_date: "2022-02-01",
      overview: "Overview of Movie Two",
      popularity: 90,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks(); // Clear previous mock data before each test
  });

  it("should fetch movies from TMDB API and upsert them to the database", async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: { results: mockedMovies },
    });

    await fetchMovies();

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("/movie/popular"),
      expect.objectContaining({
        params: {
          api_key: process.env.TMDB_API_KEY,
          language: "en-US",
          page: 1,
        },
      })
    );

    // Verify that Movie.upsert was called with the correct data
    expect(Movie.upsert).toHaveBeenCalledTimes(mockedMovies.length);
    mockedMovies.forEach((movie) => {
      expect(Movie.upsert).toHaveBeenCalledWith({
        id: movie.id,
        title: movie.title,
        release_date: movie.release_date,
        overview: movie.overview,
        popularity: movie.popularity,
      });
    });
  });

  it("should handle errors when fetching movies from TMDB API", async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error("API error"));

    await fetchMovies();

    expect(axios.get).toHaveBeenCalled();
    expect(Movie.upsert).not.toHaveBeenCalled(); // Should not call upsert if fetching fails
  });
});
