import matchMediaMock from 'match-media-mock';

import { MatchMediaBreakpoint } from '../src/main';

window.matchMedia = matchMediaMock.create();
window.resizeTo = (x) => {
  window.matchMedia.setConfig({
    type: 'screen',
    width: x,
  });
};

const breakpoints = [
  { breakpoint: 'mobile', width: 300 },
  { breakpoint: 'tablet', width: 600 },
  { breakpoint: 'laptop', width: 900 },
  { breakpoint: 'desktop', width: 1200 },
];

describe('MatchMediaBreakpoint', () => {
  beforeEach(() => {
    window.resizeTo(700);
  });

  it('should return correct breakpoint if resize window and get value property', () => {
    const matchMediaBreakpoint = new MatchMediaBreakpoint({
      breakpoints,
      onBreakpointChange: () => {},
    });
    expect(matchMediaBreakpoint.value).toBe('tablet');
  });

  it('should return correct previousBreakpoint after first resize', () => {
    const matchMediaBreakpoint = new MatchMediaBreakpoint({
      breakpoints,
      onBreakpointChange: () => {},
    });
    expect(matchMediaBreakpoint.previousBreakpoint).toBe(undefined);
  });

  it('should call addListener if call method addListeners', () => {
    const spy = jest.fn();
    const mediaQueryList = window.matchMedia('(max-width: 599px)');
    const matchMediaBreakpoint = new MatchMediaBreakpoint({
      breakpoints,
      onBreakpointChange: () => {},
    });
    mediaQueryList.addListener = spy;
    matchMediaBreakpoint.addListeners();
    expect(spy).toBeCalled();
  });

  it('should call removeListener if call method removeListeners', () => {
    const spy = jest.fn();
    const mediaQueryList = window.matchMedia('(max-width: 599px)');
    const matchMediaBreakpoint = new MatchMediaBreakpoint({
      breakpoints,
      onBreakpointChange: () => {},
    });
    mediaQueryList.removeListener = spy;
    matchMediaBreakpoint.removeListeners();
    expect(spy).toBeCalled();
  });

  it('should return an array of breakpoints and queries if get breakpoints property', () => {
    const matchMediaBreakpoint = new MatchMediaBreakpoint({
      breakpoints,
      onBreakpointChange: () => {},
    });
    expect(matchMediaBreakpoint.breakpoints).toEqual([
      { breakpoint: 'mobile', query: '(max-width: 599px)' },
      { breakpoint: 'tablet', query: '(max-width: 899px) and (min-width: 600px)' },
      { breakpoint: 'laptop', query: '(max-width: 1199px) and (min-width: 900px)' },
      { breakpoint: 'desktop', query: '(min-width: 1200px)' },
    ]);
  });

  describe('handleMediaQueryList', () => {
    it('should return undefined if not match query', () => {
      const matchMediaBreakpoint = new MatchMediaBreakpoint({
        breakpoints,
        onBreakpointChange: () => {},
      });
      expect(matchMediaBreakpoint.handleMediaQueryList({ matches: false })).toBeUndefined();
    });

    it('should change value property if event matches is true', () => {
      const matchMediaBreakpoint = new MatchMediaBreakpoint({
        breakpoints,
        onBreakpointChange: () => {},
      });
      matchMediaBreakpoint.handleMediaQueryList({ matches: true, media: '(min-width: 1200px)' });
      expect(matchMediaBreakpoint.value).toBe('desktop');
    });

    it('should call callback onBreakpointChange if event matches is true', () => {
      const spy = jest.fn();
      const matchMediaBreakpoint = new MatchMediaBreakpoint({
        breakpoints,
        onBreakpointChange: spy,
      });
      matchMediaBreakpoint.handleMediaQueryList({ matches: true, media: '(min-width: 1200px)' });
      expect(spy).toBeCalledWith('desktop', 'tablet');
    });
  });

  describe('destroy', () => {
    it('should call method removeListeners', () => {
      const spy = jest.fn();
      const matchMediaBreakpoint = new MatchMediaBreakpoint({
        breakpoints,
        onBreakpointChange: () => {},
      });
      matchMediaBreakpoint.removeListeners = spy;
      matchMediaBreakpoint.destroy();
      expect(spy).toBeCalled();
    });
  });
});
