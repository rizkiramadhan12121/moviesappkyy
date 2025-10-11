import { NextRequest, NextResponse } from 'next/server';

const TMDB_API_KEY = process.env.TMDB_API_KEY || 'your_tmdb_api_key_here';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export async function GET(request: NextRequest) {
  try {
    // Check if API key is set
    if (!TMDB_API_KEY || TMDB_API_KEY === 'your_tmdb_api_key_here') {
      console.error('TMDB API key not set');
      return NextResponse.json(
        { 
          error: 'API key TMDB belum diset. Silakan buat file .env.local dengan TMDB_API_KEY=your_actual_api_key',
          results: [],
          last_updated: new Date().toISOString()
        },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const page = searchParams.get('page') || '1';

    if (!query) {
      return NextResponse.json(
        { error: 'Query pencarian diperlukan' },
        { status: 400 }
      );
    }

    console.log(`Searching for: ${query}`);
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}&language=id-ID`
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`TMDB API error: ${response.status} - ${errorText}`);
      throw new Error(`TMDB API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    // Transform data untuk menambahkan URL gambar yang lengkap
    const transformedResults = data.results.map((movie: any) => ({
      ...movie,
      poster_path: movie.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
        : null,
      backdrop_path: movie.backdrop_path 
        ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` 
        : null,
      release_date_formatted: movie.release_date 
        ? new Date(movie.release_date).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        : 'Tanggal tidak tersedia'
    }));

    return NextResponse.json({
      ...data,
      results: transformedResults,
      last_updated: new Date().toISOString()
    }, {
      headers: {
        'Cache-Control': 'public, max-age=60, s-maxage=60',
        'CDN-Cache-Control': 'public, max-age=60',
        'Vercel-CDN-Cache-Control': 'public, max-age=60'
      }
    });

  } catch (error) {
    console.error('Error searching movies:', error);
    return NextResponse.json(
      { error: 'Gagal mencari film' },
      { status: 500 }
    );
  }
}
