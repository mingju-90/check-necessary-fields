import getType from "./getType";


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


// TODO: 循环引用数据校验优化
const check = (checkData: ITransformationType, data: any): boolean => {
  const dataType = getType(data);
  // 如果是 type 是数组, 代表 data 应该是基础数据类型, 直接判断

  let result = false;
  if (getType(checkData.type) === "array") {
    result = checkData.type.includes(dataType) || checkData.type.includes(data);
  } else if (checkData.type === "union") {
    result = (checkData.value as ITransformationType[]).some((item) => check(item, data));
  } else if (checkData.type !== dataType) {
    return false;
  } else if (dataType === "object") {
    result = (checkData.value as ITransformationType[]).every((item) => check(item, data[item.key]));
  } else if (dataType === "array") {
    result = checkData.value
      ? data.every((item: any) => check(checkData.value as ITransformationType, item))
      : true;
  }
  
  return result;
};

/**
 * 校验数据类型
 * @param {*} type 期望的数据类型
 * @param {*} data 需要被校验的数据
 */
const checkNecessaryFields = (type: any, data: any) => {
  const typeData = transformationType(type);
  return check(typeData, data);
};



export default checkNecessaryFields



