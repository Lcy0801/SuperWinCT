export const mapboxToken =
  "pk.eyJ1IjoiY2hhb3lpbmciLCJhIjoiY2xhdWo3bjN1MDRxeTNuczZucjI1azZjMSJ9.dFC1tvRTGdqazZ6thJGWdg";
export const tdtToken = "13aaaf7907b41c2e04034d430da1ce36";
//天地图矢量
const tdtVec = `http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles&tk=${tdtToken}`;
const tdtVecAnn = `http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles&tk=${tdtToken}`;
//天地图影像
const tdtImg = `http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles&tk=${tdtToken}`;
const tdtImgAnn = `http://t0.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles&tk=${tdtToken}`;
//天地图地形
const tdtTer = `http://t0.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles&tk=${tdtToken}`;
const tdtTerAnn = `http://t0.tianditu.gov.cn/cta_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cta&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles&tk=${tdtToken}`;

export const baseMapUrls = {
  tdtVec,
  tdtVecAnn,
  tdtImg,
  tdtImgAnn,
  tdtTer,
  tdtTerAnn
};

// mapbox地图配置项
export const mapStyle = {
  version: 8,
  sources: {
    baseMap: {
      type: "raster",
      tiles: [tdtVec],
      tileSize: 256,
    },
    baseMapAnn: {
      type: "raster",
      tiles: [tdtVecAnn],
      tileSize: 256,
    },
  },
  layers: [
    {
      id: "baseMap",
      type: "raster",
      source: "baseMap",
    },
    {
      id: "baseMapAnn",
      type: "raster",
      source: "baseMapAnn",
    },
  ],
};
