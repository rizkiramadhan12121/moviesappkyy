'use client';

import { motion } from 'framer-motion';
import { Search, Loader2 } from 'lucide-react';

interface SearchLoadingStateProps {
  query: string;
  isLoading: boolean;
}

export default function SearchLoadingState({ query, isLoading }: SearchLoadingStateProps) {
  if (!isLoading) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4"
      >
        <Search className="w-6 h-6 text-white" />
      </motion.div>
      
      <motion.h3 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-lg font-semibold text-gray-900 dark:text-white mb-2"
      >
        Mencari film...
      </motion.h3>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 dark:text-gray-400 text-center mb-4"
      >
        Mencari "{query}" di database film
      </motion.p>
      
      <motion.div
        animate={{ width: ["0%", "100%", "0%"] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-64 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
      />
    </motion.div>
  );
}
