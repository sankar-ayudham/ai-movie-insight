'use client';

const AVATAR_COLORS = [
  'from-yellow-800 to-yellow-600',
  'from-purple-800 to-purple-600',
  'from-blue-800 to-blue-600',
  'from-green-800 to-green-600',
  'from-red-800 to-red-600',
];

export default function CastList({ cast }) {
  if (!cast || cast.length === 0) return null;

  return (
    <div className="rounded-2xl bg-[#111118] border border-[#1e1e2e] p-6 card-glow">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <span className="text-yellow-600">🎭</span> Cast
      </h3>
      <div className="flex flex-wrap gap-3">
        {cast.map((name, i) => (
          <div
            key={name}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#1a1a2e] border border-[#2a2a3e]
              hover:border-yellow-800/60 transition-colors duration-200"
          >
            {/* Avatar initial */}
            <div
              className={`w-7 h-7 rounded-full bg-gradient-to-br ${AVATAR_COLORS[i % AVATAR_COLORS.length]}
                flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}
            >
              {name[0]}
            </div>
            <span className="text-gray-300 text-sm font-medium">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}