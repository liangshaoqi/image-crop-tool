<template>
  <div class="crop-container">
    <Crop ref="crop" :width='200' :height='200'></Crop>
  </div>
</template>

<script>
import Crop from '../components/crop/crop'
export default {
  components: {
    Crop
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang='scss'>
  .crop-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: Gainsboro;
  }
</style>