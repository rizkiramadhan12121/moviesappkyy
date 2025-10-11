'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, RefreshCw, AlertCircle } from 'lucide-react';
import Logo from './components/Logo';
import SearchBar from './components/SearchBar';
import FilterTabs from './components/FilterTabs';
import MovieGrid from './components/MovieGrid';
import LoadingSpinner from './components/LoadingSpinner';
import AutoUpdateIndicator from './components/AutoUpdateIndicator';
import HeroSection from './components/HeroSection';
import SetupInstructions from './components/SetupInstructions';
import ModernHeader from './components/ModernHeader';
import FloatingParticles from './components/FloatingParticles';
import ErrorBoundary from './components/ErrorBoundary';
import SearchLoadingState from './components/SearchLoadingState';

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

interface MovieResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
  last_updated: string;
  error?: string;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [activeFilter, setActiveFilter] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isAutoUpdating, setIsAutoUpdating] = useState(false);
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [showSetupInstructions, setShowSetupInstructions] = useState(false);

  // Fetch movies based on filter
  const fetchMovies = async (filter: string, query?: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const url = query 
        ? `/api/movies/search?q=${encodeURIComponent(query)}`
        : `/api/movies?type=${filter}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Gagal mengambil data film');
      }
      
      const data: MovieResponse = await response.json();
      
      // Check if it's an API key error
      if (data.error && data.error.includes('API key TMDB belum diset')) {
        setShowSetupInstructions(true);
        setError(data.error);
        return;
      }
      
      setMovies(data.results);
      setLastUpdated(data.last_updated);
      setShowSetupInstructions(false);
      
      // Set featured movie (first movie from trending)
      if (filter === 'trending' && data.results.length > 0 && !query) {
        setFeaturedMovie(data.results[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search with debounce
  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setIsSearching(true);
      setIsLoading(true);
      try {
        await fetchMovies(activeFilter, query);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsSearching(false);
      setIsLoading(true);
      try {
        await fetchMovies(activeFilter);
      } finally {
        setIsLoading(false);
      }
    }
  }, [activeFilter]);

  // Handle filter change
  const handleFilterChange = async (filter: string) => {
    setActiveFilter(filter);
    setSearchQuery('');
    setIsSearching(false);
    setIsLoading(true);
    await fetchMovies(filter);
  };

  // Auto-refresh every hour
  useEffect(() => {
    fetchMovies(activeFilter);
    
    const interval = setInterval(async () => {
      setIsAutoUpdating(true);
      try {
        await fetchMovies(activeFilter);
      } finally {
        setIsAutoUpdating(false);
      }
    }, 3600000); // 1 hour

    return () => clearInterval(interval);
  }, [activeFilter]);

  const getFilterTitle = () => {
    if (isSearching) return `Hasil pencarian untuk "${searchQuery}"`;
    
    const titles = {
      trending: 'Film Trending Hari Ini',
      popular: 'Film Populer',
      now_playing: 'Film Sedang Tayang',
      upcoming: 'Film Segera Hadir'
    };
    
    return titles[activeFilter as keyof typeof titles] || 'Film Terbaru';
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 relative overflow-hidden">
        {/* Floating Particles */}
        <FloatingParticles />
        
        {/* Modern Header */}
        <ModernHeader 
          onSearch={handleSearch}
          isLoading={isLoading && isSearching}
          lastUpdated={lastUpdated}
        />

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 pt-24">
        {/* Hero Section */}
        {!isSearching && activeFilter === 'trending' && featuredMovie && (
          <HeroSection featuredMovie={featuredMovie} />
        )}
        
        <FilterTabs 
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />

          <AnimatePresence mode="wait">
            {showSetupInstructions ? (
              <SetupInstructions />
            ) : error ? (
              <motion.div 
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Oops! Terjadi Kesalahan
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-6 max-w-md">
                  {error}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => fetchMovies(activeFilter)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
                >
                  Coba Lagi
                </motion.button>
              </motion.div>
            ) : isSearching && isLoading ? (
              <SearchLoadingState 
                query={searchQuery}
                isLoading={isLoading}
              />
            ) : (
              <MovieGrid 
                key={activeFilter + searchQuery}
                movies={movies}
                title={getFilterTitle()}
                isLoading={isLoading && !isSearching}
              />
            )}
          </AnimatePresence>
      </main>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50 py-12 mt-16"
        >
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <Logo size="md" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MoviesKyy
              </span>
            </motion.div>
            <p className="text-gray-600 dark:text-gray-400">
              © 2025 MoviesKyy - Platform streaming film terbaik dengan update harian otomatis
            </p>
          </div>
        </motion.footer>

        {/* Auto Update Indicator */}
        <AutoUpdateIndicator 
          lastUpdated={lastUpdated}
          isUpdating={isAutoUpdating}
          hasError={!!error}
        />
      </div>
    </ErrorBoundary>
  );
}
