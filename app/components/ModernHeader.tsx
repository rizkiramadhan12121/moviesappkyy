'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Film, Search, Menu, X, Sparkles } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import SearchBar from './SearchBar';

interface ModernHeaderProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  lastUpdated?: string | null;
}

export default function ModernHeader({ onSearch, isLoading, lastUpdated }: ModernHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.3 }}
              className="relative w-12 h-12 rounded-2xl shadow-lg overflow-hidden"
            >
              <Image
                src="/logo.png"
                alt="MoviesKyy Logo"
                fill
                className="object-cover"
                priority
                onError={(e) => {
                  // Fallback jika gambar tidak ditemukan
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none" class="text-white">
                          <path d="M4 6H20V8H4V6ZM4 10H20V12H4V10ZM4 14H20V16H4V14ZM4 18H20V18H4V18Z" fill="currentColor"/>
                          <circle cx="18" cy="6" r="2" fill="currentColor"/>
                          <circle cx="18" cy="10" r="2" fill="currentColor"/>
                          <circle cx="18" cy="14" r="2" fill="currentColor"/>
                          <circle cx="18" cy="18" r="2" fill="currentColor"/>
                        </svg>
                      </div>
                    `;
                  }
                }}
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
              />
            </motion.div>
            
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MoviesKyy
              </h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xs text-gray-500 dark:text-gray-400"
              >
                Platform Streaming Terbaik
              </motion.p>
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="hidden md:block flex-1 max-w-2xl mx-8"
          >
            <SearchBar 
              onSearch={onSearch}
              isLoading={isLoading}
              placeholder="Cari film favorit Anda..."
            />
          </motion.div>

          {/* Status & Menu */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4"
          >
            {/* Update Status */}
            {lastUpdated && (
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="hidden lg:flex items-center gap-2 px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-full"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-green-500 rounded-full"
                />
                <span className="text-xs text-green-600 dark:text-green-400">
                  Live Update
                </span>
              </motion.div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Search */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4"
            >
              <SearchBar 
                onSearch={onSearch}
                isLoading={isLoading}
                placeholder="Cari film favorit Anda..."
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative Elements */}
      <motion.div
        animate={{ 
          x: [0, 100, 0],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{ 
          x: [0, -50, 0],
          opacity: [0.2, 0.6, 0.2]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-pink-500/20 to-yellow-500/20 rounded-full blur-2xl"
      />
    </motion.header>
  );
}
