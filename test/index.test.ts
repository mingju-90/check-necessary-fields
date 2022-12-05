import checkNecessaryFields from '../src/index' 
import markData from './markData'




test('checkNecessaryFields: 基本数据类型', () => {
    expect(checkNecessaryFields('string', 'src')).toBe(true)
    expect(checkNecessaryFields('string', '')).toBe(true)
    expect(checkNecessaryFields('string', '123')).toBe(true)
    expect(checkNecessaryFields('number', '123')).toBe(false)
    expect(checkNecessaryFields('number', 123)).toBe(true)
    expect(checkNecessaryFields('number', 0)).toBe(true)
    expect(checkNecessaryFields('number', NaN)).toBe(false)
})


test('checkNecessaryFields: 字符串枚举值', () => {
  expect(checkNecessaryFields('a | b | c', 'a')).toBe(true)
  expect(checkNecessaryFields('a | b | c', 'd')).toBe(false)
})

test('checkNecessaryFields: 无效数字校验', () => {
  expect(checkNecessaryFields('number', 0)).toBe(true)
  expect(checkNecessaryFields('number', NaN)).toBe(false)
  expect(checkNecessaryFields('NaN', NaN)).toBe(true)
  expect(checkNecessaryFields('Infinity', Infinity)).toBe(true)
})


test('checkNecessaryFields: 字符串枚举值', () => {
  expect(checkNecessaryFields(() => [1, 3, '2', false], 'a')).toBe(false)
  expect(checkNecessaryFields(() => [1, 3, '2', false], '2')).toBe(true)
  expect(checkNecessaryFields(() => [1, 3, '2', false], '')).toBe(false)
  expect(checkNecessaryFields(() => [1, 3, '2', false], null)).toBe(false)
  expect(checkNecessaryFields(() => [1, 3, '2', false], null)).toBe(false)
  expect(checkNecessaryFields(() => [1, 3, '2', false], false)).toBe(true)
  expect(checkNecessaryFields(() => [1, 3, '2', false], 1)).toBe(true)
  expect(checkNecessaryFields(() => [1, 3, '2', false], '1')).toBe(false)
})

test('checkNecessaryFields: 复杂数据', () => {
    expect(checkNecessaryFields(markData.dataType, markData.data)).toBe(true)
})
