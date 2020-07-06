<template>
  <div class="crop-frame-view">
    <div class="square left-up" v-scale="'left-up'"></div>
    <div class="square up" v-scale="'up'"></div>
    <div class="square right-up" v-scale="'right-up'"></div>
    <div class="square left" v-scale="'left'"></div>
    <div class="square right" v-scale="'right'"></div>
    <div class="square left-down" v-scale="'left-down'"></div>
    <div class="square down" v-scale="'down'"></div>
    <div class="square right-down" v-scale="'right-down'"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {}
}
</script>
<style lang='scss'>
</style>