<template>
  <div id="app">
    <pie-svg-demo></pie-svg-demo>
  </div>
</template>

<script>
import PieSvgDemo from './demo/PieSvgDemo'

export default {
  name: 'App',
  components: {
    PieSvgDemo
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
