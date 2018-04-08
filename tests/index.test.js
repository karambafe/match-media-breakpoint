import { getMediaQueries, getCurrentBreakpoint } from '../src/main';

const breakpoints = [
  { breakpoint: 'mobile', width: 300 },
  { breakpoint: 'tablet', width: 600 },
  { breakpoint: 'laptop', width: 900 },
  { breakpoint: 'desktop', width: 1200 },
];

describe('getCurrentBreakpoint', () => {
  it('should return undefined if there was not a single match', () => {
    global.window.matchMedia = jest.fn(() => ({ matches: false, addListener: jest.fn() }));
    expect(getCurrentBreakpoint(breakpoints)).toBeUndefined();
  });

  it('should return correct brakpoint', () => {
    global.window.matchMedia = jest.fn(() => ({ matches: true, addListener: jest.fn() }));
    expect(getCurrentBreakpoint(breakpoints)).toBe('desktop');
  });
});

describe('getMediaQueries', () => {
  it('should return correct array with media queries', () => {
    expect(getMediaQueries(breakpoints)).toEqual([
      { breakpoint: 'mobile', query: '(max-width: 599px)' }, 
      { breakpoint: 'tablet', query: '(max-width: 899px) and (min-width: 600px)' }, 
      { breakpoint: 'laptop', query: '(max-width: 1199px) and (min-width: 900px)' }, 
      { breakpoint: 'desktop', query: '(min-width: 1200px)' }
    ]);
  });
});
