import express, { Application } from "express";
import movieRoutes from "./routes/movieRoutes";
import dotenv from "dotenv";
import "./config/database";
import "./cron/syncMoviesJob";
import cors from "cors";

dotenv.config();

const app: Application = express();

// Middleware for parsing JSON
app.use(express.json());

// Configure CORS options
const corsOptions = {
  origin: "http://localhost:3001", // Frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  credentials: true, // Allow cookies or auth headers in CORS requests if needed
};

// Apply CORS middleware to all routes
app.use(cors(corsOptions));

// Routes
app.use("/api/movies", movieRoutes);

export default app;
