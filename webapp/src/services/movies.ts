import apiClient from "./http";

const moviesService = {
  async fetchMovies(page: number) {
    try {
      const response = await apiClient.get(`/movies?page=${page}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      throw error;
    }
  },

  async syncMovies() {
    try {
      await apiClient.post(`/movies/sync`);
      return true;
    } catch (error) {
      console.error("Failed to sync movies:", error);
      throw error;
    }
  },
};

export default moviesService;
