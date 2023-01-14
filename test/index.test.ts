import checkNecessaryFields from '../src/index' 
import {dataType} from './markData/checkType'
import {data as data1} from './markData/data1'
import {data as data2} from './markData/data2'
import {data as data3} from './markData/data3'

import people from './people'




test('checkNecessaryFields: 复杂数据', () => {
    const checkFn = checkNecessaryFields(dataType)
    expect(checkFn(data1)).toEqual(["markResult", "frames", '0', "objects", '1'])
    expect(checkNecessaryFields(dataType, data1)).toEqual(["markResult", "frames", '0', "objects", '1'])


    expect(checkNecessaryFields(dataType, data2)).toBe(true)

    expect(checkNecessaryFields(dataType, data3)).toEqual(["markResult", "frames", "0", "objects", '0'])

    expect(checkNecessaryFields(people.peopleType, people.peopleData)).toEqual(["friends", "2", "age"])
})

test('checkNecessaryFields: 基本数据类型', () => {
    expect(checkNecessaryFields('string', 'src')).toBe(true)
    expect(checkNecessaryFields('string', '')).toBe(true)
    expect(checkNecessaryFields('string', '123')).toBe(true)
    expect(checkNecessaryFields('number', 123)).toBe(true)
    expect(checkNecessaryFields('string', 123)).toEqual([])
    expect(checkNecessaryFields('number', 0)).toBe(true)
    expect(checkNecessaryFields('number', NaN)).toEqual([])
    expect(checkNecessaryFields('undefined', undefined)).toBe(true)
    
})
