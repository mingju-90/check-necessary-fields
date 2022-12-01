const afterFn = (
  target: (...args: any[]) => string,
  after: (result: string, ...args: any[]) => string
) => {
  return (...args: any[]) => {
    const result = target(...args);
    return after(result, ...args);
  };
};

/** 如果 type 为 number 类型，进行更精确的类型判断 */
const numberType = (type: string, data: unknown) => {
  if (type !== "number") return type;
  if (Number.isNaN(data)) return "NaN";
  if ((data as number) > Number.MAX_SAFE_INTEGER) return "Infinity";
  if ((data as number) < Number.MIN_SAFE_INTEGER) return "-Infinity";
  return type;
};

let getType = (data: any): string => {
  const matchArray = Object.prototype.toString
  .call(data)
  .match(/\[object (.*)\]/) as RegExpMatchArray
  return matchArray[1].toLocaleLowerCase()
}
  

getType = afterFn(getType, numberType);

export default getType;
