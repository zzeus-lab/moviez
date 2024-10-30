import express, { Application } from "express";
import movieRoutes from "./routes/movieRoutes";
import dotenv from "dotenv";
import "./config/database"; // Initialize database connection
import "./cron/syncMoviesJob"; // Start the cron job for syncing movies

dotenv.config();

const app: Application = express();

// Middleware for parsing JSON
app.use(express.json());

// Routes
app.use("/api/movies", movieRoutes);

export default app;
