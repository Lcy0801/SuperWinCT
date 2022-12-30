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
import { lonlat2tile } from "./utils/tiles";
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
      style:"mapbox://styles/chaoying/clc94ci5t000215pk0lwgump6",
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
    //添加聚合符号的图标，用于设置聚合图层的icon-image属性
    const image=new Image();
    image.src="agg.png";
    image.onload=()=>{
      image.width=50;
      image.height=50;
      this.map.addImage("aggLabel",image);
    };
    //读取数据
    const poidata = await fetch("poi.geojson").then(res => { return res.json() });
    this.map.on("moveend", () => {
      //打印当前地图缩放级别与四至范围
      const level = this.map.getZoom().toFixed(0);
      console.log(`打印当前地图的缩放级别${this.map.getZoom()}`);
      console.log('打印当前地图的四至范围', this.map.getBounds());
      //移除图层
      this.map.getLayer("poi") && this.map.removeLayer("poi");
      this.map.getSource("poi") && this.map.removeSource("poi");
      //判断是否需要聚合
      const aggFlag = level <= 10 ? true : false;
      if(aggFlag){
        //加载聚合数据
        //计算每一个poi点在当前地图层级下所属于的瓦片编号,在同一地图瓦片下的poi点进行聚合:统计每一个瓦片下poi点的数目
        const dataAgg={};
        poidata.features.forEach((poi)=>{
          //经纬度
          const [lon,lat]=poi.geometry.coordinates;
          const [tilex,tiley]=lonlat2tile(lon,lat,level);
          const key=`${tilex}_${tiley}`;
          if(dataAgg[key]){
            dataAgg[key].num+=1;
            dataAgg[key].lon+=lon;
            dataAgg[key].lat+=lat;
          }else{
            dataAgg[key]={
              num:1,
              lon,
              lat
            }
          }
        });
        //计算每一个瓦片内poi点的中心坐标并将聚合的结果转为geojson
        let aggFeatures=[];
        for(const key in dataAgg){
          const lon= dataAgg[key].lon/dataAgg[key].num;
          const lat= dataAgg[key].lat/dataAgg[key].num;
          const num=dataAgg[key].num;
          aggFeatures.push({
            type:"Feature",
            geometry:{
              type:"Point",
              coordinates:[lon,lat]
            },
            properties:{num}
          });
        }
        const aggGeojson={
          type:"FeatureCollection",
          features:aggFeatures
        };
        this.map.addSource("poi",{
          type:"geojson",
          data:aggGeojson
        });
        this.map.addLayer({
          id:"poi",
          type:"symbol",
          source:"poi",
          layout:{
            visibility:"visible",
            "icon-image":"aggcircle",
            "icon-size":0.3,
            "text-field":"{num}",
          },
          paint:{
            "text-color":"#FFFFFF",
            "icon-opacity":0.8
          }
        });
      }else{
        //加载非聚合数据
        //此时只加载在当前视口范围内的点
        const bounds=this.map.getBounds();
        const east=bounds.getEast();
        const west=bounds.getWest();
        const north=bounds.getNorth();
        const south=bounds.getSouth();
        const poiFeatures=poidata.features.filter(poi=>{
          const [lon,lat]=poi.geometry.coordinates;
          return lon>=west && lon<=east && lat>=south &&lat<=north;
        });
        const filterPoiGeoJson={
          type:"FeatureCollection",
          features:poiFeatures
        };
        this.map.addSource("poi",{
          type:"geojson",
          data:filterPoiGeoJson
        });
        this.map.addLayer({
          id:"poi",
          type:"circle",
          source:"poi",
          layout:{
            visibility:"visible"
          },
          paint:{
            "circle-radius":6,
            "circle-stroke-width":3,
            "circle-color":"#FF0000",
            "circle-stroke-color":"#FFFFFF"
          }
        });
      }
    })
  }
}
export default new Map2d();
