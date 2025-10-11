'use client';

import { motion } from 'framer-motion';
import MovieCard from './MovieCard';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  release_date_formatted: string;
  adult: boolean;
}

interface MovieGridProps {
  movies: Movie[];
  title: string;
  isLoading?: boolean;
}

export default function MovieGrid({ movies, title, isLoading = false }: MovieGridProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-gray-900 dark:text-white"
        >
          {title}
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-2xl h-96 shimmer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse" />
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-bold text-gray-900 dark:text-white"
      >
        {title}
      </motion.h2>
      
      {movies.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-gray-500 dark:text-gray-400 text-lg">
            Tidak ada film yang ditemukan
          </div>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {movies.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} index={index} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
