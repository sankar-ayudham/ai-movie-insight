import { NextResponse } from 'next/server';
import axios from 'axios';

const OMDB_KEY = process.env.OMDB_API_KEY;

// Validate IMDb ID format
function isValidImdbId(id) {
  return /^tt\d{7,8}$/.test(id);
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id')?.trim();

  // Input validation
  if (!id) {
    return NextResponse.json({ error: 'IMDb ID is required' }, { status: 400 });
  }
  if (!isValidImdbId(id)) {
    return NextResponse.json(
      { error: 'Invalid IMDb ID format. Use format: tt0133093' },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get('https://www.omdbapi.com/', {
      params: { i: id, apikey: OMDB_KEY, plot: 'full' },
      timeout: 8000,
    });

    const data = response.data;

    if (data.Response === 'False') {
      return NextResponse.json(
        { error: data.Error || 'Movie not found' },
        { status: 404 }
      );
    }

    // Parse and clean cast
    const cast = data.Actors
      ? data.Actors.split(',').map((name) => name.trim()).filter(Boolean)
      : [];

    // Build clean response object
    const movie = {
      imdbId: data.imdbID,
      title: data.Title,
      year: data.Year,
      rating: data.imdbRating,
      genre: data.Genre,
      director: data.Director,
      plot: data.Plot,
      poster: data.Poster !== 'N/A' ? data.Poster : null,
      runtime: data.Runtime,
      language: data.Language,
      awards: data.Awards,
      metascore: data.Metascore,
      votes: data.imdbVotes,
      cast,
    };

    return NextResponse.json(movie);
  } catch (err) {
    console.error('[movie/route]', err.message);
    return NextResponse.json(
      { error: 'Failed to fetch movie data. Try again later.' },
      { status: 500 }
    );
  }
}