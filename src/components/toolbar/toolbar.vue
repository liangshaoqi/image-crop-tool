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
      <span class="toolbar-item iconfont iconwancheng" @click="complete" title="获取裁剪对象"></span>
    </div>
    <div>
      <input id="upload-input" type="file" style="display: none;">
    </div>
  </div>
</template>

<script>
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
  methods: {
    ...mapMutations([
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
      this.$emit('upload')
    },
    // 下载裁剪图片
    save() {
      this.$emit('downloadFile')
    },
    clearAll() {
      this.$emit('clear')
    },
    complete() {
      this.$emit('complete')
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