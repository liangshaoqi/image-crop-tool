/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/**
 * base64转为file文件对象
 * @export
 * @param {*} dataurl base64字符串
 * @param {string} [filename='downloadImage'] 文件名
 * @returns File
 */
export function base64ToFile (dataurl, filename = 'downloadImage') {
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
  // 容器比例和图片比例相等
  if (containerRatio === imgRatio) {
    imgWidth = containerWidth
    imgHeight = containerHeight
  }
  // 容器比例大于等于1
  if (containerRatio >= 1) {
    if (imgRatio >= containerRatio) {
      // 以宽为基准
      setSize('width')
    } else {
      setSize('height')
    }
  }
  // 容器比例小于1
  if (containerRatio < 1) {
    if (imgRatio >= containerRatio) {
      setSize('width')
    }
    if (imgRatio < containerRatio) {
      setSize('height')
    }
  }
  return {
    width: imgWidth,
    height: imgHeight
  }
}
/**
 * 生成预览区域
 *
 * @export
 * @param {Object} data
 * @param {String} canvasId
 * @param {String} imageId
 */
export function createPreview(data, canvasId, imageId) {
  let canvas = document.getElementById('preview_square')
  let canvasWidth = canvas.width
  let canvasheight = canvas.height
  let ctx = canvas.getContext('2d')
  let image = document.getElementById('original-image')
  // 图片原始信息
  let naturalWidth = image.naturalWidth
  let naturalHeight = image.naturalHeight
  let ratioX = naturalWidth / image.width
  let ratioY = naturalHeight / image.height
  if (data) {
    ctx.drawImage(image, data.left * ratioX, data.top * ratioY, data.width * ratioX, data.height * ratioY, 0, 0, canvasWidth, canvasheight)
  } else {
    ctx.drawImage(image, 0, 0, canvasWidth * ratioX, canvasWidth * ratioY, 0, 0, canvasWidth, canvasheight)
  }
}
/**
* 裁剪框移动和缩小放大的区域限制
* @params { Object } clipNode 裁剪框节点对象
* @params { Object } limitNode 限制范围的节点对象
* @returns { Object } 范围定位
**/
export function clipRangeData(clipNode, limitNode) {
 // 限制裁剪框移动的节点信息
 let limitNodeWidth = limitNode.offsetWidth
 let limitNodeHeight = limitNode.offsetHeight
 let limitNodeLeft = limitNode.offsetLeft
 let limitNodeTop = limitNode.offsetTop
 // 裁剪框节点信息
 let clipNodeWidth = clipNode.offsetWidth
 let clipNodeHeight = clipNode.offsetHeight
 let clipNodeLeft = clipNode.offsetLeft
 let clipNodeTop = clipNode.offsetTop
 // 最终返回的范围
 let range = {}
 // 移动过程区域
 if (clipNodeLeft <= 0) {
   range.left = 0
 } else {
   range.left = clipNodeLeft
 }
 if (clipNodeTop < 0) {
   range.top = 0
 } else {
   range.top = clipNodeTop
 }
 return range
}
export function clearImage(id) {
  let canvas = document.getElementById('preview_square')
  
  let ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}
/**
 * 小数转分数,小数点两位
 *
 * @export
 * @param {*} decimals
 * @returns {Array} 数组第一项代表分母,第二项代表分子
 */
export function decimalsToFractional(decimals){
  const formatDecimals = decimals.toFixed(2)
  let denominator = 100 //初始化分母
  let numerator  = formatDecimals * 100 //初始化分子
  let bigger = 0
  function  recursion (){
      bigger = denominator > numerator ? denominator : numerator
      for(let i = bigger; i > 1; i--){
          if(
              Number.isInteger(numerator/i)
              && Number.isInteger(denominator/i)){
              numerator=numerator/i
              denominator=denominator/i
              recursion()
          }
      }
  }
  recursion()
  return [numerator, denominator]
}
/**
 * 将canvas转为图片并下载
 *
 * @export
 * @param { Object } canvas 
 * @param {string} name 下载文件名称
 */
export function downloadUrl(canvas, name) {
  // 网上说是ie10+因为base64太长,所以转成blob
  if (navigator.msSaveBlob) { // IE10 +,edge
    let blob = canvas.msToBlob()
    navigator.msSaveBlob(blob, name)
  } else {
    let src = canvas.toDataURL('image/png', 1)
    let link = document.createElement('a')
    link.download = name
    link.href = src
    document.body.appendChild(link)
    if (link.click) {
      link.click()
    } else {
      let event = document.createEvent('MouseEvents')
      event.initMouseEvent('click', true, true, window)
      link.dispatchEvent(event)
    }
    document.body.removeChild(link)
  }
}
/**
 * 重置裁剪框到限制容器的(0, 0)位置
 *
 * @export
 * @param {String} id 裁剪框id
 */
export function resetCropPosition(id) {
  let crop = document.getElementById(id)
  if (crop === null) return
  crop.style.top = '0px'
  crop.style.left = '0px'
}