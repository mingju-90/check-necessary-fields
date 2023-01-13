export const data = {
    "markResult": {
      "frames": [
        {
          "id": 1,
          "isEffective": "1",
          "objects": [
            {
              "type": "Feature",
              "geometry": {
                "type": "ExtentPolygon",
                "coordinates": [
                  [2715.9251336898396, 205.61411913250134],
                  [2887.591800356506, 205.61411913250134],
                  [2887.591800356506, 688.9474524658347],
                  [2715.9251336898396, 688.9474524658347],
                  [2715.9251336898396, 205.61411913250134]
                ],
                "keyPoint": []
              },
              "properties": {
                "id": 1,
                "objectId": 1,
                "content": {},
                "generateMode": 1,
                "labelColor": [249, 178, 63],
                "isLeave": false,
                "layerId": 1
              },
              "quality": {
                "qualityStatus": "",
                "errorType": {
                  "attributeError": [],
                  "targetError": [],
                  "otherError": ""
                },
                "changes": { "attribute": [], "target": [], "remark": "" }
              },
              "title": "1_1_信号灯框"
            },
            {
              "type": "Feature",
              "geometry": {
                "type": "ExtentPolygon",
                "coordinates": [
                  [683.6037051184111, 999.9097540531358],
                  [738.6037051184111, 999.9097540531358],
                  [738.6037051184111, 1143.4811826245643],
                  [683.6037051184111, 1143.4811826245643],
                  [683.6037051184111, 999.9097540531358]
                ],
                "keyPoint": []
              },
              "properties": {
                "id": 3,
                "objectId": 3,
                "content": {
                  "label": "traffic_light",
                  "Truncation": "1",
                  "ext_occlusion": "1",
                  "pose_orientat": "1",
                  "toward_orient": "0",
                  "Type": "2",
                  "Control": "0",
                  "Characteristic": "0",
                  "num_sub_lights": "3",
                  "color1": "3",
                  "integrated1": "0",
                  "shape1": "7",
                  "arrow_orientation1": [],
                  "color2": "3",
                  "integrated2": "0",
                  "shape2": "7",
                  "arrow_orientation2": [],
                  "color3": "2",
                  "integrated3": "0",
                  "shape3": "7",
                  "arrow_orientation3": [],
                  "color4": "",
                  "integrated4": "",
                  "shape4": "",
                  "arrow_orientation4": [],
                  "color5": "",
                  "integrated5": "",
                  "shape5": "",
                  "arrow_orientation5": []
                },
                "generateMode": 1,
                "labelColor": [249, 178, 63],
                "isLeave": false,
                "layerId": 3
              },
              "quality": {
                "qualityStatus": "failed",
                "errorType": {
                  "attributeError": [],
                  "targetError": ["other"],
                  "otherError": "不画分割线  不赋值子灯信息"
                },
                "changes": { "attribute": [], "target": [] }
              },
              "title": "3_3_信号灯框"
            }
          ],
          "quality": {
            "qualityStatus": "unqualified",
            "errorResult": { "errorType": [], "other": "" },
            "changes": []
          },
          "info": {},
          "result": {
            "content": { "Period": "0", "Weather": "2" },
            "quality": {
              "errorType": { "attributeError": [] },
              "changes": { "attribute": [] }
            }
          }
        }
      ]
    }
  }