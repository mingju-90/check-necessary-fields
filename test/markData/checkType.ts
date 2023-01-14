/** 质检状态 */
const statusType = () => ["failed", "unqualified", "passed", "changed"];

/** 标注物类别 1:手动; 3: 自动框;*/
const modeType = () => [1, 3];

const ExtentPolygon = {
  type: "ExtentPolygon",
  coordinates: [["number"]],
  // keyPoint: ["number"],
};

const TiltRectangle = {
  type: "TiltRectangle",
  coordinates: [[["number"]]],
  keyPoint: () => [[], undefined],
};

const Square = {
  type: "Square",
  coordinates: [[["number"]]], // 有两个子元素的时候是环框 [[], []]
  lineType: ["string"],
  keyPoint: () => [[], undefined],
};

const LineString = {
  type: "LineString",
  coordinates: [["number"]],
  lineType: "string",
  keyPoint: () => [[], undefined],
};

const Polygon = {
  type: "Polygon",
  coordinates: [[["number"]]],
  lineType: ["string"],
  keyPoint: () => [[], undefined],
};

const Point = {
  type: "Point",
  coordinates: ["number"],
  keyPoint: () => [[], undefined],
};

const Circle = {
  type: "Circle",
  coordinates: ["number"],
  keyPoint: () => [[], undefined],
};

const Ellipse = {
  type: "Ellipse",
  coordinates: ['number'],
  keyPoint: () => [[], undefined]
}

const Trapezium = {
  type: "Trapezium",
  coordinates: [[['number']]],
  keyPoint: () => [[], undefined]
}

const geometry = () => [
  ExtentPolygon,
  TiltRectangle,
  Square,
  LineString,
  Polygon,
  Point,
  Circle,
  Ellipse,
  Trapezium
];

/** 目标质检状态 unfit:框不贴合; annotationObject:标注对象不符; other:其他 */
const targetType = () => ["unfit", "annotationObject", "other"];

/**
 * label 标签不符
 * string 具体属性字段
 */
const attributeType = () => ["label", "string"];



/** 属性内的质检信息 */
const quality = {
  qualityStatus: statusType,
  // TODO: otherError 和 other 为什么用两个字段
  errorType: {attributeError: [attributeType],targetError: [targetType]},
  changes: {
    attribute: [attributeType],
    target: [targetType],
    remark: "undefined | string",
  },
};

/** 物体属性 */
const properties = {
  id: "number",
  objectId: "number",
  content: {}, // 标签及属性对应的数据
  generateMode: modeType,
  labelColor: () => [undefined, ["number"]],
  isLeave: () => [false, undefined],
  // layerId: "number",
};

const mark = {
  type: "Feature", // 好像是固定的
  geometry: geometry,
  properties: properties, // 属性
  quality: () => [undefined, quality],
  title: "string | undefined",
};

/** 离开的物体数据 */
const leaveMark = {
  type: "Feature",
  properties: {
    id: "number",
    objectId: "number",
    isLeave: true,
  },
};


/** unfitExtent: 框不贴合; unfitLine: 线不贴合; unfitPoint: 点不贴合; attributeError: 属性错误; wrongMark: 标注对象不符; leakage: 漏标; other: 其他*/
const qualityError = () => ['unfitExtent', 'unfitLine', 'unfitPoint', 'attributeError', 'wrongMark', 'leakage', 'other', { other: "string" }]

/** 图形质检信息 */
const feature = {
  type: 'Feature',
  title: 'string',
  geometry: {
    // TODO: 质检物体信息需要确认
    type: 'point | Circle',
    coordinates: ['number']
  },
  properties: {
    id: 'number',
    objectId: 'number',
    errorType: [qualityError]
  },
  // 是否修改
  isModified: () => [undefined, true]
}

const qualityResult = {
  type: "FeatureCollection",
  features: () => [undefined, [feature]]
}

const frameQuality = {
  qualityStatus: statusType,
  errorResult: {
    errorType: [],
    other: "string",
  },
  changes: [],
}
const frame = {
  id: "number | undefined",
  isEffective: "1 | 0 | undefined", // 1 有效帧, 0 无效帧
  objects:  [() => [mark, leaveMark]],
//   objects: [() => [mark, leaveMark]],
  qualityResult: () => [undefined, qualityResult],
  quality: () => [undefined, frameQuality],
  info: () => [{}, undefined],
  result: () => [undefined, {}],
};

/** 标注结果数据结构 */
export const dataType = {
  markResult: {
    frames: [frame],
  },
};