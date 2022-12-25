<template lang="">
    <div id="transform">
        <ElSelect
        v-model="sourceSR"
        >
            <ElOption
            v-for="(item,index) in spatialRefs"
            :key="index"
            :label="item"
            :value="item"
            />
        </ElSelect>
    </div>
</template>
<script setup>
import {ElSelect,ElOption} from "element-plus";
import 'element-plus/es/components/select/style/css'
import 'element-plus/es/components/option/style/css'
import { ref } from "vue";
const spatialRefs=["SHCG","WGS84","GCJ02","BD09"];
let sourceSR=ref("SHCG");
let destSR=ref("WGS84");
</script>
<style lang="css">
#transform{
    position: absolute;
    z-index: 9999;
}
</style>