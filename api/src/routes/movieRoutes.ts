import { Router } from "express";
import { listMovies, syncMovies } from "../controllers/movieController";

const router = Router();

// Route to get a paginated list of movies
router.get("/", listMovies);

// Route to manually sync movies from TMDB API
router.post("/sync", syncMovies);

export default router;
