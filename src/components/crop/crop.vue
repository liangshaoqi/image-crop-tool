<template>
  <div class="crop-view">
    <img class="original-image" src="../../assets/crop.png" alt="图片">
    <img class="crop-original-image" src="../../assets/crop.png" alt="">
    <!-- 裁剪框 -->
    <div id='crop-clip_view'>
      <div class='square left-up'></div>
      <div class="square up"></div>
      <div class="square right-up"></div>
      <div class="square left"></div>
      <div class="square right"></div>
      <div class="square left-down"></div>
      <div class="square down"></div>
      <div class="square right-down"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {}
}
</script>
<style lang='scss'>
  .crop-view {
    position: relative;
    width: 600px;
    height: 600px;
    background: #CCC;
    .original-image {
      opacity: .5;
      width: 600px;
      height: auto;
      position: absolute;
      top: 0;
      left: 0;
    }
    .crop-original-image {
      width: 600px;
      height: auto;
      position: absolute;
      top: 0;
      left: 0;
      clip: rect(0, 300px, 300px, 0);
    }
    #crop-clip_view {
      width: 300px;
      height: 300px;
      border: 1px solid white;
      cursor: move;
      position: absolute;
      .square {
        width: 8px;
        height: 8px;
        position: absolute;
        background: white;
      }
      .left-up {
        top: -4px;
        left: -4px;
        cursor: nw-resize;
      }
      .up {
        top: -4px;
        left: 50%;
        cursor: n-resize;
      }
      .right-up {
        top: -4px;
        right: -4px;
        cursor: ne-resize;
      }
      .left {
        top: 50%;
        left: -4px;
        cursor: w-resize;
      }
      .right {
        top: 50%;
        right: -4px;
        cursor: e-resize;
      }
      .left-down {
        left: -4px;
        bottom: -4px;
        cursor: sw-resize;
      }
      .down {
        left: 50%;
        bottom: -4px;
        cursor: s-resize;
      }
      .right-down {
        right: -4px;
        bottom: -4px;
        cursor: se-resize;
      }
    }
  }
</style>