/* eslint-disable no-unused-vars */
/**
 * base64转为file文件对象
 * @export
 * @param {*} dataurl base64字符串
 * @param {string} [filename='upload'] 文件名
 * @returns File
 */
export function base64ToFile (dataurl, filename = 'upload') {
  var arr = dataurl.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
}
/**
 * 本地图片文件转base64 并返回
 *
 * @export
 * @param {*} imageFile
 * @returns { Object } 包括图片原始宽高和base64串
 */
export function fileToBase64(imageFile) {
  let reader = new FileReader()
  reader.readAsDataURL(imageFile)
  return new Promise((resolve) => {
    reader.onload = () => {
      let img = new Image()
      img.src = reader.result
      img.onload = () => {
        let width = img.width
        let height = img.height
        let reresolveObj = {
          width,
          height,
          result: reader.result
        }
        resolve(reresolveObj)
      }
    }
  })
}
/**
 * 计算图片在容器中缩放比例
 * @export
 * @param {*} containerWidth 容器宽
 * @param {*} containerHeight 容器高
 * @param {*} imgWidth IMG实际宽
 * @param {*} imgHeight IMG实际高
 * @returns {Object} width: IMG缩放后的宽, height: IMG缩放后的高
 */
export function calculateRatio(containerWidth, containerHeight, imgWidth, imgHeight) {
  let containerRatio = containerWidth / containerHeight // 容器比例
  let imgRatio = imgWidth / imgHeight // 图片比例
  // 根据宽或者高属性来设置图片
  let setSize = (attribute) => {
    if (attribute === 'width') {
      imgWidth = containerWidth
      imgHeight = containerWidth / imgRatio
    } else {
      imgHeight = containerHeight
      imgWidth = containerHeight * imgRatio
    }
  }
  if (imgRatio > containerRatio) {
    // 图片宽高比例大于容器比例
    if (imgRatio >= 1) {
      setSize('width')
    } else { // 以高为基准
      setSize('height')
    }
  } else if (imgRatio < containerRatio) {
    // 图片宽高比例小于容器比例
    if (imgRatio < 1) {
      setSize('height')
    } else { // 以高为基准
      setSize('width')
    }
  } else {
    // 全屏占满
    imgWidth = containerWidth
    imgHeight = containerHeight
  }
  return {
    width: imgWidth,
    height: imgHeight
  }
}