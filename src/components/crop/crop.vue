<template>
  <div class="crop-view">
    <img class="original-image" src="../../assets/crop.png" alt="图片" />
    <img class="crop-original-image" src="../../assets/crop.png" alt />
    <!-- 裁剪框 -->
    <div id="crop-clip_view" ref="crop-clip_view" v-drag>
      <div class="square left-up" v-scale="'left-up'"></div>
      <div class="square up" v-scale="'up'"></div>
      <div class="square right-up" v-scale="'right-up'"></div>
      <div class="square left" v-scale="'left'"></div>
      <div class="square right" v-scale="'right'"></div>
      <div class="square left-down" v-scale="'left-down'"></div>
      <div class="square down" v-scale="'down'"></div>
      <div class="square right-down" v-scale="'right-down'"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  directives: {
    drag: function (el, params, vnode) {
      let getPosition = vnode.context.getPositionLocation
      let dragEl = el
      dragEl.onmousedown = e => {
        let relativeX = e.clientX - dragEl.offsetLeft
        let relativeY = e.clientY - dragEl.offsetTop
        let boxEl = document.getElementById('crop-clip_view')
        console.log(getPosition(boxEl))
        let position = getPosition(boxEl)
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
    scale: function (el, params, vNode) {
      // console.log(vNode)
      let scaleEl = el
      let direction = params.value
      // 获取元素相遇屏幕左边的位置
      const getPositionLocation = (node) => {
        let left = node.offsetLeft
        let top = node.offsetTop
        let parent = node.offsetParent
        let width = parent.offsetWidth
        let height = parent.offsetHeight
        if (left < parent.offsetLeft) {
          left = parent.offsetLeft
        }
        if (top < parent.offsetTop) {
          top = parent.offsetTop
        }
        return {
          left,
          top,
          width,
          height
        }
      }

      scaleEl.onmousedown = e => {
        e.stopPropagation()
        let boxEl = document.getElementById('crop-clip_view')
        let postion = getPositionLocation(boxEl)
        console.log(postion)
        let offsetLeft = boxEl.offsetLeft
        let offsetTop = boxEl.offsetTop
        let offsetWidth = boxEl.offsetWidth // old裁剪框宽
        let offsetHeight = boxEl.offsetHeight
        let oldWidth = offsetWidth - 2 // 减2为border宽
        let oldHeight = offsetHeight - 2
        let x1 = e.clientX // 当前点击的伸缩点的x坐标
        let y1 = e.clientY
        // 左移
        const moveLeft = (e) => {
          // 修改宽和left
          let x2 = e.clientX
          let width = x1 - x2 + oldWidth
          let left = offsetLeft - (x1 - x2)
          boxEl.style.width = width + 'px',
            boxEl.style.left = left + 'px'
        }
        const moveRight = (e) => {
          // 修改宽,定位不变
          let x2 = e.clientX
          let width = x2 - x1 + oldWidth
          boxEl.style.width = width + 'px'
        }
        const moveUp = (e) => {
          // 修改高,定位高变化
          let y2 = e.clientY
          let top = offsetTop - (y1 - y2)
          let height = y1 - y2 + oldHeight
          boxEl.style.height = height + 'px'
          boxEl.style.top = top + 'px'
        }
        const moveDown = (e) => {
          let y2 = e.clientY
          let height = y2 - y1 + oldHeight
          boxEl.style.height = height + 'px'
        }
        document.onmousemove = e => {
          switch (direction) {
            case 'left':
              moveLeft(e)
              break
            case 'right':
              moveRight(e)
              break
            case 'up':
              moveUp(e)
              break
            case 'down':
              moveDown(e)
              break
            case 'left-up':
              moveLeft(e)
              moveUp(e)
              break
            case 'right-up':
              moveRight(e)
              moveUp(e)
              break
            case 'left-down':
              moveLeft(e)
              moveDown(e)
              break
            case 'right-down':
              moveRight(e)
              moveDown(e)
              break
            default:
              break
          }
        }
        document.onmouseup = () => {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    }
  },
  data() {
    return {

    }
  },
  methods: {
    getPositionLocation(node) {
      let left = node.offsetLeft
      let top = node.offsetTop
      let parent = node.offsetParent
      let width = parent.offsetWidth
      let height = parent.offsetHeight
      if (left < parent.offsetLeft) {
        left = parent.offsetLeft
      }
      if (top < parent.offsetTop) {
        top = parent.offsetTop
      }
      return {
        left,
        top,
        width,
        height
      }
    }
  }
}
</script>
<style lang='scss'>
.crop-view {
  position: relative;
  width: 600px;
  height: 600px;
  background: #ccc;
  .original-image {
    opacity: 0.5;
    width: 600px;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
    user-select: none;
  }
  .crop-original-image {
    user-select: none;
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
    z-index: 10;
    // top: 10px;
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