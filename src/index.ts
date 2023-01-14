import getType from "./getType";


interface ITransformationType {
    key: string
    type: string | unknown[]
    value?: ITransformationType[] | ITransformationType
}

const transformationType = (data: any, key = "", map = new Map()): ITransformationType => {
    if (typeof data === "object" && map.has(data)) return map.get(data);
    const result: ITransformationType = { key, type: "" };
    map.set(data, result);
    const type = getType(data);
    if (type === "string") {
        result.type = data.split("|").map((item: string) => item.trim());
    } else if (type === "object") {
        result.type = "object";
        result.value = Object.keys(data).map((key) => {
            return transformationType(data[key], key, map);
        });
    } else if (type === "array") {
        result.type = "array";
        result.value = data[0]
            ? transformationType(data[0], "", map)
            : undefined;
    } else if (type === "function") {
        const functionResult = data();
        result.type = "union";
        result.value = functionResult.map((item: any) => {
            return transformationType(item, "", map);
        });
    } else {
        result.type = [data];
    }

    return result;
};



interface ICheckArgs {
    checkData: ITransformationType
    data: any
    errorKey?: any
    error: any[]
}
// TODO: 循环引用数据校验优化
const check = ({ checkData, data, errorKey, error }: ICheckArgs): any => {
    const dataType = getType(data);
    // 如果是 type 是数组, 代表 data 应该是基础数据类型, 直接判断

    let result = false;
    if (getType(checkData.type) === "array") {
        result = checkData.type.includes(dataType) || checkData.type.includes(data);
    } else if (checkData.type === "union") {
        result = (checkData.value as ITransformationType[]).some((item) => check({ checkData: item, data, error: [], errorKey: null }));
    } else if (checkData.type !== dataType) {
        return false;
    } else if (dataType === "object") {
        result = (checkData.value as ITransformationType[]).every((item, index) => check({ checkData: item, data: data[item.key], errorKey: `${index}`, error }));
    } else if (dataType === "array") {
        result = checkData.value
            ? data.every((item: any, index: number) => check({ checkData: checkData.value as ITransformationType, data: item, errorKey: `${index}`, error }))
            : true;
    }
    if (!result && errorKey !== null) {
        error.push(!checkData.key ? errorKey : checkData.key)
    }
    return result;
};



/**
 * 校验数据类型, 一个参数, 返回校验这个类型的方法, 如果两个参数, 返回校验结果
 * @param {*} type 期望的数据类型
 * @param {*} data 需要被校验的数据
 */


type ICheckFnResult = true | string[]
type ICheckFn = (data: any) => ICheckFnResult


function checkNecessaryFields(type: any): ICheckFn
function checkNecessaryFields(type: any, data: any): ICheckFnResult
function checkNecessaryFields(type: any, data?: any) {
    const checkData = transformationType(type);

    const fn: ICheckFn = (data: any) => {
        const error: string[] = []
        const result = check({ checkData, data, error, errorKey: null })
        return result || error.reverse();
    }
    if(arguments.length < 1) throw new Error('至少需要一个参数, 作为判断的类型')
    // 如果两个参数， 执行校验结果， 一个参数，返回对应的校验函数
    return arguments.length > 1 ? fn(data) : fn
}


export default checkNecessaryFields
