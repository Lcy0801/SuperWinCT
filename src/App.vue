<template lang="">
  <div id="root">
    <Transform></Transform>
    <Map></Map>
    <Layers></Layers>
  </div>
</template>

<script setup>
import Map from "./components/Map.vue";
import Layers from "./components/Layers.vue";
import Transform from "./components/Transform.vue";
</script>

<style lang="css">
#root {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
  overflow: hidden;
}
</style>
