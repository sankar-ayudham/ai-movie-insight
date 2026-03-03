'use client';

import { useState } from 'react';
import SearchForm from '@/components/SearchForm';
import MovieCard from '@/components/MovieCard';
import SentimentPanel from '@/components/SentimentPanel';
import CastList from '@/components/CastList';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Home() {
  const [movieData, setMovieData] = useState(null);
  const [sentimentData, setSentimentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sentimentLoading, setSentimentLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (imdbId) => {
    setLoading(true);
    setError('');
    setMovieData(null);
    setSentimentData(null);

    try {
      // Fetch movie details
      const movieRes = await fetch(`/api/movie?id=${imdbId}`);
      const movieJson = await movieRes.json();

      if (!movieRes.ok) throw new Error(movieJson.error || 'Failed to fetch movie');
      setMovieData(movieJson);
      setLoading(false);

      // Fetch sentiment separately (slower AI call)
      setSentimentLoading(true);
      const sentRes = await fetch(
      `/api/sentiment?title=${encodeURIComponent(movieJson.title)}&rating=${movieJson.rating}&votes=${movieJson.votes}&plot=${encodeURIComponent(movieJson.plot || '')}`
);
      const sentJson = await sentRes.json();
      if (sentRes.ok) setSentimentData(sentJson);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    } finally {
      setSentimentLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-4 py-12 max-w-6xl mx-auto">
      {/* Header */}
      <header className="text-center mb-16 animate-fade-up">
        <div className="inline-block mb-4">
          <span className="text-xs tracking-[0.4em] uppercase text-yellow-600 font-medium">
            AI-Powered Cinema Intelligence
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-4 shimmer-gold leading-tight">
          CineInsight
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
          Enter an IMDb movie ID to unlock deep AI analysis, audience sentiment, and cinematic intelligence.
        </p>
      </header>

      {/* Search */}
      <div className="mb-12 animate-fade-up" style={{ animationDelay: '0.1s' }}>
        <SearchForm onSearch={handleSearch} loading={loading} />
      </div>

      {/* Error */}
      {error && (
        <div className="max-w-lg mx-auto mb-8 p-4 rounded-xl border border-red-800 bg-red-950/40 text-red-300 text-center animate-fade-in">
          ⚠️ {error}
        </div>
      )}

      {/* Loading */}
      {loading && <LoadingSpinner />}

      {/* Results */}
      {movieData && !loading && (
        <div className="space-y-8 animate-fade-up">
          {/* Movie info + Sentiment side by side on large screens */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <MovieCard movie={movieData} />
            </div>
            <div>
              <SentimentPanel data={sentimentData} loading={sentimentLoading} />
            </div>
          </div>

          {/* Cast */}
          <CastList cast={movieData.cast} />
        </div>
      )}

      {/* Footer */}
      <footer className="text-center mt-20 text-gray-600 text-sm">
        <p>Powered by OMDB API & OpenAI · Built for Brew</p>
      </footer>
    </main>
  );
}