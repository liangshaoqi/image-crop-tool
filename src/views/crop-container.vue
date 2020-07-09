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
  components: {
    MainCropView,
    Preview,
    Toolbar
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
      width: 1100px;
      height: 600px;
      padding: 40px 0 0 50px;
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