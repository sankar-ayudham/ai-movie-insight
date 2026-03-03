# 🎬 CineInsight — AI Movie Insight Builder

A Next.js application that takes an IMDb movie ID and returns AI-powered movie insights, cast details, and audience sentiment analysis.

## 🚀 Live Demo
> Deploy to Vercel (see Deployment section)

## ⚙️ Setup Instructions

### Prerequisites
- Node.js 18+
- OMDB API key (free): https://www.omdbapi.com/apikey.aspx
- OpenAI API key: https://platform.openai.com/api-keys

### Install & Run
```bash
git clone https://github.com/YOUR_USERNAME/ai-movie-insight
cd ai-movie-insight
npm install
cp .env.example .env.local
# Fill in your API keys in .env.local
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
| **Next.js 14 (App Router)** | Full-stack JS with built-in API routes — no separate backend needed. Server components reduce client JS. |
| **Tailwind CSS** | Utility-first, rapid styling without context switching. Tree-shaken in production. |
| **OMDB API** | Reliable, free-tier movie data (poster, cast, plot, rating). |
| **OpenAI GPT-3.5** | Cost-effective AI for sentiment analysis and insight generation. |
| **Axios** | Better error handling and timeout support vs native fetch for server-side calls. |
| **Cheerio** | Listed as a dep but OMDB covers data needs; available for review scraping extension. |

## 📁 Project Structure
```
src/
  app/
    page.js              ← Main UI
    layout.js            ← Root layout + metadata
    globals.css          ← Theme, animations
    api/
      movie/route.js     ← Movie data API
      sentiment/route.js ← AI sentiment API
  components/
    SearchForm.js        ← Input with validation
    MovieCard.js         ← Movie details display
    CastList.js          ← Cast members
    SentimentPanel.js    ← AI sentiment results
    LoadingSpinner.js    ← Loading state
  lib/
    utils.js             ← Shared utilities
  __tests__/
    utils.test.js        ← Unit tests
```

## Assumptions
- OMDB API used for movie data (reliable, free, no scraping needed)
- OpenAI sentiment is AI-generated based on training knowledge (not live review scraping, which violates most sites' ToS)
- IMDb IDs are in format tt + 7-8 digits

## 🌐 Deployment to Vercel
```bash
npm install -g vercel
vercel
# Follow prompts, add env vars in Vercel dashboard
```