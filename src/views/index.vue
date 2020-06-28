<template>
  <div class="views">
    <Crop></Crop>
  </div>
</template>

<script>
import Crop from '../components/crop/crop.vue'
export default {
  components: {
    Crop
  },
  data () {
    return {
    }
  },
  methods: {}
}
</script>
<style lang='scss'>
  .views {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #ec7259;
  }
</style>