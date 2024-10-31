import { Request, Response } from "express";
import Movie from "../models/Movie";
import fetchMovies from "../services/moviesService";

// List movies in a paginated format
export const listMovies = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = 10;

    // Get total count of movies
    const { rows: movies, count } = await Movie.findAndCountAll({
      order: [["release_date", "DESC"]],
      limit: pageSize,
      offset: (page - 1) * pageSize, // next sequence
    });

    // Calculate total pages
    const totalPages = Math.ceil(count / pageSize);

    res.json({
      movies,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Failed to fetch movies" });
  }
};

// Sync movies from the TMDB API
export const syncMovies = async (req: Request, res: Response) => {
  try {
    await fetchMovies();
    res.status(200).json({ message: "Movies synced successfully" });
  } catch (error) {
    console.error("Error syncing movies:", error);
    res.status(500).json({ message: "Failed to sync movies" });
  }
};
