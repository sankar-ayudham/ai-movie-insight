import { isValidImdbId, truncateWords, formatNumber } from '../lib/utils';

describe('isValidImdbId', () => {
  test('accepts valid 7-digit IMDb ID', () => {
    expect(isValidImdbId('tt0133093')).toBe(true);
  });
  test('accepts valid 8-digit IMDb ID', () => {
    expect(isValidImdbId('tt10872600')).toBe(true);
  });
  test('rejects ID without tt prefix', () => {
    expect(isValidImdbId('0133093')).toBe(false);
  });
  test('rejects ID with wrong format', () => {
    expect(isValidImdbId('tt01330')).toBe(false); // only 5 digits
  });
  test('rejects empty string', () => {
    expect(isValidImdbId('')).toBe(false);
  });
  test('rejects null', () => {
    expect(isValidImdbId(null)).toBe(false);
  });
});

describe('truncateWords', () => {
  test('returns full text if under limit', () => {
    expect(truncateWords('hello world', 10)).toBe('hello world');
  });
  test('truncates and adds ellipsis', () => {
    const result = truncateWords('one two three four five', 3);
    expect(result).toBe('one two three…');
  });
  test('handles empty string', () => {
    expect(truncateWords('')).toBe('');
  });
});

describe('formatNumber', () => {
  test('formats with commas', () => {
    expect(formatNumber(1000000)).toBe('1,000,000');
  });
  test('handles string with existing commas', () => {
    expect(formatNumber('1,234,567')).toBe('1,234,567');
  });
});