<template>
  <div class="toolbar-view">
    <div class="toolbar">
      <div class="scale toolbar-item">
        <span @click="scale('-')" class='iconfont iconGroup-1' title="缩小"></span>
        <span class="scale-number">{{scaleNumber}}</span>
        <span class="scale-percent">%</span>
        <span @click="scale('+')" class='iconfont iconGroup-' title="放大"></span>
      </div>
      <span class="toolbar-item iconfont iconshangchuan" @click="upload" title="上传"></span>
      <span class="toolbar-item iconfont iconbaocun" title="保存"></span>
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
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      scaleNumber: 100
    }
  },
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
          console.log(width, height)
          // 设置原始宽高
          this.setCropImageAttr({
            width,
            height
          })
          // 设置vuex
          this.setOriginalImageBase64(result)
          console.log(this.$store.state)
        }
      }
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