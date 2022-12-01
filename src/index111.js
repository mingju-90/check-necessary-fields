let getType = (data) =>
  Object.prototype.toString
    .call(data)
    .match(/\[object (.*)\]/)[1]
    .toLocaleLowerCase();

const numberType = (type, data) => {
  if (type !== "number") return type;
  if (Number.isNaN(data)) return "NaN";
  if (data > Number.MAX_SAFE_INTEGER) return "Infinity";
  if (data < Number.MIN_SAFE_INTEGER) return "-Infinity";
  return type;
};

const afterFn = (target, after) => {
  return (...args) => {
    const result = target(...args);
    return after(result, ...args);
  };
};

getType = afterFn(getType, numberType);

const transformationType = (data, key = "", map = new Map()) => {
  if (map.has(data)) return map.get(data);
  const result = { key, type: "" };
  map.set(data, result);
  const type = getType(data);
  if (type === "string") {
    result.type = data.split("|").map((item) => item.trim());
  } else if (type === "object") {
    result.type = "object";
    result.value = Object.keys(data).map((key) => {
      return transformationType(data[key], key, map);
    });
  } else if (type === "array") {
    result.type = "array";
    result.value = data[0] ? transformationType(data[0], "", map) : undefined;
  } else if (type === "function") {
    const functionResult = data();
    result.type = "union";
    result.value = functionResult.map((item) => {
      return transformationType(item, "", map);
    });
  } else {
    result.type = [data];
  }

  return result;
};

/**
 * 校验数据类型
 * @param {*} type 期望的数据类型
 * @param {*} data 需要被校验的数据
 */
const checkNecessaryFields = (type, data) => {
  const typeData = transformationType(type);
  return check(typeData, data);
};

const check = (checkData, data) => {
  const dataType = getType(data);
  // 如果是 type 是数组, 代表 data 应该是基础数据类型, 直接判断

  let result = false;
  if (getType(checkData.type) === "array") {
    result = checkData.type.includes(dataType) || checkData.type.includes(data);
  } else if (checkData.type === "union") {
    result = checkData.value.some((item) => check(item, data));
  } else if (checkData.type !== dataType) {
    console.warn(checkData, data)
    return false;
  } else if (dataType === "object") {
    result = checkData.value.every((item) => check(item, data[item.key]));
  } else if (dataType === "array") {
    result = checkData.value
      ? data.every((item) => check(checkData.value, item))
      : true;
  }
  if(result) console.warn(checkData, data)
  return result;
};

export default checkNecessaryFields;
