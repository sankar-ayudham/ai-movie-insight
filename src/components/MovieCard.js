'use client';

import Image from 'next/image';

function StarRating({ rating }) {
  const score = parseFloat(rating);
  if (isNaN(score)) return null;
  const filled = Math.round(score / 2);
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < filled ? 'text-yellow-500' : 'text-gray-700'}>★</span>
      ))}
    </div>
  );
}

function InfoPill({ label, value }) {
  if (!value || value === 'N/A') return null;
  return (
    <div className="px-3 py-1.5 rounded-lg bg-[#1a1a2e] border border-[#2a2a3e] text-sm">
      <span className="text-gray-500 text-xs block">{label}</span>
      <span className="text-gray-200 font-medium">{value}</span>
    </div>
  );
}

export default function MovieCard({ movie }) {
  return (
    <div className="rounded-2xl bg-[#111118] border border-[#1e1e2e] overflow-hidden card-glow">
      <div className="flex flex-col sm:flex-row gap-0">
        {/* Poster */}
        {movie.poster ? (
          <div className="sm:w-48 flex-shrink-0 relative">
            <div className="relative w-full h-64 sm:h-full min-h-[280px]">
              <Image
                src={movie.poster}
                alt={`${movie.title} poster`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 192px"
              />
              {/* Gradient overlay on poster */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111118] hidden sm:block" />
            </div>
          </div>
        ) : (
          <div className="sm:w-48 flex-shrink-0 bg-[#1a1a2e] flex items-center justify-center min-h-[280px]">
            <span className="text-4xl">🎬</span>
          </div>
        )}

        {/* Info */}
        <div className="flex-1 p-6 space-y-4">
          {/* Title */}
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
              {movie.title}
            </h2>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <span className="text-yellow-600 text-sm font-medium">{movie.year}</span>
              {movie.runtime && movie.runtime !== 'N/A' && (
                <span className="text-gray-500 text-sm">{movie.runtime}</span>
              )}
              {movie.language && movie.language !== 'N/A' && (
                <span className="text-gray-500 text-sm">{movie.language}</span>
              )}
            </div>
          </div>

          {/* Genre pills */}
          {movie.genre && movie.genre !== 'N/A' && (
            <div className="flex flex-wrap gap-2">
              {movie.genre.split(',').map((g) => (
                <span
                  key={g}
                  className="px-2.5 py-0.5 text-xs rounded-full bg-yellow-900/30 text-yellow-400 border border-yellow-800/40"
                >
                  {g.trim()}
                </span>
              ))}
            </div>
          )}

          {/* Rating */}
          <div className="flex items-center gap-3">
            <StarRating rating={movie.rating} />
            <span className="text-xl font-bold text-white">{movie.rating}</span>
            <span className="text-gray-500 text-sm">/10 IMDb</span>
            {movie.votes && movie.votes !== 'N/A' && (
              <span className="text-gray-600 text-xs">({movie.votes} votes)</span>
            )}
          </div>

          {/* Plot */}
          {movie.plot && movie.plot !== 'N/A' && (
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-4">{movie.plot}</p>
          )}

          {/* Meta info pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
            <InfoPill label="Director" value={movie.director} />
            <InfoPill label="Metascore" value={movie.metascore} />
            <InfoPill label="Awards" value={movie.awards?.split('.')[0]} />
          </div>
        </div>
      </div>
    </div>
  );
}