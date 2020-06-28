<template>
  <div class="crop-view">
    <img class="original-image" src="../../assets/crop.png" alt="图片">
    <img class="crop-original-image" src="../../assets/crop.png" alt="">
    <!-- 裁剪框 -->
    <div id='crop-clip_view' v-drag>
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
/* eslint-disable no-debugger */
export default {
  directives: {
    drag: function(el) {
      let dragEl = el
      dragEl.onmousedown = e => {
        let relativeX = e.clientX - dragEl.offsetLeft
        let relativeY = e.clientY - dragEl.offsetTop
        console.log('clientX:', e.clientX)
        console.log('clientY:', e.clientY)
        console.log('offsetLeft', dragEl.offsetLeft)
        console.log('offsetTop', dragEl.offsetTop)
        document.onmousemove = e => {
          let left = e.clientX - relativeX
          let top = e.clientY - relativeY
          dragEl.style.left = left + 'px'
          dragEl.style.top = top + 'px'
        }
        document.onmouseup = () => {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
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
      top: 10px;
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