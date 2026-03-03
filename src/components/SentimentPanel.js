'use client';

function ScoreBar({ score }) {
  const color =
    score >= 70 ? '#4ade80' :
    score >= 45 ? '#facc15' :
    '#f87171';

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs text-gray-500">
        <span>Audience Score</span>
        <span className="font-bold" style={{ color }}>{score}/100</span>
      </div>
      <div className="h-2 rounded-full bg-[#1e1e2e] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${score}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export default function SentimentPanel({ data, loading }) {
  // Loading skeleton
  if (loading) {
    return (
      <div className="rounded-2xl bg-[#111118] border border-[#1e1e2e] p-6 h-full space-y-4">
        <div className="skeleton h-5 w-32" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-4/5" />
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-2 w-full mt-4" />
        <div className="space-y-2 mt-4">
          <div className="skeleton h-12 w-full" />
          <div className="skeleton h-12 w-full" />
        </div>
      </div>
    );
  }

  if (!data) return null;

  const badgeClass =
    data.classification === 'positive' ? 'badge-positive' :
    data.classification === 'negative' ? 'badge-negative' :
    'badge-mixed';

  const classEmoji =
    data.classification === 'positive' ? '😍' :
    data.classification === 'negative' ? '😤' : '😐';

  return (
    <div className="rounded-2xl bg-[#111118] border border-[#1e1e2e] p-6 space-y-5 card-glow h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="text-yellow-600">🧠</span> AI Sentiment
        </h3>
        <span className={`text-xs px-3 py-1 rounded-full font-semibold capitalize ${badgeClass}`}>
          {classEmoji} {data.classification}
        </span>
      </div>

      {/* Score bar */}
      <ScoreBar score={data.score} />

      {/* Summary */}
      <p className="text-gray-400 text-sm leading-relaxed">{data.summary}</p>

      {/* Highlights */}
      {data.highlights?.length > 0 && (
        <ul className="space-y-1.5">
          {data.highlights.map((h, i) => (
            <li key={i} className="text-sm text-gray-400 flex gap-2">
              <span className="text-yellow-600 mt-0.5 flex-shrink-0">◆</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Audience Quotes */}
      {data.quotes?.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-[#1e1e2e]">
          <p className="text-xs text-gray-600 uppercase tracking-wider">Audience Voices</p>
          {data.quotes.map((q, i) => (
            <div key={i} className="px-3 py-2.5 rounded-lg bg-[#1a1a2e] border border-[#2a2a3e]">
              <p className="text-gray-300 text-xs leading-relaxed italic">"{q}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}