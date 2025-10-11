'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, Calendar, Eye } from 'lucide-react';

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

interface MovieCardProps {
  movie: Movie;
  index: number;
}

export default function MovieCard({ movie, index }: MovieCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        y: -15,
        scale: 1.03,
        transition: { 
          duration: 0.3,
          ease: "easeOut"
        }
      }}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden cursor-pointer glass-effect border border-white/10"
    >
      {/* Poster Image */}
      <div className="relative h-80 overflow-hidden">
        {movie.poster_path ? (
          <Image
            src={movie.poster_path}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 4}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <Eye className="w-12 h-12 text-gray-400" />
          </div>
        )}
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Rating Badge */}
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
          className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg"
        >
          <motion.div
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Star className="w-3 h-3 fill-current" />
          </motion.div>
          {movie.vote_average.toFixed(1)}
        </motion.div>
        
        {/* Adult Content Badge */}
        {movie.adult && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.4, duration: 0.3 }}
            className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg"
          >
            18+
          </motion.div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {movie.title}
        </h3>
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
          <Calendar className="w-4 h-4 mr-1" />
          {movie.release_date_formatted}
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed">
          {movie.overview || 'Deskripsi tidak tersedia'}
        </p>
      </div>
      
      {/* Hover Effect Border */}
      <motion.div 
        className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 rounded-2xl transition-colors duration-300"
        whileHover={{ 
          boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)" 
        }}
      />
      
      {/* Shine Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
}
