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
    const page = searchParams.get('page') || '1';
    const type = searchParams.get('type') || 'popular';

    let endpoint = '';
    switch (type) {
      case 'popular':
        endpoint = `${TMDB_BASE_URL}/movie/popular`;
        break;
      case 'top_rated':
        endpoint = `${TMDB_BASE_URL}/movie/top_rated`;
        break;
      case 'now_playing':
        endpoint = `${TMDB_BASE_URL}/movie/now_playing`;
        break;
      case 'upcoming':
        endpoint = `${TMDB_BASE_URL}/movie/upcoming`;
        break;
      case 'trending':
        endpoint = `${TMDB_BASE_URL}/trending/movie/day`;
        break;
      default:
        endpoint = `${TMDB_BASE_URL}/movie/popular`;
    }

    console.log(`Fetching from: ${endpoint}`);
    const response = await fetch(`${endpoint}?api_key=${TMDB_API_KEY}&page=${page}&language=id-ID`);
    
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
        'Cache-Control': 'public, max-age=300, s-maxage=300',
        'CDN-Cache-Control': 'public, max-age=300',
        'Vercel-CDN-Cache-Control': 'public, max-age=300'
      }
    });

  } catch (error) {
    console.error('Error fetching movies:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data film' },
      { status: 500 }
    );
  }
}
