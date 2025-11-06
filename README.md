# MoviesKyy - Platform Streaming Film Modern

MoviesKyy adalah aplikasi web modern untuk menampilkan koleksi film terbaru dan terpopuler dengan update harian otomatis. Dibangun dengan Next.js 15, TypeScript, dan Tailwind CSS dengan animasi yang smooth menggunakan Framer Motion.

## ✨ Fitur Utama

- 🎬 **Koleksi Film Lengkap** - Film trending, populer, sedang tayang, dan segera hadir
- 🔍 **Pencarian Cerdas** - Cari film favorit dengan pencarian real-time
- 🎨 **Desain Modern** - UI/UX yang responsif dan menarik dengan animasi smooth
- 🔄 **Auto-Update Harian** - Data film terupdate otomatis setiap jam
- 📱 **Responsive Design** - Optimal di semua perangkat (desktop, tablet, mobile)
- 🌙 **Dark Mode** - Tema gelap dan terang yang dapat disesuaikan
- ⚡ **Performance Optimized** - Loading cepat dengan optimasi gambar dan caching

## 🚀 Teknologi yang Digunakan

- **Next.js 15** - React framework dengan App Router
- **TypeScript** - Type safety dan developer experience yang lebih baik
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animasi dan transisi yang smooth
- **Lucide React** - Icon library yang modern
- **TMDB API** - Database film terlengkap dan terpercaya

## 🛠️ Instalasi dan Setup

auto update
preperance movies app 
api

### Prerequisites

- Node.js 18+ 
- npm, yarn, atau pnpm
- Akun TMDB (untuk API key)
- yailwind css

## 📁 Struktur Project

`xky

moviesapp/
├── app/
│   ├── api/
│   │   └── movies/
│   │       ├── route.ts          # API endpoint untuk film
│   │       └── search/
│   │           └── route.ts       # API endpoint untuk pencarian
│   ├── components/
│   │   ├── AutoUpdateIndicator.tsx
│   │   ├── FilterTabs.tsx
│   │   ├── HeroSection.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── MovieCard.tsx
│   │   ├── MovieGrid.tsx
│   │   └── SearchBar.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── package.json
└── README.md


kyyyyyyyyy
```

## 🎯 Fitur Detail

### Auto-Update System
- Data film terupdate otomatis setiap jam
- Indikator visual untuk status update
- Error handling yang robust

### Pencarian Film
- Pencarian real-time dengan debouncing
- Hasil pencarian yang relevan
- Loading state yang smooth

### Filter Kategori
- **Trending** - Film yang sedang trending hari ini
- **Populer** - Film-film populer
- **Sedang Tayang** - Film yang sedang tayang di bioskop
- **Segera Hadir** - Film yang akan segera rilis

### Animasi dan Transisi
- Fade in/out animations
- Hover effects yang smooth
- Loading animation
- Stagger animations untuk grid items

## 🎨 Customization

### Mengubah Tema Warna
Edit file `app/globals.css` untuk mengubah warna utama:
```css
:root {
  --primary-color: #3b82f6; /* Blue */
  --secondary-color: #8b5cf6; /* Purple */
}
```

### Menambah Kategori Film
Edit file `app/components/FilterTabs.tsx` untuk menambah kategori baru.

## 🚀 Deployment

### Vercel (Recommended)
1. Push code ke GitHub
2. Connect repository ke Vercel
3. Set environment variables di Vercel dashboard
4. Deploy otomatis

### Manual Deployment
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) untuk API film
- [Next.js](https://nextjs.org/) untuk framework
- [Tailwind CSS](https://tailwindcss.com/) untuk styling
- [Framer Motion](https://www.framer.com/motion/) untuk animasi
- [Lucide](https://lucide.dev/) untuk icons

## 📞 Support

Jika ada pertanyaan atau masalah, silakan buat issue di repository ini.

---

**MoviesKyy** - Platform streaming film terbaik dengan update harian otomatis 🎬✨
