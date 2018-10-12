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
    matchMediaBreakpoint._addListeners();

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
    matchMediaBreakpoint._removeListeners();

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

  it('should add function to listeners array if call method subscribe', () => {
    const matchMediaBreakpoint = new MatchMediaBreakpoint({
      breakpoints,
      onBreakpointChange: () => {},
    });

    const someFunction = () => {};
    matchMediaBreakpoint.subscribe(someFunction);

    expect(matchMediaBreakpoint._listeners).toEqual([someFunction]);
  });

  describe('unsubscribe', () => {
    it('should remove function from listeners if it exists', () => {
      const matchMediaBreakpoint = new MatchMediaBreakpoint({
        breakpoints,
        onBreakpointChange: () => {},
      });
  
      const someFunction = () => {};
      const anotherFunction = () => {};
  
      matchMediaBreakpoint.subscribe(someFunction);
      matchMediaBreakpoint.subscribe(anotherFunction);
      matchMediaBreakpoint.unsubscribe(anotherFunction);
  
      expect(matchMediaBreakpoint._listeners).toEqual([someFunction]);
    });

    it('should not update listeners array if function is not exists', () => {
      const matchMediaBreakpoint = new MatchMediaBreakpoint({
        breakpoints,
        onBreakpointChange: () => {},
      });
  
      const someFunction = () => {};
      const unknownFunction = () => {};
  
      matchMediaBreakpoint.subscribe(someFunction);
      matchMediaBreakpoint.unsubscribe(unknownFunction);
  
      expect(matchMediaBreakpoint._listeners).toEqual([someFunction]);
    });
  });

  describe('handleMediaQueryList', () => {
    it('should return undefined if not match query', () => {
      const matchMediaBreakpoint = new MatchMediaBreakpoint({
        breakpoints,
        onBreakpointChange: () => {},
      });

      expect(matchMediaBreakpoint._handleMediaQueryList({ matches: false })).toBeUndefined();
    });

    it('should change value property if event matches is true', () => {
      const matchMediaBreakpoint = new MatchMediaBreakpoint({
        breakpoints,
        onBreakpointChange: () => {},
      });

      matchMediaBreakpoint._handleMediaQueryList({ matches: true, media: '(min-width: 1200px)' });

      expect(matchMediaBreakpoint.value).toBe('desktop');
    });

    it('should call callback onBreakpointChange if event matches is true', () => {
      const spy = jest.fn();
      const matchMediaBreakpoint = new MatchMediaBreakpoint({
        breakpoints,
        onBreakpointChange: spy,
      });

      matchMediaBreakpoint._handleMediaQueryList({ matches: true, media: '(min-width: 1200px)' });

      expect(spy).toBeCalledWith('desktop', 'tablet');
    });

    it('should call listeners if event matches is true', () => {
      const someFunction = jest.fn();
      const matchMediaBreakpoint = new MatchMediaBreakpoint({
        breakpoints,
        onBreakpointChange: () => {},
      });

      matchMediaBreakpoint.subscribe(someFunction);
      matchMediaBreakpoint._handleMediaQueryList({ matches: true, media: '(min-width: 1200px)' });

      expect(someFunction).toBeCalledWith('desktop', 'tablet');
    });
  });

  describe('destroy', () => {
    it('should call method removeListeners', () => {
      const spy = jest.fn();
      const matchMediaBreakpoint = new MatchMediaBreakpoint({
        breakpoints,
        onBreakpointChange: () => {},
      });

      matchMediaBreakpoint._removeListeners = spy;
      matchMediaBreakpoint.destroy();

      expect(spy).toBeCalled();
    });

    it('should clear listeners', () => {
      const matchMediaBreakpoint = new MatchMediaBreakpoint({
        breakpoints,
        onBreakpointChange: () => {},
      });

      const someFunction = () => {};
  
      matchMediaBreakpoint.subscribe(someFunction);
      matchMediaBreakpoint.destroy();

      expect(matchMediaBreakpoint._listeners).toEqual([]);
    });
  });
});
