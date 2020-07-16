<template>
  <div class="toolbar-view">
    <div class="toolbar">
      <div class="scale toolbar-item">
        <span @click="scale('-')" class='iconfont iconGroup-1' title="缩小"></span>
        <span class="scale-number">{{scaleNumber}}</span>
        <span class="scale-percent">%</span>
        <span @click="scale('+')" class='iconfont iconGroup-' title="放大"></span>
      </div>
      <span class="toolbar-item iconfont iconshangchuan" @click="upload" title="上传图片"></span>
      <span class="toolbar-item iconfont iconbaocun" title="保存" @click="save"></span>
      <span class="toolbar-item iconfont iconquxiao1" @click="clearAll" title="清空"></span>
      <span class="toolbar-item iconfont iconwancheng" title="完成"></span>
    </div>
    <div>
      <input id="upload-input" type="file" style="display: none;">
    </div>
  </div>
</template>

<script>
import { fileToBase64 } from '@/utils/utils'
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
      // let scaleNumber = this.scaleNumber
      // let scale = 1
      // if (type == '-') {
      //   if (scaleNumber <= 10) return
      //   this.scaleNumber -= 10
      // } else {
      //   this.scaleNumber += 10
      // }
      // scale = this.scaleNumber / 100
      // this.setCropImageAttr({
      //   scale: scale
      // })
    },
    upload() {
      let input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('style', 'display: none;')
      input.setAttribute('accept', 'image/gif,image/jpeg,image/jpg,image/png')
      input.click()
      input.onchange = async () => {
        let uploadImage = input.files[0]
        if (uploadImage) {
          let reresolveObj = await fileToBase64(uploadImage)
          let { width, height, result } = reresolveObj
          // 设置原始宽高
          this.setCropImageAttr({
            width,
            height
          })
          // 设置vuex
          this.setOriginalImageBase64(result)
        }
      }
    },
    // 下载裁剪图片
    save() {
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
      let limitEl = document.getElementById('crop_opreate_view') // 限制框
      // 限制框信息
      let limitWidth = limitEl.offsetWidth
      let limitHeight = limitEl.offsetHeight
      // 裁剪框信息
      let clipWidth = clipEl.offsetWidth
      let clipHeight = clipEl.offsetHeight
      let left = limitWidth - clipWidth
      let top = limitHeight - clipHeight
      let data = {
        left, // 相对限制区域的坐标点left
        top,
        width: clipWidth,
        height: clipHeight
      }
      // 绘制
      ctx.drawImage(image, data.left * ratioX, data.top * ratioY, data.width * ratioX, data.height * ratioY, 0, 0, this.width, this.height)

      let imageSrc = canvas.toDataURL('image/png')
      let saveLink = document.createElement('a')
      saveLink.href = imageSrc
      saveLink.download = '裁剪.png'
      saveLink.click()
    },
    clearAll() {
      this.clearAllImage()
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