'use client';

import { motion } from 'framer-motion';
import { Film, Sparkles } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  variant?: 'default' | 'movie' | 'dots';
}

export default function LoadingSpinner({ 
  size = 'md', 
  text, 
  variant = 'default' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  if (variant === 'movie') {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center space-y-6"
      >
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
          }}
          className="relative"
        >
          <Film className={`${sizeClasses[size]} text-blue-500`} />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <Sparkles className={`${sizeClasses[size]} text-yellow-400`} />
          </motion.div>
        </motion.div>
        
        {text && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
              {text}
            </p>
            <motion.div
              animate={{ width: ["0%", "100%", "0%"] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"
            />
          </motion.div>
        )}
      </motion.div>
    );
  }

  if (variant === 'dots') {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center space-y-4"
      >
        <div className="flex space-x-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
              className="w-3 h-3 bg-blue-500 rounded-full"
            />
          ))}
        </div>
        {text && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 dark:text-gray-400 text-sm"
          >
            {text}
          </motion.p>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center space-y-4"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className={`${sizeClasses[size]} border-2 border-blue-500 border-t-transparent rounded-full`}
      />
      {text && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-400 text-sm"
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  );
}
