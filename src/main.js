export function MatchMediaBreakpoint({ breakpoints, onBreakpointChange }) {
  this.breakpoints = getMediaQueries(breakpoints);
  this.value = getCurrentBreakpoint(breakpoints);

  this.addListeners = () => {
    this.breakpoints
      .map(item => window.matchMedia(item.query))
      .forEach(item => item.addListener(this.handleMediaQueryList));
  }

  this.handleMediaQueryList = event => {
    if (!event.matches) return;
    this.breakpoints.forEach(item => {
      if (item.query === event.media) {
        this.value = item.breakpoint;
        onBreakpointChange(item.breakpoint);
      }
    });
  }

  this.removeListeners = () => {
    this.breakpoints
      .map(item => window.matchMedia(item.query))
      .forEach(item => item.removeListener(this.handleMediaQueryList));
  }

  this.destroy = () => {
    this.removeListeners();
  }

  this.addListeners();
};

const getMediaQueries = (breakpoints) => {
  return breakpoints.map((item, index) => ({
    breakpoint: item.breakpoint,
    query: index === 0
      ? `(max-width: ${breakpoints[index + 1].width - 1}px)`
      : index === breakpoints.length - 1
        ? `(min-width: ${item.width}px)`
        : `(max-width: ${breakpoints[index + 1].width - 1}px) and (min-width: ${item.width}px)`,
  }));
};

const getCurrentBreakpoint = (breakpoints) => {
  return getMediaQueries(breakpoints).reduce((previous, current) => (
    window.matchMedia(current.query).matches ? current.breakpoint : previous
  ), undefined);
};

export {
  getMediaQueries,
  getCurrentBreakpoint,
}
