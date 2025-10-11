'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Star, Play, Calendar } from 'lucide-react';

interface FilterTabsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { id: 'trending', label: 'Trending', icon: TrendingUp },
  { id: 'popular', label: 'Populer', icon: Star },
  { id: 'now_playing', label: 'Sedang Tayang', icon: Play },
  { id: 'upcoming', label: 'Segera Hadir', icon: Calendar },
];

export default function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-2 justify-center mb-8"
    >
      {filters.map((filter) => {
        const Icon = filter.icon;
        const isActive = activeFilter === filter.id;
        
        return (
          <motion.button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200
              ${isActive 
                ? 'bg-blue-500 text-white shadow-lg' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
              }
            `}
          >
            <Icon className="w-4 h-4" />
            {filter.label}
          </motion.button>
        );
      })}
    </motion.div>
  );
}
