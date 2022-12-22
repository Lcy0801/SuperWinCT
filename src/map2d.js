import { mapboxToken } from "./store/mapconfig";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
class Map2d { 
    constructor() { 
        this.map = null;
    }
    initMap() { 
        mapboxgl.accessToken = mapboxToken;
        this.map = new mapboxgl.Map({
          container: "mapContainer",
          style: "mapbox://styles/mapbox/streets-v11",
          center: [103.811279, 1.345399],
          zoom: 12,
        });
    }
}
export default new Map2d();