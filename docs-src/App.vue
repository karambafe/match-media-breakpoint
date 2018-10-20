<template>
  <div id="app">
    <h1>match-media-breakpoint demo</h1>

    <p>Resize the window for change breakpoint</p>

    <p>Current breakpoint: <b>{{ currentBreakpoint }}</b></p>

    <table>
      <thead>
        <tr>
          <th>Breakpoint</th>
          <th>Min-width</th>
          <th>Generated media query</th>
          <th>Color</th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="item in breakpoints" 
          :key="item.breakpoint"
          :class="{ active : currentBreakpoint === item.breakpoint }"
        >
          <td>{{ breakpointsData[item.breakpoint].breakpoint }}</td>
          <td>{{ breakpointsData[item.breakpoint].width }}</td>
          <td>{{ breakpointsData[item.breakpoint].query }}</td>
          <td :style="{ backgroundColor: breakpointsData[item.breakpoint].color }"></td>
        </tr>
      </tbody>
    </table>

    <div class="container">
      <div class="container__item">
        <h3>Using match-media-breakpoint</h3>
        <div class="container__rectangle" :style="{ backgroundColor: breakpointsData[currentBreakpoint].color }"></div>
      </div>

      <div class="container__item">
        <h3>Using pure css</h3>
        <div class="container__rectangle  container__rectangle_css"></div>
      </div>
    </div>    
  </div>
</template>

<script>
import { MatchMediaBreakpoint } from '../src/main.js';

const BREAKPOINTS = [
  { breakpoint: 'mobile', width: 0 },
  { breakpoint: 'tablet', width: 768 },
  { breakpoint: 'laptop', width: 1180 },
  { breakpoint: 'desktop', width: 1440 },
];

export default {
  name: "App",
  data: () => ({
    currentBreakpoint: 'mobile',
    breakpoints: BREAKPOINTS,
    breakpointsData: {
      mobile: {
        breakpoint: 'mobile',
        width: 0,
        color: 'red',
        query: '"(max-width: 767px)"',
      },
      tablet: {
        breakpoint: 'tablet',
        width: 768,
        color: 'blue',
        query: '"(max-width: 1179px) and (min-width: 768px)"',
      },
      laptop: {
        breakpoint: 'laptop',
        width: 1180,
        color: 'yellow',
        query: '"(max-width: 1439px) and (min-width: 1180px)"',
      },
      desktop: {
        breakpoint: 'desktop',
        width: 1440,
        color: 'green',
        query: '"(min-width: 1440px)"',
      },
    },
  }),
  created() {
    const matchMediaBreakpoint = new MatchMediaBreakpoint({
      breakpoints: BREAKPOINTS,
      onBreakpointChange: (breakpoint) => {
        this.currentBreakpoint = breakpoint;
      },
    });
    this.currentBreakpoint = matchMediaBreakpoint.value;
  },
};
</script>

<style lang="scss">
#app {
  max-width: 1000px;
  margin: 0 auto;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

p {
  text-align: left;
}

table {
  width: 100%;
  border-collapse: collapse;
}

td, th {
  padding: 5px;
  border: 1px solid black;
}

.active {
  color: #fff;
  background-color: lightgray;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  
  &__item {
    margin: 0 15px;
  }

  &__rectangle {
    width: 300px;
    height: 200px;
    border-radius: 5px;

    &_css {
      background-color: red;
    }
  }
}

@media (min-width: 768px) {
  .container {
    justify-content: space-between;

    &__item {
      margin: 0;
    }

    &__rectangle_css {
      background-color: blue;
    }
  } 
}

@media (min-width: 1180px) {
  .container__rectangle_css {
    background-color: yellow;
  }
}

@media (min-width: 1440px) {
  .container__rectangle_css {
    background-color: green;
  }
}
</style>
