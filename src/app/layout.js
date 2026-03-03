import './globals.css';

export const metadata = {
  title: 'CineInsight — AI Movie Intelligence',
  description: 'Enter an IMDb ID to get AI-powered movie insights, cast details, and audience sentiment analysis.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative z-10">{children}</body>
    </html>
  );
}