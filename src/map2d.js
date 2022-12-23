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
    //添加定位控件
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );
    //打印地图缩放级别
    this.map.on("zoomend", () => {
      console.log("当前地图级别", this.map.getZoom());
    });
    //坐标拾取工具
    this.map.on("click", (e) => {
      console.log(e.lngLat);
      console.log(e.point);
    });
  }
  animationDemo() {
    this.map.on("load", () => {
      const start = [121.4038808413095, 31.223136409294284];
      const mid = [121.47172796957051, 31.216739727706383];
      const end = [121.49626322549949, 31.276441326094854];
      const routeLine = {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [start, mid, end],
        },
      };
      const routeDist = turf.lineDistance(routeLine, "meters");
      const steps = 1000;
      let points = [];
      for (let i = 0; i <= steps; i++) {
        const dist = (i / steps) * routeDist;
        const point = turf.along(routeLine, dist, "meters");
        points.push(point.geometry.coordinates);
      }
      this.map.addSource("route", {
        type: "geojson",
        data: routeLine,
      });
      this.map.addLayer({
        id: "route",
        source: "route",
        type: "line",
        paint: {
          "line-width": 2,
          "line-color": "red",
        },
      });
      const marker = new mapboxgl.Marker().setLngLat(start).addTo(this.map);
      let step = 0;
      const animationShow = () => {
        step += 1;
        step %= steps;
        marker.setLngLat(points[step]);
        requestAnimationFrame(animationShow);
      };
      animationShow();
    });
  }
}
export default new Map2d();
