<template>
  <div class="crop-view" id='crop-view'>
    <div class="crop-cover"></div>
    <img @load="imageOnload($event)" id="original-image" class="original-image" src="../../assets/timg.jpg" alt="图片" />
    <!-- <img class="crop-original-image" src="../../assets/crop.png" alt /> -->
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
    <!-- 预览 -->
    <div class="preview-view">
      <canvas id='clip_anvas' width="600" height="300">您的浏览器不支持canvas标签</canvas>
    </div>
    <div class="download">
      <button @click="getImageFile">获取图片文件对象</button>
    </div>
  </div>
</template>

<script>
// /* eslint-disable */
import { base64ToFile } from '../../utils/utils'
export default {
  props: {
    
  },
  directives: {
    drag: function (el, params, vnode) {
      let clipRangeData = vnode.context.clipRangeDataclipRangeData
      let createPreview = vnode.context.createPreview
      let dragEl = el
      dragEl.onmousedown = e => {
        let relativeX = e.clientX - dragEl.offsetLeft
        let relativeY = e.clientY - dragEl.offsetTop
        let clipEl = document.getElementById('crop-clip_view') // 裁剪框
        let limitEl = document.getElementById('original-image') // 限制框
        document.onmousemove = e => {
          let left = e.clientX - relativeX
          let top = e.clientY - relativeY
          // 外层信息
          let limitLeft = limitEl.offsetLeft
          let limitTop = limitEl.offsetTop
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
          createPreview(positionData)
        }
        document.onmouseup = () => {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    },
    scale: function (el, params, vNode) {
      let scaleEl = el
      let direction = params.value
      let { createPreview, clearImage } = vNode.context
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
        let limitEl = document.getElementById('original-image')
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
  data() {
    return {
      src: ''
    }
  },
  methods: {
    imageOnload(e) {
      this.createPreview()
    },
    clearImage() {
      let canvas = document.getElementById('clip_anvas')
      let ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, 600, 300)
    },
    getImageFile() {
      let canvas = document.getElementById('clip_anvas')
      let base64 = canvas.toDataURL('image/png')
      let imageFile = base64ToFile(base64, 'image')
      console.log(imageFile)
    },
    createPreview(data) {
      let canvas = document.getElementById('clip_anvas')
      let ctx = canvas.getContext('2d')
      let image = document.getElementById('original-image')
      // 图片原始信息
      let naturalWidth = image.naturalWidth
      let naturalHeight = image.naturalHeight
      let ratioX = naturalWidth / image.width
      let ratioY = naturalHeight / image.height
      if (data) {
        ctx.drawImage(image, data.left * ratioX, data.top * ratioY, data.width * ratioX, data.height * ratioY, 0, 0, data.width, data.height)
      } else {
        ctx.drawImage(image, 0, 0, 200 * ratioX, 200 * ratioY, 0, 0, 200, 200)
      }
      // this.getImageFile()
    },
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
    },
    /**
     * 裁剪框移动和缩小放大的区域限制
     * @params { Object } clipNode 裁剪框节点对象
     * @params { Object } limitNode 限制范围的节点对象
     * @returns { Object } 范围定位
    **/
    clipRangeData(clipNode, limitNode) {
      // 限制裁剪框移动的节点信息
      let limitNodeWidth = limitNode.offsetWidth
      let limitNodeHeight = limitNode.offsetHeight
      let limitNodeLeft = limitNode.offsetLeft
      let limitNodeTop = limitNode.offsetTop
      // 裁剪框节点信息
      let clipNodeWidth = clipNode.offsetWidth
      let clipNodeHeight = clipNode.offsetHeight
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
.crop-view {
  position: relative;
  width: 600px;
  height: 600px;
  background: #ccc;
  .download {
    position: absolute;
    bottom: -30px;
    left: 0;
  }
  .original-image {
    // opacity: 0.5;
    width: 600px;
    height: 300px;
    position: absolute;
    top: 0;
    left: 0;
    user-select: none;
    z-index: 1;
  }
  .crop-cover {
    width: 600px;
    height: 300px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }
  .crop-original-image {
    user-select: none;
    width: 600px;
    height: 300px;
    position: absolute;
    top: 0;
    left: 0;
    clip: rect(0, 200px, 200px, 0);
  }
  .preview-view {
    position: absolute;
    top: 50%;
  }
  #crop-clip_view {
    width: 200px;
    height: 200px;
    border: 1px solid white;
    cursor: move;
    position: absolute;
    z-index: 99;
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