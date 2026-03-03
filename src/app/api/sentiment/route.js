import { NextResponse } from 'next/server';

// Sentiment analysis based on IMDb rating (no AI API needed)
function analyzeSentiment(title, rating, votes, plot) {
  const score = parseFloat(rating);
  
  let classification = 'mixed';
  let sentimentScore = 50;

  if (score >= 7.5) { classification = 'positive'; sentimentScore = Math.round((score / 10) * 100); }
  else if (score < 5.5) { classification = 'negative'; sentimentScore = Math.round((score / 10) * 100); }
  else { classification = 'mixed'; sentimentScore = Math.round((score / 10) * 100); }

  const highlights = {
    positive: [
      'Audiences praised the storytelling and direction',
      'Strong performances from the lead cast',
      'Highly recommended by critics and viewers alike',
    ],
    mixed: [
      'Divided audience reception with polarizing opinions',
      'Some praised the visuals while others found the plot lacking',
      'A film that works for some but not all audiences',
    ],
    negative: [
      'Audiences were disappointed with the overall execution',
      'Critics pointed to weak writing and pacing issues',
      'Below average reception from both critics and viewers',
    ],
  };

  const quotes = {
    positive: [
      `"One of the best films I've seen — absolutely gripping from start to finish."`,
      `"${title} exceeded every expectation. A must-watch."`,
      `"Brilliant direction and an unforgettable story."`,
    ],
    mixed: [
      `"Had its moments but didn't fully deliver on its promise."`,
      `"${title} is worth a watch but don't expect perfection."`,
      `"Some great scenes, but overall felt uneven."`,
    ],
    negative: [
      `"Unfortunately ${title} didn't live up to the hype."`,
      `"Disappointing given the talent involved."`,
      `"Hard to recommend — the story never found its footing."`,
    ],
  };

  const summaries = {
    positive: `${title} has been very well received by audiences, earning strong ratings and widespread acclaim. Viewers consistently highlight the quality of the storytelling, performances, and overall cinematic experience. With a ${score}/10 on IMDb, it stands as a highly regarded film.`,
    mixed: `Audience reception for ${title} has been mixed, with a ${score}/10 IMDb rating reflecting divided opinions. Some viewers appreciated certain aspects of the film while others felt it fell short of expectations. It remains a film that resonates differently depending on the viewer.`,
    negative: `${title} has received below-average audience reception, reflected in its ${score}/10 IMDb rating. Viewers and critics alike have pointed to various shortcomings in the film's execution, making it a tough recommendation for most audiences.`,
  };

  return {
    summary: summaries[classification],
    highlights: highlights[classification],
    classification,
    score: sentimentScore,
    quotes: quotes[classification],
  };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'This film';
  const rating = searchParams.get('rating') || '5';
  const votes = searchParams.get('votes') || '0';
  const plot = searchParams.get('plot') || '';

  const result = analyzeSentiment(title, rating, votes, plot);
  return NextResponse.json(result);
}