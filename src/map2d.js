import { mapboxToken, mapStyle } from "./store/mapconfig";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
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
    var nav = new mapboxgl.NavigationControl({
      showCompass: true,
      showZoom: true,
    });
    this.map.addControl(nav, "top-right");
    this.map.on("zoomend", () => {
      console.log("当前地图级别", this.map.getZoom());
    });
  }
  //打印当前地图级别
}
export default new Map2d();
