'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function MatchMediaBreakpoint(_ref) {
  var _this = this;

  var breakpoints = _ref.breakpoints,
      onBreakpointChange = _ref.onBreakpointChange;

  this.breakpoints = getMediaQueries(breakpoints);
  this.value = getCurrentBreakpoint(breakpoints);

  this.addListeners = function () {
    _this.breakpoints.map(function (item) {
      return window.matchMedia(item.query);
    }).forEach(function (item) {
      return item.addListener(_this.handleMediaQueryList);
    });
  };

  this.handleMediaQueryList = function (event) {
    if (!event.matches) return;
    _this.breakpoints.forEach(function (item) {
      if (item.query === event.media) {
        _this.value = item.breakpoint;
        onBreakpointChange(item.breakpoint);
      }
    });
  };

  this.removeListeners = function () {
    _this.breakpoints.map(function (item) {
      return window.matchMedia(item.query);
    }).forEach(function (item) {
      return item.removeListener(_this.handleMediaQueryList);
    });
  };

  this.destroy = function () {
    _this.removeListeners();
  };

  this.addListeners();
}
var getMediaQueries = function getMediaQueries(breakpoints) {
  return breakpoints.map(function (item, index) {
    return {
      breakpoint: item.breakpoint,
      query: index === 0 ? "(max-width: " + (breakpoints[index + 1].width - 1) + "px)" : index === breakpoints.length - 1 ? "(min-width: " + item.width + "px)" : "(max-width: " + (breakpoints[index + 1].width - 1) + "px) and (min-width: " + item.width + "px)"
    };
  });
};

var getCurrentBreakpoint = function getCurrentBreakpoint(breakpoints) {
  return getMediaQueries(breakpoints).reduce(function (previous, current) {
    return window.matchMedia(current.query).matches ? current.breakpoint : previous;
  }, undefined);
};

exports.MatchMediaBreakpoint = MatchMediaBreakpoint;
exports.getMediaQueries = getMediaQueries;
exports.getCurrentBreakpoint = getCurrentBreakpoint;
