<template lang="">
  <div id="layerControl" @click="showPanel()">
    <a href="javascript:void(0);" title="图层管理">
      <img src="../assets/layers.png" />
    </a>
  </div>
  <div id="layersList">
    <h1 class="selectBaseMap">
      <span>选择底图</span>
      <a id="close" href="javascript:void(0);" @click="showPanel">
        <img src="../assets/close.png" alt="关闭" />
      </a>
    </h1>
    <div class="baseMapList">
      <ul>
        <li>
          <a href="javascript:void(0);" @click="selectedLayer = 'Vec'"
            ><img
              :style="selectedFlag.Vec"
              src="../assets/vec.jpg"
              alt="矢量图"
            />
            <h2>地图</h2></a
          >
        </li>
        <li>
          <a href="javascript:void(0);" @click="selectedLayer = 'Img'"
            ><img
              :style="selectedFlag.Img"
              src="../assets/img.jpg"
              alt="影像图"
            />
            <h2>影像</h2></a
          >
        </li>
        <li>
          <a href="javascript:void(0);" @click="selectedLayer = 'Ter'"
            ><img
              :style="selectedFlag.Ter"
              src="../assets/ter.jpg"
              alt="地形图"
            />
            <h2>地形</h2></a
          >
        </li>
      </ul>
    </div>
    <h1 class="showPlaceName">
      <span>地名</span>
      <input type="checkbox" id="showPlaceName" v-model="isAnnShow" />
    </h1>
  </div>
</template>

<script setup>
import { ref, watch, reactive } from "vue";
import map2d from "../map2d";
import { baseMapUrls } from "../store/mapconfig";
import { eventbus } from "../event";
//控制面板显隐
let bottomPos = ref("-160px");
const showPanel = () => {
  bottomPos.value = bottomPos.value === "10px" ? "-160px" : "10px";
};
//图层切换
let selectedLayer = ref("");
let selectedFlag = reactive({
  Vec: "border:0px solid gray",
  Img: "border:0px solid gray",
  Ter: "border:0px solid gray",
});
watch(selectedLayer, (newLayer, oldLayer) => {
  selectedFlag[newLayer] = "border:1px solid gray";
  selectedFlag[oldLayer] = "border:0px solid gray";
  //更换底图
  const newTile = baseMapUrls[`tdt${newLayer}`];
  const newAnnTile = baseMapUrls[`tdt${newLayer}Ann`];
  map2d.map.getLayer("baseMap") &&map2d.map.removeLayer("baseMap");
  map2d.map.getLayer("baseMapAnn")&& map2d.map.removeLayer("baseMapAnn");
  map2d.map.getSource("baseMap") &&map2d.map.removeSource("baseMap");
  map2d.map.getSource("baseMapAnn")&&map2d.map.removeSource("baseMapAnn");
  map2d.map.addSource("baseMap", {
    type: "raster",
    tiles: [newTile],
    tileSize: 256,
  });
  map2d.map.addSource("baseMapAnn", {
    type: "raster",
    tiles: [newAnnTile],
    tileSize: 256,
  });
  map2d.map.addLayer({
    id: "baseMap",
    type: "raster",
    source: "baseMap",
  });
  map2d.map.addLayer({
    id: "baseMapAnn",
    type: "raster",
    source: "baseMapAnn",
  });

  if (!isAnnShow.value) {
    map2d.map.setLayoutProperty("baseMapAnn", "visibility", "none");
  }
  eventbus.emit("changeBaseMap");
});
//标注图层的打开与关闭
let isAnnShow = ref(true);
watch(isAnnShow, () => {
  if (isAnnShow.value) {
    map2d.map.setLayoutProperty("baseMapAnn", "visibility", "visible");
  } else {
    map2d.map.setLayoutProperty("baseMapAnn", "visibility", "none");
  }
});
</script>

<style lang="css" scoped>
#layerControl {
  position: absolute;
  z-index: 9999;
  bottom: 10px;
  right: 10px;
  background-color: white;
  border-radius: 3px;
}

#layerControl img {
  width: 30px;
}

#layersList {
  z-index: 9999;
  width: 280px;
  height: 155px;
  box-shadow: 0px 0px 5px 3px gray;
  position: absolute;
  box-sizing: border-box;
  bottom: v-bind(bottomPos);
  right: 70px;
  background-color: aliceblue !important;
  transition: bottom, 0.5s;
  border-radius: 2px;
}
h1 {
  margin: 0px;
  padding: 0px;
  padding-left: 10px;
  line-height: 30px;
  height: 30px;
  font-size: 14px;
  box-sizing: border-box;
}
.selectBaseMap {
  border-bottom: 2px dashed;
}
#close {
  margin: 0px;
  padding: 0px;
  vertical-align: middle;
  float: right;
  height: 100%;
}
#close img {
  width: 16px;
  padding-top: 7px;
}
.baseMapList {
  margin: 0px;
  padding: 0px;
  height: 95px;
}
ul {
  list-style: none;
  padding: 0px;
  margin: 0px;
  padding-left: 5px;
  padding-right: 5px;
}
.baseMapList ul li {
  padding-top: 20px;
  float: left;
  width: 90px;
}

.baseMapList ul li img {
  width: 60px;
  margin-left: 15px;
}

.baseMapList h2 {
  font-size: 12px;
  text-align: center;
  margin: 0px;
}
.baseMapList a {
  text-decoration: none;
  color: gray;
}
.showPlaceName {
  border-top: 2px dashed;
  font-size: 12px;
  font-family: "宋体";
}
.showPlaceName input {
  box-sizing: border-box;
  float: right;
  margin: 0px;
  width: 20px;
  height: 14px;
  float: right;
  margin-top: 8px;
}
</style>
