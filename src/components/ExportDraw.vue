<template lang="">
    <button id="ExportDraw" class="mapbox-gl-draw_ctrl-draw-btn" @click="exportDraw" title="导出数据">
    </button>
    <button id="UploadDraw" class="mapbox-gl-draw_ctrl-draw-btn" @click="uploadDraw" title="上传数据：只允许geojson文件">
    </button>
</template>
<script setup>
import { eventbus } from '../event';
const exportDraw=()=>{
    eventbus.emit("exportDraw");
}
const uploadDraw=()=>{
    eventbus.emit("uploadDraw");
}
</script>
<style lang="css">
#ExportDraw{
    background-color: white;
    background-image: url("../assets/download.png") !important;
    background-size: contain;
}

#UploadDraw{
    background-color: white;
    background-image: url("../assets/upload.png") !important;
    background-size: contain;
}
</style>