<template>
  <div class="toolbar-view">
    <div class="toolbar">
      <div class="scale toolbar-item">
        <span @click="scale('-')" class='iconfont iconGroup-1' title="缩小"></span>
        <span class="scale-number">{{scaleNumber}}</span>
        <span class="scale-percent">%</span>
        <span @click="scale('+')" class='iconfont iconGroup-' title="放大"></span>
      </div>
      <span class="toolbar-item iconfont iconshangchuan" title="上传"></span>
      <span class="toolbar-item iconfont iconbaocun" title="保存"></span>
      <span class="toolbar-item iconfont iconquxiao1" title="清空"></span>
      <span class="toolbar-item iconfont iconwancheng" title="完成"></span>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      scaleNumber: 100
    }
  },
  methods: {
    scale(type) {
      if (type == '-') {
        this.scaleNumber -= 10
      } else {
        this.scaleNumber += 10
      }
    },
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