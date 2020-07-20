# 文档

## 项目截图
![示例](src/assets/example.png)

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

## 方法(methods),正在完善中,暂时不能使用
| 名称 | 参数 | 说明 |
| -- |-- | -- |
| save | 暂无 | 下载裁剪过后的图片 |
| upload | 暂无 | 上传本地图片到裁剪区域 |
| clearAll | 暂无 | 清除正在裁剪的图片和预览区域 |
| complete | 暂无 | 完成功能 |
| scale | 暂无 | 放大和缩小正在裁剪的图片 |

