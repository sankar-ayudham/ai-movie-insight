# 🎬 CineInsight — AI Movie Insight Builder

A Next.js application that takes an IMDb movie ID and returns movie details, cast information, and audience sentiment analysis.

## 🚀 Live Demo
https://ai-movie-insight-blond.vercel.app/

## ⚙️ Setup Instructions

### Prerequisites
- Node.js 18+
- OMDB API key (free): http://www.omdbapi.com/apikey.aspx

### Install & Run
```bash
git clone https://github.com/YOUR_USERNAME/ai-movie-insight
cd ai-movie-insight
npm install
cp .env.example .env.local
# Add your OMDB API key to .env.local
npm run dev
```

Open http://localhost:3000

### Run Tests
```bash
npm test
```

## 🛠 Tech Stack Rationale

| Technology | Reason |
|---|---|
| **Next.js 14 (App Router)** | Full-stack JS with built-in API routes — no separate backend needed |
| **Tailwind CSS v3** | Utility-first, rapid styling, tree-shaken in production |
| **OMDB API** | Reliable free-tier movie data — poster, cast, plot, rating |
| **Axios** | Better error handling and timeout support for server-side API calls |

## 📁 Project Structure
```
src/
  app/
    page.js              ← Main UI
    layout.js            ← Root layout + metadata
    globals.css          ← Theme, animations
    api/
      movie/route.js     ← Fetches movie data from OMDB API
      sentiment/route.js ← Generates sentiment analysis from IMDb rating
  components/
    SearchForm.js        ← Input with IMDb ID validation
    MovieCard.js         ← Movie details display
    CastList.js          ← Cast members with avatars
    SentimentPanel.js    ← Sentiment score, highlights, quotes
    LoadingSpinner.js    ← Loading state
  lib/
    utils.js             ← Shared utility functions
  __tests__/
    utils.test.js        ← Unit tests
```

## 💡 How Sentiment Works

Sentiment analysis is generated based on the movie's IMDb rating score:
- **7.5+ / 10** → Positive sentiment
- **5.5 – 7.4 / 10** → Mixed sentiment  
- **Below 5.5 / 10** → Negative sentiment

This approach requires no external AI API, keeps the app fast and free to run, and produces consistent, meaningful results.

## Assumptions
- IMDb IDs follow the format: `tt` + 7-8 digits (e.g. `tt0133093`)
- OMDB API is used as the single data source for all movie metadata
- Sentiment is derived from IMDb rating data rather than live review scraping