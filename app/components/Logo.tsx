'use client';

import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.05, rotate: 5 }}
      transition={{ duration: 0.3 }}
      className={`${sizeClasses[size]} rounded-2xl shadow-lg overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center ${className}`}
    >
      <svg
        width="60%"
        height="60%"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white"
      >
        <path
          d="M4 6H20V8H4V6ZM4 10H20V12H4V10ZM4 14H20V16H4V14ZM4 18H20V20H4V18Z"
          fill="currentColor"
        />
        <circle cx="18" cy="6" r="2" fill="currentColor" />
        <circle cx="18" cy="10" r="2" fill="currentColor" />
        <circle cx="18" cy="14" r="2" fill="currentColor" />
        <circle cx="18" cy="18" r="2" fill="currentColor" />
      </svg>
      
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
      />
    </motion.div>
  );
}
