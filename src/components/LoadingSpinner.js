export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-4 animate-fade-in">
      {/* Film reel spinner */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-[#2a2a3e]" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-yellow-500 animate-spin" />
        <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-yellow-700 animate-spin"
          style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-lg">🎬</div>
      </div>
      <div className="text-center space-y-1">
        <p className="text-gray-300 font-medium">Fetching movie data...</p>
        <p className="text-gray-600 text-sm">This may take a moment</p>
      </div>
    </div>
  );
}