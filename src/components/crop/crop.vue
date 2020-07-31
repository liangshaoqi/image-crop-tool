<template>
  <div class="crop-operate-view">
    <div class="view-area">
      <!-- 裁剪操作视图 -->
      <MainCropView ref="crop_view"></MainCropView>
      <!-- 预览 -->
      <Preview ref="preview"></Preview>
    </div>
    <!-- 工具栏 -->
    <Toolbar ref="toolbar" @complete='complete' @clear='clear' @downloadFile='downloadFile' @upload='upload'></Toolbar>
  </div>
</template>

<script>
import MainCropView from '../crop-view/crop-view'
import Preview from '../preview/preview'
import Toolbar from '../toolbar/toolbar'
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
    },
    imageType: { // 生成图片的类型
      type: String,
      default: 'png'
    },
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
  data() {
    return {
    }
  },
  methods: {
    // 对外暴露的API方法
    // 下载裁剪后的文件
    downloadFile() {
      this.$refs.crop_view.save()
    },
    // 上传
    upload() {
      this.$refs.crop_view.upload()
    },
    // 清空
    clear() {
      this.$refs.crop_view.clear()
    },
    // 完成
    complete(name = 'image', type = 'file') {
      let params = {
        getFile: true,
        name,
        type
      }
      let file = this.$refs.crop_view.save(params)
      console.log(file)
      return file
    }
  }
}
</script>
<style lang='scss'>
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
</style>