import { mapboxToken, mapStyle } from "./store/mapconfig";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
//导入mapbox绘制工具
import mapboxGlDraw from "@mapbox/mapbox-gl-draw";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
//导入事件总线
import {eventbus} from "./event"
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
      displayControlsDefault:true
    });
    this.map.addControl(this.draw);
    eventbus.on("changeBaseMap", () => {
      console.log("底图切换成功!");
      const drawFeatures=this.draw.getAll();
      this.map.removeControl(this.draw);
      this.draw=new mapboxGlDraw({
        displayControlsDefault:true
      });
      this.map.addControl(this.draw);
      this.draw.add(drawFeatures);
    });
    this.map.on("load",()=>{
      console.log(123);
    })
    //坐标拾取工具
    this.map.on("click", (e) => {
      console.log(e.lngLat);
      console.log(e.point);
    });
  }
}
export default new Map2d();
