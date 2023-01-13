import checkNecessaryFields from '../src/index' 
import {dataType} from './markData/checkType'
import {data as data1} from './markData/data1'
import {data as data2} from './markData/data2'
import {data as data3} from './markData/data3'




test('checkNecessaryFields: 复杂数据', () => {
    const checkMark = checkNecessaryFields(dataType)
    expect(checkMark(data1)).toEqual(["markResult", "frames", '0', "objects"])
    // expect(checkMark(data1)).toEqual(["markResult", "frames", '0', "objects", '1', "properties", "generateMode"])
    // expect(checkMark(data2)).toBe(Array)
    // expect(checkMark(data3)).toBe(false)
})
