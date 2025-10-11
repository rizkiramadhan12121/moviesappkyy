'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AutoUpdateIndicatorProps {
  lastUpdated: string | null;
  isUpdating: boolean;
  hasError: boolean;
}

export default function AutoUpdateIndicator({ 
  lastUpdated, 
  isUpdating, 
  hasError 
}: AutoUpdateIndicatorProps) {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (lastUpdated && !isUpdating && !hasError) {
      setShowNotification(true);
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [lastUpdated, isUpdating, hasError]);

  const formatLastUpdated = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Baru saja';
    if (diffInMinutes < 60) return `${diffInMinutes} menit yang lalu`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} jam yang lalu`;
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {showNotification && lastUpdated && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Data terupdate: {formatLastUpdated(lastUpdated)}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isUpdating && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            className="bg-blue-500 text-white rounded-lg shadow-lg p-3 flex items-center gap-2"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <RefreshCw className="w-4 h-4" />
            </motion.div>
            <span className="text-sm">Memperbarui data...</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hasError && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            className="bg-red-500 text-white rounded-lg shadow-lg p-3 flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">Gagal memperbarui data</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
