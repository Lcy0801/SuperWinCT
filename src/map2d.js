import { mapboxToken, mapStyle } from "./store/mapconfig";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
//导入mapbox绘制工具
import mapboxGlDraw from "@mapbox/mapbox-gl-draw";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
//导入事件总线
import {eventbus} from "./event"
import { createApp } from "vue";
import ExportDraw from "./components/ExportDraw.vue";
class Map2d {
  constructor() {
    this.map = null;
  }
  initMap() {
    this.map = new mapboxgl.Map({
      accessToken: mapboxToken,
      antialias: true,
      container: "mapContainer",
      style: mapStyle,
      center: [121.470176, 31.237046],
      zoom: 12,
      maxZoom: 17,
      minZoom: 0,
    });
    //添加缩放控件
    const nav = new mapboxgl.NavigationControl({
      showCompass: true,
      showZoom: true,
    });
    this.map.addControl(nav, "top-right");
    //添加地图绘制控件
    this.draw=new mapboxGlDraw({
      displayControlsDefault:false,
      controls:{
        point:true,
        line_string:true,
        polygon:true,
        trash:true
      }
    });
    this.map.addControl(this.draw);
    //挂载导出组件
    const exportDom=document.createElement("div");
    exportDom.className="mapboxgl-ctrl-group mapboxgl-ctrl";
    createApp(ExportDraw).mount(exportDom);
    document.querySelector(".mapboxgl-ctrl-top-right").appendChild(exportDom);
    //导出绘制的数据
    eventbus.on("exportDraw",()=>{
      const drawFeatures=this.draw.getAll();
      if(drawFeatures.features.length===0){
        alert("没有需要导出的数据！");
        return;
      }
      const featuresGeoJson=JSON.stringify(drawFeatures);
      const blob=new Blob([featuresGeoJson],{type:"text/json"});
      const a=document.createElement("a");
      a.href=URL.createObjectURL(blob);
      a.download="draw.json";
      a.click();
    });
    //底图切换事件
    eventbus.on("changeBaseMap", () => {
      console.log("底图切换成功!");
      const drawFeatures=this.draw.getAll();
      this.map.removeControl(this.draw);
      this.draw=new mapboxGlDraw({
        displayControlsDefault:false,
        controls:{
          point:true,
          line_string:true,
          polygon:true,
          trash:true
        }
      });
      this.map.addControl(this.draw);
      this.draw.add(drawFeatures);
      //移动导出组件的位置
      document.querySelector(".mapboxgl-ctrl-top-right").removeChild(exportDom);
      document.querySelector(".mapboxgl-ctrl-top-right").appendChild(exportDom);
    });
    //坐标拾取工具
    this.map.on("click", (e) => {
      console.log(e.lngLat);
      console.log(e.point);
    });
  }
}
export default new Map2d();
