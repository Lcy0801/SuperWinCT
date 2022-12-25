<template lang="">
    <button id="ExportDraw" class="mapbox-gl-draw_ctrl-draw-btn" @click="exportDraw">
    </button>
</template>
<script setup>
import { eventbus } from '../event';
const exportDraw=()=>{
    eventbus.emit("exportDraw");
}
</script>
<style lang="css">
#ExportDraw{
    background-color: white;
    background-image: url("../assets/download.png") !important;
    background-size: contain;
}
</style>