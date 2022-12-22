<template lang="">
    <div id="mapContainer">
    </div>
</template>
<script setup>
import { onMounted } from "vue";
import map2d from "../map2d"
onMounted(() => {
    map2d.initMap();
});
</script>
<style lang="css">
#mapContainer{
    width:100%;
    height:100%;
    padding: 0px;
    margin: 0px;
}
</style>