<template>
  <div class="crop-container">
    <div class="crop-operate-view">
      <div class="view-area">
        <!-- 裁剪操作视图 -->
        <MainCropView></MainCropView>
        <!-- 预览 -->
        <Preview></Preview>
      </div>
      <!-- 工具栏 -->
      <Toolbar></Toolbar>
    </div>
  </div>
</template>

<script>
import MainCropView from '../components/crop-view/crop-view'
import Preview from '../components/preview/preview'
import Toolbar from '../components/toolbar/toolbar'
export default {
  props: {
    cropViewWidth: {
      type: Number,
      default: 770,
    },
    cropViewHeight: {
      type: Number,
      default: 520
    },
    width: { // 生成图片的宽
      type: Number,
      default: 210
    },
    height: { // 生成图片的高
      type: Number,
      default: 140
    },
    previewUtinPx: { // 预览时的单位展示像素,计算为width = width / height * previewUtinPx, height = previewUtinPx
      type: Number,
      default: 200
    }
  },
  components: {
    MainCropView,
    Preview,
    Toolbar
  },
  provide() {
    return {
      cropViewWidth: this.cropViewWidth,
      cropViewHeight: this.cropViewHeight,
      width: this.width,
      height: this.height,
      ratio: this.width / this.height,
      previewUtinPx: this.previewUtinPx
    }
  },
  data () {
    return {
    }
  },
  methods: {}
}
</script>
<style lang='scss'>
  .crop-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: Gainsboro;
    .crop-operate-view {
      // width: 1100px;
      padding: 40px 40px 40px 50px;
      background: #fff;
      border-radius: 5px;
      .view-area {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        .crop-main-view {
          margin-right: 50px;
        }
      }
      .toolbar-view {
        margin-top: 10px;
      }
    }
  }
</style>