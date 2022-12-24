export const mapboxToken =
  "pk.eyJ1IjoiY2hhb3lpbmciLCJhIjoiY2xhdWo3bjN1MDRxeTNuczZucjI1azZjMSJ9.dFC1tvRTGdqazZ6thJGWdg";
export const tdtToken = "13aaaf7907b41c2e04034d430da1ce36";
const tdtVec = `http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles&tk=${tdtToken}`;
const tdtVecAnn = `http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles&tk=${tdtToken}`;

// mapbox 5地图配置项
export const mapStyle = {
  version: 8,
  sources: {
    tdtVec: {
      type: "raster",
      tiles: [tdtVec],
      tileSize: 256,
    },
    tdtVecAnn: {
      type: "raster",
      tiles: [tdtVecAnn],
      tileSize: 256,
    },
  },
  layers: [
    {
      id: "tdtVec",
      type: "raster",
      source: "tdtVec",
    },
    {
      id: "tdtVecAnn",
      type: "raster",
      source: "tdtVecAnn",
    },
  ],
};
