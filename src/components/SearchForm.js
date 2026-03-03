'use client';

import { useState } from 'react';

const EXAMPLES = ['tt0133093', 'tt0111161', 'tt0468569', 'tt1375666'];

export default function SearchForm({ onSearch, loading }) {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);

  const isValid = /^tt\d{7,8}$/.test(value.trim());
  const showError = touched && value.length > 0 && !isValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (isValid) onSearch(value.trim());
  };

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleSubmit} noValidate>
        <div className="relative flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={value}
              onChange={(e) => { setValue(e.target.value); setTouched(false); }}
              onBlur={() => setTouched(true)}
              placeholder="Enter IMDb ID — e.g. tt0133093"
              disabled={loading}
              className={`w-full px-5 py-4 rounded-xl bg-[#111118] border text-white placeholder-gray-600
                focus:outline-none focus:ring-2 transition-all duration-200
                ${showError
                  ? 'border-red-700 focus:ring-red-800'
                  : 'border-[#1e1e2e] focus:ring-yellow-700 focus:border-yellow-700'
                }
                ${loading ? 'opacity-60 cursor-not-allowed' : ''}
              `}
            />
            {/* Valid checkmark */}
            {isValid && value && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400">✓</span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !isValid}
            className="px-6 py-4 rounded-xl font-semibold transition-all duration-200
              bg-yellow-600 hover:bg-yellow-500 text-black
              disabled:opacity-40 disabled:cursor-not-allowed
              active:scale-95"
          >
            {loading ? '...' : 'Analyze'}
          </button>
        </div>

        {/* Error message */}
        {showError && (
          <p className="mt-2 text-sm text-red-400 pl-1">
            Format must be: tt followed by 7-8 digits (e.g. tt0133093)
          </p>
        )}
      </form>

      {/* Quick examples */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <span className="text-xs text-gray-600 mr-1 self-center">Try:</span>
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            onClick={() => { setValue(ex); setTouched(false); }}
            disabled={loading}
            className="text-xs px-3 py-1 rounded-full border border-[#2a2a3e] text-gray-400
              hover:border-yellow-700 hover:text-yellow-500 transition-colors duration-150"
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  );
}