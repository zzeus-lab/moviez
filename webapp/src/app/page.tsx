"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Navbar from "./components/Navbar";
import moviesService from "@/services/movies";
import Pagination from "./components/Pagination";
import localizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";
import { FaCalendar } from "react-icons/fa";

dayjs.extend(localizedFormat);

type Movie = {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  popularity: number;
};

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const fetchMovies = async (page: number) => {
    setIsLoading(true);
    try {
      const data = await moviesService.fetchMovies(page);
      if (page === 1) setMovies(data.movies);
      setMovies(data.movies);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error(`Failed to fetch movies: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Sync movies without affecting the current view
  const handleSync = async () => {
    setIsSyncing(true);
    try {
      const response = await moviesService.syncMovies();

      if (response) {
        setMovies([]); // Reset the movies list
        setCurrentPage(1); // Reset to the first page
        await fetchMovies(1); // Fetch the first page again after syncing
        toast.success("Movies synced successfully!");
      } else {
        toast.error("Failed to sync movies");
      }
    } catch (error) {
      toast.error(`Error syncing movies: ${error}`);
    } finally {
      setIsSyncing(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchMovies(page); // Fetch movies for the selected page
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  return (
    <div className=" text-white min-h-screen">
      <Navbar onSync={handleSync} isSyncing={isSyncing} />
      <div className="container mx-auto p-6 pt-24">
        <div className="mb-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
              <div
                key={index}
                className="bg-dark-800 p-8 rounded-lg hover:shadow-lg transition h-[200px]"
              >
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-xl font-semibold text-white">
                    Loading...
                  </h2>
                  <div className="flex gap-2 items-center">
                    <small className="text-gray-400">Loading...</small>
                    <FaCalendar />
                  </div>
                </div>
                <p className="text-gray-300 mt-2">Loading...</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {movies?.map((movie) => (
              <div
                key={movie.id}
                className="bg-dark-800 p-8 rounded-lg hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-xl font-semibold text-white">
                    {movie.title}
                  </h2>
                  <div className="flex gap-2 items-center">
                    <small className="text-gray-400">
                      {dayjs(movie.release_date).format("DD/MM/YYYY")}
                    </small>
                    <FaCalendar />
                  </div>
                </div>
                <p className="text-gray-300 mt-2">{movie.overview}</p>
              </div>
            ))}
          </div>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
