<template>
  <div class="crop-main-view" :style="getStyle">
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 770
    },
    height: {
      type: Number,
      default: 520
    }
  },
  computed: {
    getStyle: function() {
      let style = ''
      style += 'width: ' + this.width + 'px;'
      style += 'height: ' + this.height + 'px;'
      return style
    },
  },
  data () {
    return {
    }
  },
  methods: {}
}
</script>
<style lang='scss'>
  .crop-main-view {
    box-sizing: border-box;
    position: relative;
    border: 1px solid #eee;
    // 马赛克背景
    background-size: 20px 20px;
    background-position: 0 0, 10px 10px;
    background-image: 
      linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%),
      linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%)
    ;
  }
</style>