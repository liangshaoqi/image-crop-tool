<template>
  <div id="app">
    <CropContainer :width='200' :height='200'/>
  </div>
</template>

<script>
import CropContainer from './views/crop-container'
export default {
  name: 'App',
  components: {
    CropContainer
  }
}
</script>

<style lang='scss'>
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
}
</style>
