# Match Media Breakpoint

Work with breakpoints through matchMedia.

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
  onBreakpointChange: (breakpoint) => {
    console.log(breakpoint);
  },
});
```

value

```javascript
matchMediaBreakpoint.value // return current breakpoint
```

destroy()

```javascript
matchMediaBreakpoint.destroy() // remove all listeners
```

## License

This project is licensed under the MIT license, Copyright (c) 2018 Vitaly. For more information see [`LICENSE`](https://github.com/karambafe/match-media-breakpoint/blob/master/LICENSE).
