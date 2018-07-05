import { getCurrentBreakpoint } from '../src/main';

const breakpoints = [
  { breakpoint: 'mobile', width: 300 },
  { breakpoint: 'tablet', width: 600 },
  { breakpoint: 'laptop', width: 900 },
  { breakpoint: 'desktop', width: 1200 },
];

describe('getCurrentBreakpoint', () => {
  it('should return correct brakpoint', () => {
    global.window.matchMedia = () => ({ matches: true, addListener: jest.fn() });
    expect(getCurrentBreakpoint(breakpoints)).toBe('desktop');
  });

  it('should return undefined if there was not a single match', () => {
    global.window.matchMedia = () => ({ matches: false, addListener: jest.fn() });
    expect(getCurrentBreakpoint(breakpoints)).toBeUndefined();
  });
});
