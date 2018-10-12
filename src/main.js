export const getMediaQueries = breakpoints => (
  breakpoints.map((item, index) => ({
    breakpoint: item.breakpoint,
    query: index === 0 // eslint-disable-line no-nested-ternary
      ? `(max-width: ${breakpoints[index + 1].width - 1}px)`
      : index === breakpoints.length - 1
        ? `(min-width: ${item.width}px)`
        : `(max-width: ${breakpoints[index + 1].width - 1}px) and (min-width: ${item.width}px)`,
  })));

export const getCurrentBreakpoint = breakpoints => (
  getMediaQueries(breakpoints).reduce((previous, current) => (
    window.matchMedia(current.query).matches ? current.breakpoint : previous
  ), undefined));

export function MatchMediaBreakpoint({ breakpoints, onBreakpointChange }) {
  this.breakpoints = getMediaQueries(breakpoints);
  this.value = getCurrentBreakpoint(breakpoints);
  this.previousValue = undefined;
  this._listeners = [];

  this._addListeners = () => {
    this.breakpoints
      .map(item => window.matchMedia(item.query))
      .forEach(item => item.addListener(this._handleMediaQueryList));
  };

  this._handleMediaQueryList = (event) => {
    if (!event.matches) return;
    this.breakpoints.forEach((item) => {
      if (item.query === event.media) {
        this.previousValue = this.value;
        this.value = item.breakpoint;
        onBreakpointChange(item.breakpoint, this.previousValue);

        this._listeners.forEach(listener => listener(item.breakpoint, this.previousValue));
      }
    });
  };

  this._removeListeners = () => {
    this.breakpoints
      .map(item => window.matchMedia(item.query))
      .forEach(item => item.removeListener(this._handleMediaQueryList));
  };

  this.subscribe = listener => this._listeners.push(listener);

  this.unsubscribe = listener => this._listeners.filter(l => l !== listener);

  this.destroy = () => {
    this._removeListeners();
  };

  this._addListeners();
}
