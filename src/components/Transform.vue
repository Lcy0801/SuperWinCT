<template lang="">
    <div id="transform">
        <div id="selectSR">
            <ElSelect
            v-model="sourceSR"
            style="width:100px"
            >
                <ElOption
                v-for="(item,index) in spatialRefs"
                :key="index"
                :label="item"
                :value="item"
                :disabled="destSR===item"
                />
            </ElSelect>
            <img id="arrow" src="../assets/arrow.png" alt="转换为">
            <ElSelect
            v-model="destSR"
            style="width:100px"
            >
                <ElOption
                v-for="(item,index) in spatialRefs"
                :key="index"
                :label="item"
                :value="item"
                :disabled="sourceSR===item"
                />
            </ElSelect>
        </div>
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
    top: 10px;
    left: 10px;
    background-color: white;
    box-shadow: 0px 0px 5px 3px gray;
    width: 252px;
}

#selectSR{
    overflow: hidden;
}

#selectSR > *{
    float: left;
}
#arrow{
    width: 32px;
    margin-left: 10px;
    margin-right: 10px;
    display: inline;
}

.el-input__wrapper{
    border-radius: 0px;
}

</style>