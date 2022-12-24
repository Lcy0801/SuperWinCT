import { mapboxToken, mapStyle } from "./store/mapconfig";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import * as turf from "turf";
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
    var nav = new mapboxgl.NavigationControl({
      showCompass: true,
      showZoom: true,
    });
    this.map.addControl(nav, "top-right");
    //坐标拾取工具
    this.map.on("click", (e) => {
      console.log(e.lngLat);
      console.log(e.point);
    });
  }
}
export default new Map2d();
