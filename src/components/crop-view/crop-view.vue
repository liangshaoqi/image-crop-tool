<template>
  <div class="crop-main-view" :style="getStyle">
    <div class="original-image-view" :style="getStyle">
      <!-- 裁剪实际操作区域 -->
      <div :style="originalImageStyle" class="crop-opreate-view" id='crop_opreate_view'>
        <img
          id="original-image"
          class="original-image"
          :style="originalImageStyle"
          v-show="originalImageBase64 !== ''"
          :src="originalImageBase64"
          alt="图片转化失败,请刷新重试"
          @load='imageLoad($event)'
        />
        <cropFrame></cropFrame>
      </div>
    </div>
  </div>
</template>

<script>
import cropFrame from '@/components/crop-frame/crop-frame'
import { mapState } from 'vuex'
import { calculateRatio, createPreview } from '@/utils/utils'
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
  inject: ['cropViewWidth', 'cropViewHeight'],
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
    imageLoad() {
      createPreview()
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