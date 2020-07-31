<template>
  <div class="crop-main-view" :style="getStyle">
    <div class="original-image-view" :style="getStyle">
      <!-- 裁剪实际操作区域 -->
      <div
        v-if="originalImageBase64 !== ''"
        :style="originalImageContainerStyle"
        class="crop-opreate-view"
        id="crop_opreate_view"
      >
        <img
          id="original-image"
          class="original-image"
          :style="originalImageStyle"
          v-show="originalImageBase64 !== ''"
          :src="originalImageBase64"
          alt="裁剪图片"
          @load="imageLoad($event)"
        />
        <cropFrame></cropFrame>
      </div>
    </div>
  </div>
</template>

<script>
import cropFrame from '@/components/crop-frame/crop-frame'
import { mapState, mapMutations } from 'vuex'
import { calculateRatio, createPreview, resetCropPosition, fileToBase64, base64ToFile, downloadUrl } from '@/utils/utils'
export default {
  components: {
    cropFrame
  },
  props: {
    // 裁剪比例
    ratio: {
      type: Array,
      default: () => [3, 2]
    },
  },
  data() {
    return {
      cropImageSrc: ''
    }
  },
  inject: ['cropViewWidth', 'cropViewHeight', 'width', 'height'],
  computed: {
    ...mapState([
      'originalImageBase64',
      'cropImageAttr'
    ]),
    getStyle: function () {
      let style = ''
      style += 'width: ' + this.cropViewWidth + 'px;'
      style += 'height: ' + this.cropViewHeight + 'px;'
      return style
    },
    // 图片容器
    originalImageContainerStyle: function () {
      let style = ''
      let { width, height } = calculateRatio(this.cropViewWidth, this.cropViewHeight, this.cropImageAttr.width, this.cropImageAttr.height)
      style += 'width: ' + width + 'px;'
      style += 'height: ' + height + 'px;'
      return style
    },
    // 裁剪原图的style
    originalImageStyle: function () {
      let style = ''
      style += 'transform: scale(' + this.cropImageAttr.scale + ');'
      // 根据图片和容器的大小来缩放图片
      let { width, height } = calculateRatio(this.cropViewWidth, this.cropViewHeight, this.cropImageAttr.width, this.cropImageAttr.height)
      style += 'width: ' + width + 'px;'
      style += 'height: ' + height + 'px;'
      return style
    }
  },
  methods: {
    ...mapMutations({
      'setOriginalImageBase64': 'setOriginalImageBase64',
      'setCropImageAttr': 'setCropImageAttr',
      'clearAllImage': 'clearAllImage'
    }),
    // 暴露给外部的Events
    // 放大
    scale() {
      console.log('功能正在开发中')
    },
    // 上传
    upload() {
      let input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('style', 'display: none;')
      input.setAttribute('accept', 'image/gif,image/jpeg,image/jpg,image/png')
      input.onchange = async () => {
        // 重置裁剪框的位置
        resetCropPosition('crop_frame_view')
        let uploadImage = input.files[0]
        if (uploadImage) {
          let reresolveObj = await fileToBase64(uploadImage)
          let { width, height, result } = reresolveObj
          // console.log(width, height)
          // 设置原始宽高
          this.setCropImageAttr({
            width,
            height
          })
          // 设置vuex
          this.setOriginalImageBase64(result)
        }
      }
      input.click()
    },
    // 保存
    save(params) {
      if (this.originalImageBase64 ==='') {
        alert('还未上传图片')
        return
      }
      // 按照参数的尺寸进行裁剪,需要生成一个与参数相同的canvas标签
      let canvas = document.createElement('canvas')
      canvas.width = this.width
      canvas.height = this.height
      let ctx = canvas.getContext('2d')
      let image = document.getElementById('original-image')
      // 图片原始信息
      let naturalWidth = image.naturalWidth
      let naturalHeight = image.naturalHeight
      let ratioX = naturalWidth / image.width
      let ratioY = naturalHeight / image.height

      let clipEl = document.getElementById('crop_frame_view') // 裁剪框
      // 裁剪框信息
      let clipLeft = clipEl.offsetLeft
      let clipTop = clipEl.offsetTop // 裁剪框相对于限制框的顶部距离top
      let clipWidth = clipEl.offsetWidth
      let clipHeight = clipEl.offsetHeight
      let left = clipLeft
      let top = clipTop
      let data = {
        left, // 裁剪框相对限制区域的坐标点left
        top,
        width: clipWidth, // 裁剪框的宽
        height: clipHeight
      }
      // 绘制
      ctx.drawImage(image, data.left * ratioX, data.top * ratioY, data.width * ratioX, data.height * ratioY, 0, 0, this.width, this.height)
      if (params) {
        if(params.getFile) {
          let base64 = canvas.toDataURL('image/jpeg', 1.0)
          if (params.type === 'file') {
            return base64ToFile(base64)
          } else {
            return base64
          }
          
        }
      } else {
        downloadUrl(canvas, '下载.png')
      }
    },
    // 清空
    clear() {
      this.clearAllImage()
    },
    // 完成(将裁剪后的对象上传)
    accomplish() { 
      alert('功能正在开发中')
    },
    imageLoad() {
      createPreview.call(this)
    },
  }
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
  background-image: linear-gradient(
      45deg,
      #eee 25%,
      transparent 25%,
      transparent 75%,
      #eee 75%,
      #eee 100%
    ),
    linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
  .original-image-view {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    .crop-opreate-view {
      box-sizing: border-box;
      position: relative;
      .original-image {
        user-select: none;
      }
    }
  }
}
</style>