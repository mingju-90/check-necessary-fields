import checkNecessaryFields from '../src/index' 
import markData from './markData'
import people from './people'




test('checkNecessaryFields: 复杂数据', () => {
    expect(checkNecessaryFields(markData.dataType, markData.data)).toBe(true)
})
