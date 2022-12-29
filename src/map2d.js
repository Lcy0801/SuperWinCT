import { mapboxToken, mapStyle } from "./store/mapconfig";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
//导入mapbox绘制工具
import mapboxGlDraw from "@mapbox/mapbox-gl-draw";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
//导入事件总线
import { eventbus } from "./event"
import { createApp } from "vue";
import ExportDraw from "./components/ExportDraw.vue";
//导入turf
import * as turf from "@turf/turf";
class Map2d {
  constructor() {
    this.map = null;
  }
  async initMap() {
    this.map = new mapboxgl.Map({
      accessToken: mapboxToken,
      antialias: true,
      container: "mapContainer",
      style: mapStyle,
      center: [113.12302920024092, 31.76274963518034],
      zoom: 6,
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
    this.draw = new mapboxGlDraw({
      displayControlsDefault: false,
      controls: {
        point: true,
        line_string: true,
        polygon: true,
        trash: true
      }
    });
    this.map.addControl(this.draw);
    //挂载导出组件
    const exportDom = document.createElement("div");
    exportDom.className = "mapboxgl-ctrl-group mapboxgl-ctrl";
    createApp(ExportDraw).mount(exportDom);
    document.querySelector(".mapboxgl-ctrl-top-right").appendChild(exportDom);
    //导出绘制的数据
    eventbus.on("exportDraw", () => {
      const drawFeatures = this.draw.getAll();
      if (drawFeatures.features.length === 0) {
        alert("没有需要导出的数据！");
        return;
      }
      const featuresGeoJson = JSON.stringify(drawFeatures);
      const blob = new Blob([featuresGeoJson], { type: "text/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "draw.json";
      a.click();
    });
    //绘制上传的数据
    eventbus.on("uploadDraw", async () => {
      const inputFile = document.createElement("input");
      inputFile.type = "file";
      inputFile.multiple = false;
      inputFile.accept = ".json,.JSON,.geojson,.GEOJSON";
      inputFile.addEventListener("change", () => {
        if (inputFile.files.length === 0) {
          return;
        }
        const file = inputFile.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          const inputFeatures = JSON.parse(reader.result);
          this.draw.add(inputFeatures);
          alert("上传成功!");
          const bounds = turf.bbox(inputFeatures);
          console.log(bounds);
          this.map.fitBounds([[bounds[0], bounds[3]], [bounds[2], bounds[1]]]);
        };
        reader.readAsText(file);
      });
      inputFile.click();
    })
    //底图切换事件
    eventbus.on("changeBaseMap", () => {
      console.log("底图切换成功!");
      const drawFeatures = this.draw.getAll();
      this.map.removeControl(this.draw);
      this.draw = new mapboxGlDraw({
        displayControlsDefault: false,
        controls: {
          point: true,
          line_string: true,
          polygon: true,
          trash: true
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
    //读取数据
    const poidata = await fetch("poi.geojson").then(res => { return res.json() });
    //打印当前地图缩放级别
    this.map.on("moveend", () => {
      const level = this.map.getZoom();
      console.log(`打印当前地图的缩放级别${level}`);
      //移除图层
      this.map.getLayer("poi") && this.map.removeLayer("poi");
      this.map.getSource("poi") && this.map.removeSource("poi");
      //判断是否需要聚合
      const aggFlag = level <= 18 ? true : false;
      if(aggFlag){
        //加载聚合数据
        //计算每一个poi点在当前地图层级下所属于的瓦片编号,在同一地图瓦片下的poi点进行聚合:统计每一个瓦片下poi点的数目
        
        
      }else{
        //加载非聚合数据

      }
    })
  }
}
export default new Map2d();
