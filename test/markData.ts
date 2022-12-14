/** 目标质检状态 unfit:框不贴合; annotationObject:标注对象不符; other:其他 */
const targetType = () => ["unfit", "annotationObject", "other"];

/**
 * label 标签不符
 * string 具体属性字段
 */
const attributeType = () => ["label", "string"];

/** 质检状态 */
const statusType = () => ["failed", "unqualified", "passed", "changed"];

/** 属性内的质检信息 */
const qualityType = {
  errorType: {
    attributeError: [attributeType],
    targetError: [targetType],
    otherError: "string",
  },
  changes: {
    attribute: [attributeType],
    target: [targetType],
  },
  qualityStatus: statusType,
};

/** 标注物类别 1:手动; 2: 预识别; 3: 自动框; 4:复制框*/
const modeType = () => [1, 2, 3, 4];

/** 图形类型 */
const geometryType = () => [
  "ExtentPolygon",
  "TiltRectangle",
  "Square",
  "LineString",
  "Polygon",
  "Point",
  "Circle",
  "Ellipse",
  "Trapezium",
];

/** unfitExtent: 框不贴合; unfitLine: 线不贴合; unfitPoint: 点不贴合; attributeError: 属性错误; wrongMark: 标注对象不符; leakage: 漏标; other: 其他*/
const qualityError = () => [
  "unfitExtent",
  "unfitLine",
  "unfitPoint",
  "attributeError",
  "wrongMark",
  "leakage",
  "other",
  { other: "string" },
];

/** 图形质检信息 */
const quality = {
  type: "string",
  title: "string",
  geometry: {
    type: "point",
    //   type: "string",
    coordinates: ["number"],
  },
  properties: {
    id: "number",
    objectId: "number",
    errorType: [qualityError],
  },
  // 是否修改
  isModified: () => [undefined, true],
};

/** 标注结果数据结构 */
export const dataType = {
  // 图形质检数据
  qualityResult: {
    type: "string",
    features: [quality],
  },
  // 标注物数据
  markResult: {
    type: "string",
    features: [
      {
        title: "string",
        type: "string",
        // 属性
        properties: {
          objectId: "number",
          id: "number",
          layerId: "number",
          content: {},
          ocrContent: {},
          generateMode: modeType,
          quality: qualityType,
          labelColor: ["number"],
          // area: 'number'
          area: () => ["number", "undefined"], // 面积 线条，点没有
        },
        // 物体
        geometry: {
          type: geometryType, // 类型
          coordinates: [], // 坐标
          keyPoint: () => ["undefined", ["number"]], // 关键点索引
          lineType: () => ["undefined", ["string"], "string"], // 四方形，多边形为字符串数组， 线条为字符串
        },
      },
    ],
  },
};

export const data = {
  qualityResult: {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "point",
          coordinates: [351.87499999999994, 151.24999999999994],
        },
        properties: {
          id: 1,
          errorType: ["unfitExtent", { other: "" }],
          objectId: 1,
        },
        isModified: true,
        title: "框不贴合\\n",
      },
      {
        type: "Feature",
        geometry: {
          type: "point",
          coordinates: [246.87499999999994, 184.99999999999994],
        },
        properties: {
          id: 2,
          errorType: ["unfitLine", { other: "" }],
          objectId: 2,
        },
        isModified: true,
        title: "线不贴合\\n",
      },
      {
        type: "Feature",
        geometry: {
          type: "point",
          coordinates: [296.87499999999994, 222.49999999999994],
        },
        properties: {
          id: 3,
          errorType: ["unfitPoint", { other: "" }],
          objectId: 3,
        },
        isModified: true,
        title: "点不贴合\\n",
      },
      {
        type: "Feature",
        geometry: {
          type: "point",
          coordinates: [379.37499999999994, 258.74999999999994],
        },
        properties: {
          id: 4,
          errorType: ["attributeError", { other: "" }],
          objectId: 4,
        },
        isModified: true,
        title: "属性错误\\n",
      },
      {
        type: "Feature",
        geometry: {
          type: "point",
          coordinates: [258.12499999999994, 303.74999999999994],
        },
        properties: {
          id: 5,
          errorType: ["wrongMark", { other: "" }],
          objectId: 5,
        },
        isModified: true,
        title: "标注对象不符\\n",
      },
      {
        type: "Feature",
        geometry: {
          type: "point",
          coordinates: [343.12499999999994, 341.24999999999994],
        },
        properties: {
          id: 6,
          errorType: ["leakage", { other: "" }],
          objectId: 6,
        },
        isModified: true,
        title: "漏标\\n",
      },
      {
        type: "Feature",
        geometry: {
          type: "point",
          coordinates: [253.12499999999994, 379.99999999999994],
        },
        properties: {
          id: 7,
          errorType: ["other", { other: "123" }],
          objectId: 7,
        },
        isModified: true,
        title: "123",
      },
      {
        type: "Feature",
        geometry: {
          type: "point",
          coordinates: [529.375, 136.24999999999994],
        },
        properties: {
          id: 8,
          errorType: [
            "unfitExtent",
            "unfitPoint",
            "attributeError",
            "wrongMark",
            "leakage",
            { other: "" },
          ],
          objectId: 8,
        },
        isModified: true,
        title: "框不贴合\\n点不贴合\\n属性错误\\n标注对象不符\\n漏标\\n",
      },
      {
        type: "Feature",
        geometry: {
          type: "point",
          coordinates: [583.125, 252.49999999999994],
        },
        properties: {
          id: 9,
          errorType: [
            "unfitExtent",
            "unfitLine",
            "attributeError",
            "other",
            { other: "1233" },
          ],
          objectId: 9,
        },
        isModified: true,
        title: "框不贴合\\n线不贴合\\n属性错误\\n1233",
      },
    ],
  },
  markResult: {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          objectId: 1,
          id: 1,
          layerId: 1,
          content: { label: "zaqizaba", kache: "2" },
          ocrContent: {},
          generateMode: 1,
          quality: {
            errorType: {
              attributeError: [],
              targetError: [],
              otherError: "",
            },
            changes: { attribute: [], target: ["unfit"] },
            qualityStatus: "changed",
          },
          labelColor: [251, 0, 255],
          area: 2576,
        },
        title: "1_1_杂七杂八",
        geometry: {
          type: "ExtentPolygon",
          coordinates: [
            [29.5, 32.5],
            [85.5, 32.5],
            [85.5, 78.5],
            [29.5, 78.5],
            [29.5, 32.5],
          ],
          keyPoint: [],
        },
      },
      {
        type: "Feature",
        properties: {
          objectId: 2,
          id: 2,
          layerId: 2,
          content: { label: "zaqizaba", kache: "2" },
          ocrContent: {},
          generateMode: 1,
          quality: {
            errorType: {
              attributeError: [],
              targetError: [],
              otherError: "",
            },
            changes: { attribute: [], target: ["annotationObject"] },
            qualityStatus: "changed",
          },
          labelColor: [251, 0, 255],
          area: 1511.6305639033621,
        },
        title: "2_2_杂七杂八",
        geometry: {
          type: "TiltRectangle",
          coordinates: [
            [
              [23.5, 96.5],
              [71.5, 100.5],
              [69.32284402384599, 126.6258717138481],
              [21.322844023845988, 122.6258717138481],
              [23.5, 96.5],
            ],
          ],
          keyPoint: [],
        },
      },
      {
        type: "Feature",
        properties: {
          objectId: 3,
          id: 3,
          layerId: 3,
          content: { label: "zaqizaba", kache: "2" },
          ocrContent: {},
          generateMode: 1,
          quality: {
            errorType: {
              attributeError: [],
              targetError: [],
              otherError: "123",
            },
            changes: { attribute: [], target: ["other"] },
            qualityStatus: "changed",
          },
          labelColor: [251, 0, 255],
          area: 2242,
        },
        title: "3_3_杂七杂八",
        geometry: {
          type: "Square",
          coordinates: [
            [
              [28.5, 160.5],
              [83.5, 162.5],
              [87.5, 198.5],
              [42.5, 183.5],
              [28.5, 160.5],
            ],
          ],
          lineType: ["LLLLL"],
          keyPoint: [],
        },
      },
      {
        type: "Feature",
        properties: {
          objectId: 4,
          id: 4,
          layerId: 4,
          content: { label: "zaqizaba", kache: "2" },
          ocrContent: {},
          generateMode: 1,
          quality: {
            errorType: {
              attributeError: ["label"],
              targetError: [],
              otherError: "",
            },
            changes: { attribute: [], target: [] },
            qualityStatus: "failed",
          },
          labelColor: [251, 0, 255],
        },
        title: "4_4_杂七杂八",
        geometry: {
          type: "LineString",
          coordinates: [
            [37.5, 213.5],
            [80.5, 213.5],
            [100.5, 239.5],
            [60.5, 257.5],
            [29.5, 243.5],
          ],
          lineType: "LLLLL",
          keyPoint: [],
        },
      },
      {
        type: "Feature",
        properties: {
          objectId: 5,
          id: 5,
          layerId: 5,
          content: { label: "zaqizaba", kache: "1" },
          ocrContent: {},
          generateMode: 1,
          quality: {
            errorType: {
              attributeError: [],
              targetError: [],
              otherError: "",
            },
            changes: { attribute: ["kache"], target: [] },
            qualityStatus: "changed",
          },
          labelColor: [251, 0, 255],
          area: 2772,
        },
        title: "5_5_杂七杂八",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [34.5, 278.5],
              [88.5, 278.5],
              [79.5, 320.5],
              [22.5, 314.5],
              [40.5, 297.5],
              [34.5, 278.5],
            ],
          ],
          lineType: ["LLLLLL"],
          keyPoint: [],
        },
      },
      {
        type: "Feature",
        properties: {
          objectId: 6,
          id: 6,
          layerId: 6,
          content: { label: "zaqizaba", kache: "2" },
          ocrContent: {},
          generateMode: 1,
          quality: {
            errorType: {
              attributeError: [],
              targetError: [],
              otherError: "",
            },
            changes: { attribute: [], target: [] },
            qualityStatus: "unqualified",
          },
          labelColor: [251, 0, 255],
        },
        title: "6_6_杂七杂八",
        geometry: {
          type: "Point",
          coordinates: [45.5, 351.5],
          keyPoint: [],
        },
      },
      {
        type: "Feature",
        properties: {
          objectId: 7,
          id: 7,
          layerId: 7,
          content: { label: "zaqizaba", kache: "2" },
          ocrContent: {},
          generateMode: 1,
          quality: {
            errorType: {
              attributeError: [],
              targetError: [],
              otherError: "",
            },
            changes: { attribute: [], target: [] },
            qualityStatus: "passed",
          },
          labelColor: [251, 0, 255],
          area: 2019.9999999999993,
        },
        title: "7_7_杂七杂八",
        geometry: {
          type: "Circle",
          coordinates: [35.5, 383.5, 22.47220505424423],
          keyPoint: [],
        },
      },
      {
        type: "Feature",
        properties: {
          objectId: 8,
          id: 8,
          layerId: 8,
          content: { label: "zaqizaba", kache: "2" },
          ocrContent: {},
          generateMode: 1,
          quality: {
            errorType: {
              attributeError: [],
              targetError: [],
              otherError: "",
            },
            changes: { attribute: [], target: [] },
            qualityStatus: "unqualified",
          },
          labelColor: [251, 0, 255],
          area: 2809,
        },
        title: "8_8_杂七杂八",
        geometry: {
          type: "Ellipse",
          coordinates: [137.5, 61, 16, 26.5, 0],
          keyPoint: [],
        },
      },
      {
        type: "Feature",
        properties: {
          objectId: 9,
          id: 9,
          layerId: 9,
          content: { label: "zaqizaba", kache: "2" },
          ocrContent: {},
          generateMode: 1,
          quality: {
            errorType: {
              attributeError: [],
              targetError: [],
              otherError: "",
            },
            changes: { attribute: [], target: [] },
            qualityStatus: "unqualified",
          },
          labelColor: [251, 0, 255],
          area: 2816,
        },
        title: "9_9_杂七杂八",
        geometry: {
          type: "Trapezium",
          coordinates: [
            [
              [123.5, 118.5],
              [123.5, 173.5],
              [167.5, 180.5],
              [167.5, 116.5],
              [123.5, 118.5],
            ],
          ],
          keyPoint: [],
        },
      },
    ],
  },
};

export default {
  data,
  dataType
}


