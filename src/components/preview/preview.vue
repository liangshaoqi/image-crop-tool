<template>
  <div class="preview-view">
    <p>预览:</p>
    <div class="no-preview">
      无预览
    </div>
    <div class="preview" v-show="originalImageBase64 != ''">
      <div class="square" :style="getStyle">
        <canvas v-if="ratio > 1" :width="previewUtinPx" :height="ratio * previewUtinPx" id='preview_square'>浏览器不支持canvas</canvas>
        <canvas v-if="ratio <= 1" :width="ratio * previewUtinPx" :height="previewUtinPx" id='preview_square'>浏览器不支持canvas</canvas>
      </div>
      <!-- <div class="circle">
        <canvas id='preview_circle'>浏览器不支持canvas</canvas>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      "originalImageBase64": 'originalImageBase64'
    }),
    getStyle: function() {
      console.log(this.originalImageBase64 == '')
      let style = ''
      let width = 0
      let height = 0
      if (this.ratio > 1) { // 定宽
        width = this.previewUtinPx
        height = this.ratio * this.previewUtinPx
      } else { // 定高
        width = this.ratio * this.previewUtinPx
        height = this.previewUtinPx
      }
      style += 'width: ' + width + 'px;'
      style += 'height: ' + height + 'px;'
      return style
    },
  },
  inject: ['width', 'height', 'ratio', 'previewUtinPx'],
  methods: {
  }
}
</script>
<style lang='scss'>
  .preview-view {
    min-width: 210px;
    .no-preview {
      text-align: center;
      font-size: 14px;
      color: #000;
    }
    p {
      font-size: 18px;
      color: #777;
    }
    .preview {
      display: flex;
      justify-content: center;
      .square {
        // width: 210px;
        // height: 140px;
        background: #ccc;
        margin: 15px 0;
        canvas {
        }
      }
      .circle {
        margin: 0 auto;
        border-radius: 50%;
        background: #ccc;
        width: 140px;
        height: 140px;
      }
    }
  }
</style>