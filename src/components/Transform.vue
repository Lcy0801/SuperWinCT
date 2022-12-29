<template lang="">
    <div id="transform">
        <div>
            <el-radio-group v-model="sourceSR">
                <ElRadioButton label="坐标系" size="default" disabled>坐标系</ElRadioButton>
                <ElRadioButton label="WGS84" size="default">WGS84</ElRadioButton>
                <ElRadioButton label="GCJ02" size="default">GCJ02</ElRadioButton>
                <ElRadioButton label="BD09" size="default">BD09</ElRadioButton>
                <ElRadioButton label="SHCJ" size="default">SHCJ</ElRadioButton>
              </el-radio-group>
        </div>
        <div id="coordInput">
            <ElInput>
                <template #prepend>
                    <span style="width:59px">坐标：</span>
                </template>
                <template #suffix>
                    <button id="location" title="在地图上拾取点"></button>
                </template>
                <template #append>
                    <ElButton type="success">转换</ElButton>
                </template>
            </ElInput>
        </div>
        <div id="result">
            <ElTable 
            :data="resultData" 
            border 
            style="width: 100%"
            :show-header="false"
            :row-style="{height: '10px'}"
            >
                <el-table-column prop="srName"  width="100"/>
                <el-table-column prop="coordinate" width="240" />
                <el-table-column prop="copyBt" width="100"/>
            </ElTable>
        </div>
    </div>
</template>
<script setup>
import { ElRadioGroup,ElInput,ElButton,ElRadioButton,ElTable } from "element-plus";
import "element-plus/dist/index.css"
import { ref,reactive } from "vue";
let sourceSR=ref("WGS84");
let resultData=reactive([
    {
        srName:"WGS84"
    },
    {
        srName:"GCJ02"
    },
    {
        srName:"BD09"
    },
    {
        srName:"SHCJ"
    }
])
</script>
<style lang="css">
#transform{
    position: absolute;
    z-index: 9999;
    top: 10px;
    left: 10px;
    background-color: white;
    box-shadow: 0px 0px 5px 3px gray;
    width: 440px;
}

.el-radio-button{
    width: 85px;
}

.el-input-group__prepend{
    border-radius: 0px;
}

#location{
    background-image: url("../assets/location.png");
    background-size: cover;
    width: 20px;
    height: 20px;
    border: 0px;
    background-color: white;
}

#location:hover{
    cursor: pointer;
}

.el-button{
    background-color:#409EFF !important;
    width: 100px;
    border-radius: 0px;
}

</style>