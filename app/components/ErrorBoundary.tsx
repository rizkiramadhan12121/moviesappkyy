'use client';

import { Component, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-12 px-4"
        >
          <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Oops! Terjadi Kesalahan
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6 max-w-md">
            Aplikasi mengalami masalah. Silakan refresh halaman atau coba lagi nanti.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh Halaman
          </motion.button>
        </motion.div>
      );
    }

    return this.props.children;
  }
}
