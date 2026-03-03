/**
 * Validate IMDb ID format
 * @param {string} id
 * @returns {boolean}
 */
export function isValidImdbId(id) {
  return /^tt\d{7,8}$/.test(id?.trim());
}

/**
 * Truncate text to n words
 * @param {string} text
 * @param {number} maxWords
 * @returns {string}
 */
export function truncateWords(text, maxWords = 50) {
  if (!text) return '';
  const words = text.split(' ');
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + '…';
}

/**
 * Format a number with commas (e.g. 1000000 -> 1,000,000)
 * @param {string|number} num
 * @returns {string}
 */
export function formatNumber(num) {
  const n = parseInt(String(num).replace(/,/g, ''), 10);
  if (isNaN(n)) return num;
  return n.toLocaleString();
}