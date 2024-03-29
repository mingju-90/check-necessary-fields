## 使用方法
```js
/**
 * 校验数据类型, 返回布尔值
 * @param {*} type 期望的数据类型
 * @param {*} data 需要被校验的数据
 * @returns {boolean}
 */
checkNecessaryFields(type, data)  // boolean
```

### 基本数据类型校验
- 字符串: 'string'。
- 数字: 'number', 'NaN', '-Infinity', 'Infinity', 日常使用中，指定数字类型，一般不希望为NaN等，所以做了更细致的类型区分。
- undefined: 'undefined'
- null: 'null'
- boolean: 'boolean'
- 联合基本数据类型: 'string | number | null', 将需要校验的数据类型通过 ｜ 分隔。
- 指定值: () => [1, '1', false, ''], 校验数据是否是指定的某个值。
- 制定字符串: 'str | name | 123', 校验数据是否为指定的字符串，将多个字符串通过 ｜ 分隔。

### 引用类型校验
- 基本类型数组: ['string'], 数组的类型为第一个元素定义的类型。
- 引用类型数组: [{name: 'string'}], [['string | number']], 第一个元素可以为对象或者数组。
- 联合类型数组: [() => [123, 'string', {name: 'string'}]], 数组中的每个元素可能是不同的类型，通过使用联合类型来定义。 


## 用例
### 基本类型
```js
checkNecessaryFields('string', 'src') // true
checkNecessaryFields('string', '') // true
checkNecessaryFields('string', '123') // true
checkNecessaryFields('number', '123') // false
checkNecessaryFields('number', 123) // true
checkNecessaryFields('number', 0) // true
checkNecessaryFields('number', NaN) // false
```

### 指定值和联合类型
```js
const Point = {
    type: 'Point',
    coordinates: ['number']
}
const Line = {
    type: 'Line'
    coordinates: [
        ['number']
    ]
}

// 点或者线
const PointAndLine = () => [Point, Line]

const point = {
    type: 'Point',
    coordinates: [100, 100]
}

checkNecessaryFields(Point, point) // true
checkNecessaryFields(PointAndLine, point) // true

// 修改点坐标的结构
point.coordinates = [
    [100, 100]
]
checkNecessaryFields(PointAndLine, point) // false

// 修改点的类型为line
point.type = 'Line'
// 先校验点的类型不通过，然后校验线的类型，通过
checkNecessaryFields(PointAndLine, point) // true


// 校验的值必须符合下面几个值
const list = () => [1, 2, '3', false]
checkNecessaryFields(list, 1) // true
checkNecessaryFields(list, '1') // false
checkNecessaryFields(list, '3') // true
checkNecessaryFields(list, '') // false
checkNecessaryFields(list, false) // true
```

### 复杂类型
```js
const peopleType = {
    name: 'string',
    age: 'number',
}
peopleType.friends = [peopleType]

const a = {
    name: 'a'
    age: 11,
    friends: [
        {name: 'b', age: 12, friends: []}
    ]
}

checkNecessaryFields(peopleType, a) // true

a.friends = undefined
checkNecessaryFields(peopleType, a) // false
```


# V2.0.0 版本更新
## 更新内容
- 更新使用方式
```js
// 一个参数，返回对应的校验函数，适合重复使用，使用柯里化保存了校验对象，不需要重复进行格式转换
const checkFn = checkNecessaryFields(checkType)
checkFn(data)

// 两个参数，返回校验结果
checkNecessaryFields(checkType, data)
```
- 调整了返回的结果，如果校验通过，返回 true，校验不通过，返回对应属性的路径，联合类型里面的路径不返回（处理太麻烦了）
```js
class People {
    name: any
    age: any
    friends: People[]
    constructor({name, age}) {
        this.name = name
        this.age = age
        this.friends = []
    }
}

const peopleType: People = {
    name: 'string',
    age: 'number',
    friends: []
}
peopleType.friends = [peopleType]


const peopleData = new People({name: 'a', age: 11})
const b = new People({name: 'b', age: 12})
const c = new People({name: 'c', age: 12})
const d = new People({name: 'd', age: '12'})

peopleData.friends.push(b, c, d)

checkNecessaryFields(peopleType, peopleData)  // ["friends", "2", "age"]
```

## 用例
### 基本类型
```js
checkNecessaryFields('string', 'src') // true
checkNecessaryFields('string', '') // true
checkNecessaryFields('string', '123') // true
checkNecessaryFields('number', '123') // []
checkNecessaryFields('number', 123) // true
checkNecessaryFields('number', 0) // true
checkNecessaryFields('number', NaN) // false
```