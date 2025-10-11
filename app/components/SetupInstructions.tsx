'use client';

import { motion } from 'framer-motion';
import { AlertCircle, ExternalLink, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function SetupInstructions() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-start gap-4 mb-6">
        <AlertCircle className="w-8 h-8 text-yellow-500 flex-shrink-0 mt-1" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Setup API Key TMDB
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Untuk menggunakan aplikasi MoviesKyy, Anda perlu mengatur API key dari The Movie Database (TMDB).
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Step 1 */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-4"
        >
          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
            1
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Daftar di TMDB
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Kunjungi website TMDB dan buat akun gratis
            </p>
            <a 
              href="https://www.themoviedb.org/signup" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Daftar di TMDB
            </a>
          </div>
        </motion.div>

        {/* Step 2 */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-4"
        >
          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
            2
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Request API Key
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Pergi ke halaman API settings dan request API key
            </p>
            <a 
              href="https://www.themoviedb.org/settings/api" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Buka API Settings
            </a>
          </div>
        </motion.div>

        {/* Step 3 */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-4"
        >
          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
            3
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Buat File .env.local
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Buat file .env.local di root project dengan konten berikut:
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 relative">
              <pre className="text-sm text-gray-800 dark:text-gray-200">
{`TMDB_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000`}
              </pre>
              <button
                onClick={() => copyToClipboard('TMDB_API_KEY=your_actual_api_key_here\nNEXT_PUBLIC_APP_URL=http://localhost:3000')}
                className="absolute top-2 right-2 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-500" />}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Step 4 */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4"
        >
          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
            4
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Restart Development Server
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Setelah membuat file .env.local, restart server development
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
              <pre className="text-sm text-gray-800 dark:text-gray-200">
{`# Stop server (Ctrl+C)
# Kemudian jalankan lagi:
npm run dev`}
              </pre>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
      >
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Catatan:</strong> API key TMDB gratis dan tidak memerlukan pembayaran. 
          Setelah setup selesai, aplikasi akan otomatis mengambil data film terbaru.
        </p>
      </motion.div>
    </motion.div>
  );
}
