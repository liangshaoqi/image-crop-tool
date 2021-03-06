# 文档

## 项目截图

### 截图1
![示例](src/assets/example1.png)

### 截图2
![示例](src/assets/example2.png)

### 动图演示(LICEcap软件制作的动图)
![示例](src/assets/example_gif.gif)

## 浏览器兼容性
ie 11,edge,其他主流浏览器

## 项目安装
```
npm install
```

## 项目运行
```
npm run start
```

## 打包
```
npm run build
```

## 参数(props)
| 名称 | 类型 | 默认值 | 说明 |
|----|----|----|----|
| width | Number | 210 | 裁剪后生成图片的宽,单位(px) |
| height | Number | 140 | 裁剪后生成图片的高,单位(px) |
| cropViewWidth | Number | 770 | 裁剪操作区域的宽,单位(px) |
| cropViewHeight | Number | 520 | 裁剪操作区域的高,单位(px) |
| previewUtinPx | Number | 200 | 预览视图的单位展示像素,该视图的最终宽width=width(裁剪后生成图片的宽) / height(裁剪后生成图片的高) * previewUtinPx,高同理 |
| imageType | String | png | 裁剪生成的图片类型,可选项为:png/jpg |

## 方法(methods)
| 名称 | 参数 | 默认值 | 说明 |
| -- |-- | -- | -- |
| downloadFile | 暂无 |  |  下载裁剪过后的图片 |
| upload | 暂无 |  | 上传本地图片到裁剪区域 |
| clear | 暂无 |  | 清除正在裁剪的图片和预览区域 |
| complete | fileName, type | fileName='image', type = 'file' | 返回裁剪后的图片对象(File类型),文件名默认为'image', 生成的图片类型type,默认为file,可选(file/base64) |


