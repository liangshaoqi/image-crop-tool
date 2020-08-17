// 方法单元测试
import { expect } from 'chai'
import { decimalsToFractional } from '@/utils/utils.js'

describe('公共方法测试', () => {
  it('小数转分数', () => {
    let decimals = 1.5
    expect(decimalsToFractional(decimals).constructor === Array).to.be.ok
  })
})