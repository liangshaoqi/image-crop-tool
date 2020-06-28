<template>
  <div id="app">
    <TestCom/>
  </div>
</template>

<script>
import TestCom from './views'

export default {
  name: 'App',
  components: {
    TestCom
  }
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
