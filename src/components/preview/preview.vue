<template>
  <div class="preview-view">
    <p>预览:</p>
    <div class="no-preview">
      无预览
    </div>
    <div class="preview">
      <div class="square"></div>
      <div class="circle"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    
  },
  data () {
    return {
    }
  },
  methods: {}
}
</script>
<style lang='scss'>
  .preview-view {
    width: 210px;
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
      .square {
        width: 210px;
        height: 140px;
        background: #ccc;
        margin: 15px 0;
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