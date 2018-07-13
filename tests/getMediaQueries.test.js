import { getMediaQueries } from '../src/main';

describe('getMediaQueries', () => {
  it('should return correct array with media queries', () => {
    expect(getMediaQueries([
      { breakpoint: 'mobile', width: 300 },
      { breakpoint: 'tablet', width: 600 },
      { breakpoint: 'laptop', width: 900 },
      { breakpoint: 'desktop', width: 1200 },
    ])).toEqual([
      { breakpoint: 'mobile', query: '(max-width: 599px)' },
      { breakpoint: 'tablet', query: '(max-width: 899px) and (min-width: 600px)' },
      { breakpoint: 'laptop', query: '(max-width: 1199px) and (min-width: 900px)' },
      { breakpoint: 'desktop', query: '(min-width: 1200px)' },
    ]);
  });
});
