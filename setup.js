#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🎬 MoviesKyy Setup Script');
console.log('========================\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');

if (fs.existsSync(envPath)) {
  console.log('✅ File .env.local sudah ada');
  
  // Check if TMDB_API_KEY is set
  const envContent = fs.readFileSync(envPath, 'utf8');
  if (envContent.includes('TMDB_API_KEY=') && !envContent.includes('your_tmdb_api_key_here')) {
    console.log('✅ TMDB_API_KEY sudah diset');
    console.log('\n🚀 Aplikasi siap digunakan! Jalankan: npm run dev');
  } else {
    console.log('❌ TMDB_API_KEY belum diset dengan benar');
    console.log('\n📝 Silakan edit file .env.local dan ganti "your_tmdb_api_key_here" dengan API key TMDB Anda');
    console.log('🔗 Dapatkan API key di: https://www.themoviedb.org/settings/api');
  }
} else {
  console.log('❌ File .env.local tidak ditemukan');
  console.log('\n📝 Membuat file .env.local...');
  
  const envContent = `# TMDB API Key - Dapatkan dari https://www.themoviedb.org/settings/api
TMDB_API_KEY=your_tmdb_api_key_here

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ File .env.local berhasil dibuat');
  console.log('\n📝 Silakan edit file .env.local dan ganti "your_tmdb_api_key_here" dengan API key TMDB Anda');
  console.log('🔗 Dapatkan API key di: https://www.themoviedb.org/settings/api');
}

console.log('\n📋 Langkah-langkah setup:');
console.log('1. Daftar di TMDB: https://www.themoviedb.org/signup');
console.log('2. Request API key: https://www.themoviedb.org/settings/api');
console.log('3. Edit file .env.local dan masukkan API key Anda');
console.log('4. Jalankan: npm run dev');
console.log('\n🎬 Selamat menikmati MoviesKyy!');
