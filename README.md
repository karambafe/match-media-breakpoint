# Match Media Breakpoint

Work with breakpoints through matchMedia.

[![Build Status](https://travis-ci.org/karambafe/match-media-breakpoint.svg?branch=master)](https://travis-ci.org/karambafe/match-media-breakpoint)
[![Coverage Status](https://coveralls.io/repos/github/karambafe/match-media-breakpoint/badge.svg?branch=master)](https://coveralls.io/github/karambafe/match-media-breakpoint?branch=master)
[![npm](https://img.shields.io/npm/v/match-media-breakpoint.svg)](https://www.npmjs.com/package/match-media-breakpoint)
[![npm](https://img.shields.io/npm/dm/match-media-breakpoint.svg)](https://www.npmjs.com/package/match-media-breakpoint)
[![npm](https://img.shields.io/npm/dt/match-media-breakpoint.svg)](https://www.npmjs.com/package/match-media-breakpoint)
[![David](https://david-dm.org/karambafe/match-media-breakpoint.svg)](https://david-dm.org/karambafe/match-media-breakpoint)
[![David](https://david-dm.org/karambafe/match-media-breakpoint/dev-status.svg)](https://david-dm.org/karambafe/match-media-breakpoint?type=dev)

## Demo and examples

[Demo](https://wy8p85y2vl.codesandbox.io/)

[VueJs simple example](https://codesandbox.io/s/wy8p85y2vl)

## Install

via NPM
```bash
npm install match-media-breakpoint --save
```

## Usage

Define new instance of MatchMediaBreakpoint with providing breakpoints array at first parametr and callback as second parametr.

The array of breakpoints should consist of objects, the first property of which is the name of the breakpoint, and the second is the value from which the current breakpoint begins. For example:

```javascript
import { MatchMediaBreakpoint } from 'match-media-breakpoint';

const breakpoints = [
  { breakpoint: 'mobile', width: 0 },
  { breakpoint: 'tablet', width: 768 },
  { breakpoint: 'laptop', width: 1180 },
  { breakpoint: 'desktop', width: 1440 },
];

const matchMediaBreakpoint = new MatchMediaBreakpoint({
  breakpoints, 
  onBreakpointChange: (currentBreakpoint, previousBreakpoint) => {
    console.log({ currentBreakpoint, previousBreakpoint });
  },
});
```

## Properties

value

```javascript
matchMediaBreakpoint.value // return current breakpoint
```

previousValue

```javascript
matchMediaBreakpoint.previousValue // return previous breakpoint
```

## Methods

subscribe()

```javascript
matchMediaBreakpoint.subscribe(handler) // add listener. The hander will be called with the previous and current breakpoint as parameters at each breakpoint change
```

unsubscribe()

```javascript
matchMediaBreakpoint.subscribe(handler) // remove listener.
```

destroy()

```javascript
matchMediaBreakpoint.destroy() // remove all listeners
```

## License

This project is licensed under the MIT license, Copyright (c) 2018 Vitaly. For more information see [`LICENSE`](https://github.com/karambafe/match-media-breakpoint/blob/master/LICENSE).
