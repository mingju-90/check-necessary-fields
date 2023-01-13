import getType from "./getType";

const error: string[] = []
interface ITransformationType  {
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





interface CheckArgs {
  checkData: ITransformationType
  data: any
  errorKey?: any
  // error: string[]
}
// TODO: 循环引用数据校验优化
// const check = (checkData: ITransformationType, data: any, errorKey: any = null): any => {
  const check = ({checkData, data, errorKey}: CheckArgs): any => {
  const dataType = getType(data);
  // 如果是 type 是数组, 代表 data 应该是基础数据类型, 直接判断

  let result = false;
  if (getType(checkData.type) === "array") {
    result = checkData.type.includes(dataType) || checkData.type.includes(data);
  } else if (checkData.type === "union") {
    result = (checkData.value as ITransformationType[]).some((item) => check({checkData: item, data, errorKey: null}));
  } else if (checkData.type !== dataType) {
    return false;
  } else if (dataType === "object") {
    result = (checkData.value as ITransformationType[]).every((item, index) => check({checkData: item, data: data[item.key], errorKey: `${index}`}));
  } else if (dataType === "array") {
    result = checkData.value
      ? data.every((item: any, index: number) => check({checkData: checkData.value as ITransformationType, data: item, errorKey: `${index}`}))
      : true;
  }
  if(!result && errorKey !== null) {
    // console.log(checkData, errorKey)
    error.push(!checkData.key ? errorKey : checkData.key)
  }
  return result;
};

/**
 * 校验数据类型
 * @param {*} type 期望的数据类型
 * @param {*} data 需要被校验的数据
 */
const checkNecessaryFields = (type: any) => {
  const checkData = transformationType(type);
  return (data: any) => {
    
    const result = check({checkData, data, errorKey: null})
    if(!result) console.log(error.reverse())
    return result || error.reverse();
  }
};



export default checkNecessaryFields


