<template lang="">
  <div id="mapContainer"></div>
</template>
<script setup>
import { onMounted } from "vue";
import map2d from "../map2d";
import { eventbus } from "../event";
onMounted(() => {
  map2d.initMap();
  eventbus.on("changeBaseMap", (baseMap) => {
    console.log("底图切换成功", baseMap);
  });
});
</script>
<style lang="css">
#mapContainer {
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
}
</style>
