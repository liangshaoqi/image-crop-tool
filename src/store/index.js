// import Vue from 'vue'
// import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    originalImage: {}, // 本地上传得到的文件对象
    originalImageBase64: '', // 原始文件base64对象
    cropImage: {}, // 裁剪得到的图片对象
    cropImageAttr: { // 图片原始属性
      scale: 1,
      width: 0,
      height: 0
    }
  },
  getters: {},
  mutations: {
    // 设置原始base64图片数据
    setOriginalImageBase64(state, data) {
      state.originalImageBase64 = data
    },
    // 清空所有图片
    clearAllImage(state) {
      state.originalImageBase64 = ''
    },
    setCropImageAttr(state, attrObj) {
      state.cropImageAttr = {
        ...state.cropImageAttr,
        ...attrObj
      }
    }
  },
  // 异步操作
  actions: {}
})