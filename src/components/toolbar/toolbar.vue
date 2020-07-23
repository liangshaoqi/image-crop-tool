<template>
  <div class="toolbar-view">
    <div class="toolbar">
      <!-- <div class="scale toolbar-item">
        <span @click="scale('-')" class='iconfont iconGroup-1' title="缩小"></span>
        <span class="scale-number">{{scaleNumber}}</span>
        <span class="scale-percent">%</span>
        <span @click="scale('+')" class='iconfont iconGroup-' title="放大"></span>
      </div> -->
      <span class="toolbar-item iconfont iconshangchuan" @click="upload" title="上传图片"></span>
      <span class="toolbar-item iconfont iconbaocun" title="保存" @click="save"></span>
      <span class="toolbar-item iconfont iconquxiao1" @click="clearAll" title="清空"></span>
      <span class="toolbar-item iconfont iconwancheng" @click="complete" title="完成"></span>
    </div>
    <div>
      <input id="upload-input" type="file" style="display: none;">
    </div>
  </div>
</template>

<script>
import { fileToBase64, base64ToFile, downloadUrl, resetCropPosition } from '@/utils/utils'
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      scaleNumber: 100
    }
  },
  computed: {
    ...mapState({
      'originalImageBase64': 'originalImageBase64'
    })
  },
  inject: ['width', 'height'],
  methods: {
    ...mapMutations([
      "setOriginalImageBase64",
      'clearAllImage',
      'setCropImageAttr'
    ]),
    // 放大缩小
    scale(type) {
      // alert('功能正在开发中...')
      let scaleNumber = this.scaleNumber
      let scale = 1
      if (type == '-') {
        if (scaleNumber <= 10) return
        this.scaleNumber -= 10
      } else {
        this.scaleNumber += 10
      }
      scale = this.scaleNumber / 100
      this.setCropImageAttr({
        scale: scale
      })
      // 获取裁剪框信息
      let boxEl = document.getElementById('crop_frame_view') // 裁剪框
      // 重新绘制预览图
      let data = {
        width: boxEl.offsetWidth,
        height: boxEl.offsetHeight,
        left: boxEl.offsetLeft,
        top: boxEl.offsetTop
      }
      console.log(data)
    },
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
    // 下载裁剪图片
    save(params) {
      // 
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
    clearAll() {
      this.clearAllImage()
    },
    complete() {
      alert('功能正在开发中')
    }
  }
}
</script>
<style lang='scss'>
  .toolbar-view {
    .toolbar {
      // height: 36px;
      padding: 3px 0;
      width: 770px;
      background: #4188f2;
      border-radius: 3px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      .toolbar-item {
        &+.toolbar-item {
          margin-left: 20px;
        }
      }
      .iconfont {
        cursor: pointer;
      }
      .scale {
        display: flex;
        justify-items: center;
        align-items: center;
        .iconGroup- {
          margin-left: 5px;
        }
      }
      span {
        font-size: 35px;
      }
      .scale-number,.scale-percent {
        font-size: 20px;
      }
      .scale-number {
        width: 35px;
        text-align: right;
      }
    }
  }
</style>