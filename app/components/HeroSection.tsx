'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Star, TrendingUp, Calendar, Sparkles, Heart } from 'lucide-react';
import { useState } from 'react';

interface HeroSectionProps {
  featuredMovie?: {
    title: string;
    overview: string;
    backdrop_path: string | null;
    vote_average: number;
    release_date: string;
  };
}

export default function HeroSection({ featuredMovie }: HeroSectionProps) {
  const [isLiked, setIsLiked] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  if (!featuredMovie) {
    return (
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[70vh] gradient-bg rounded-3xl overflow-hidden mb-8"
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-purple-600/50" />
        
        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full backdrop-blur-sm"
        />
        
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -3, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-20 left-10 w-16 h-16 bg-pink-500/20 rounded-full backdrop-blur-sm"
        />

        <div className="relative z-10 flex items-center justify-center h-full px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center text-white max-w-4xl"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-6"
            >
              <Sparkles className="w-16 h-16 text-yellow-400" />
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Selamat Datang di MoviesKyy
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              Temukan film-film terbaru dan terpopuler dengan pengalaman streaming yang luar biasa
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white font-semibold hover:bg-white/30 transition-all duration-300"
            >
              Mulai Menjelajahi
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative h-96 rounded-2xl overflow-hidden mb-8"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        {featuredMovie.backdrop_path ? (
          <img
            src={featuredMovie.backdrop_path}
            alt={featuredMovie.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full p-8">
        <motion.div variants={itemVariants} className="max-w-2xl">
          <motion.h1 
            variants={itemVariants}
            className="text-4xl font-bold text-white mb-4"
          >
            {featuredMovie.title}
          </motion.h1>
          
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-4 mb-4"
          >
            <div className="flex items-center gap-1 bg-yellow-500 px-2 py-1 rounded">
              <Star className="w-4 h-4 fill-current text-white" />
              <span className="text-white font-semibold">
                {featuredMovie.vote_average.toFixed(1)}
              </span>
            </div>
            
            <div className="flex items-center gap-1 text-white/80">
              <Calendar className="w-4 h-4" />
              <span>{new Date(featuredMovie.release_date).getFullYear()}</span>
            </div>
          </motion.div>

          <motion.p 
            variants={itemVariants}
            className="text-white/90 text-lg mb-6 line-clamp-3"
          >
            {featuredMovie.overview}
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Play className="w-5 h-5" />
              Tonton Sekarang
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-colors backdrop-blur-sm"
            >
              <TrendingUp className="w-5 h-5" />
              Detail Film
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-8 right-8 w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm"
      />
      
      <motion.div
        animate={{ 
          y: [0, 10, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-8 right-16 w-12 h-12 bg-blue-500/20 rounded-full backdrop-blur-sm"
      />
    </motion.section>
  );
}
