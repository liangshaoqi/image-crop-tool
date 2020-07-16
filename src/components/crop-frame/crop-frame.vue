<template>
  <div :style='getCropFrameStyle' id="crop_frame_view" v-drag class="crop-frame-view" v-if="originalImageBase64 != ''">
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
import { mapState } from 'vuex'
import { createPreview, clearImage } from '@/utils/utils'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      originalImageBase64: 'originalImageBase64'
    }),
    getCropFrameStyle: function() {
      let style = ''
      let width = 0
      let height = 0
      if (this.ratio > 1) { // 定宽
        width = this.previewUtinPx
        height = this.ratio * this.previewUtinPx
      } else { // 定高
        width = this.ratio * this.previewUtinPx
        height = this.previewUtinPx
      }
      style += 'width: ' + width + 'px;'
      style += 'height: ' + height + 'px;'
      return style
    },
  },
  directives: {
    // 拖拽指令
    drag: function(el) {
      let dragEl = el
      dragEl.onmousedown = e => {
        e.stopPropagation()
        let relativeX = e.clientX - dragEl.offsetLeft
        let relativeY = e.clientY - dragEl.offsetTop
        let clipEl = document.getElementById('crop_frame_view') // 裁剪框
        let limitEl = document.getElementById('crop_opreate_view') // 限制框
        document.onmousemove = e => {
          e.stopPropagation()
          let left = e.clientX - relativeX
          let top = e.clientY - relativeY
          // 外层信息
          let limitWidth = limitEl.offsetWidth
          let limitHeight = limitEl.offsetHeight
          // 裁剪框信息
          let clipWidth = clipEl.offsetWidth
          let clipHeight = clipEl.offsetHeight
          let clipLeft = clipEl.offsetLeft
          let clipTop = clipEl.offsetTop
          // 判断是否越界
          if (left < 0) {
            left = 0
          }
          if (top < 0) {
            top = 0
          }
          
          if (clipLeft + clipWidth >= limitWidth && left > limitWidth - clipWidth) {
            left = limitWidth - clipWidth
          }
          if (clipTop + clipHeight >= limitHeight && top > limitHeight - clipHeight) {
            top = limitHeight - clipHeight
          }
          dragEl.style.left = left + 'px'
          dragEl.style.top = top + 'px'
          let positionData = {
            left,
            top,
            width: clipWidth,
            height: clipHeight
          }
          // 生成canvas裁剪区域
          createPreview(positionData)
        }
        document.onmouseup = () => {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    },
    // 缩放指令
    scale: function(el, params) {
      let scaleEl = el
      let direction = params.value
      scaleEl.onmousedown = e => {
        e.stopPropagation()
        let boxEl = document.getElementById('crop_frame_view') // 裁剪框
        let limitEl = document.getElementById('original-image') // 限制框
        // 裁剪框信息
        let offsetLeft = boxEl.offsetLeft
        let offsetTop = boxEl.offsetTop
        let offsetWidth = boxEl.offsetWidth // old裁剪框宽
        let offsetHeight = boxEl.offsetHeight
        let oldWidth = offsetWidth - 2 // 减2为border宽
        let oldHeight = offsetHeight - 2

        //  限制框信息
        let limitLeft = limitEl.offsetLeft
        let limitTop = limitEl.offsetTop
        let limitWidth = limitEl.width
        let limitHeight = limitEl.height

        let x1 = e.clientX // 当前点击的伸缩点的x坐标
        let y1 = e.clientY
        // 左移
        const moveLeft = (e) => {
          // 修改宽和left
          let x2 = e.clientX
          let width = x1 - x2 + oldWidth
          let left = offsetLeft - (x1 - x2)
          if (x2 - x1 > oldWidth) return
          if (left < 0) {
            left = 0
            width = oldWidth + offsetLeft
          }
          boxEl.style.width = width + 'px'
          boxEl.style.left = left + 'px'
        }
        const moveRight = (e) => {
          // 修改宽,定位不变
          let x2 = e.clientX
          let width = x2 - x1 + oldWidth
          // 边界
          if (offsetLeft + width >= limitLeft + limitWidth - 2) {
            width = limitLeft + limitWidth - offsetLeft - 2
          }
          boxEl.style.width = width + 'px'
        }
        const moveUp = (e) => {
          // 修改高,定位高变化
          let y2 = e.clientY
          let top = offsetTop - (y1 - y2)
          let height = y1 - y2 + oldHeight
          if (y2 - y1 > oldHeight) return
          if (top < 0) {
            top = 0
            height = oldHeight + offsetTop
          }
          
          boxEl.style.height = height + 'px'
          boxEl.style.top = top + 'px'
        }
        const moveDown = (e) => {
          let y2 = e.clientY
          let height = y2 - y1 + oldHeight
          if (offsetTop + height >= limitTop + limitHeight) {
            height = limitTop + limitHeight - offsetTop
          }
          boxEl.style.height = height + 'px'
        }
        document.onmousemove = e => {
          e.stopPropagation()
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
          clearImage()
          createPreview({
            width: boxEl.offsetWidth,
            height: boxEl.offsetHeight,
            left: boxEl.offsetLeft,
            top: boxEl.offsetTop
          })
        }
        document.onmouseup = () => {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    }
  },
  inject: ['width', 'height', 'ratio', 'previewUtinPx'],
  methods: {
    /**
     * 裁剪框移动和缩小放大的区域限制
     * @params { Object } clipNode 裁剪框节点对象
     * @params { Object } limitNode 限制范围的节点对象
     * @returns { Object } 范围定位
    **/
    clipRangeData(clipNode) {
      let clipNodeLeft = clipNode.offsetLeft
      let clipNodeTop = clipNode.offsetTop
      // 最终返回的范围
      let range = {}
      // 移动过程区域
      if (clipNodeLeft <= 0) {
        range.left = 0
      } else {
        range.left = clipNodeLeft
      }
      if (clipNodeTop < 0) {
        range.top = 0
      } else {
        range.top = clipNodeTop
      }
      return range
    }
  }
}
</script>
<style lang='scss'>
  .crop-frame-view {
    width: 300px;
    height: 200px;
    border: 1px solid #7d73d4;
    cursor: move;
    position: absolute;
    z-index: 99;
    top: 0;
    left: 0;
    .square {
      width: 8px;
      height: 8px;
      position: absolute;
      background: #7d73d4;
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
</style>