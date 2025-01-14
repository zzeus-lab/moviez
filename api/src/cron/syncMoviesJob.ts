import cron from 'node-cron';
import fetchMovies from '../services/tmdbService';

// Schedule a job to sync movies from the TMDB API every 60 seconds
cron.schedule('*/60 * * * * *', async () => {
  console.log('Starting daily movie synchronization job');
  try {
    await fetchMovies();
    console.log('Movie synchronization job completed successfully');
  } catch (error) {
    console.error('Error during movie synchronization job:', error);
  }
});

console.log('Cron job for daily movie sync has been scheduled');
