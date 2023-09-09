<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item,index) in breadList.data" :key="index" :to="{path:breadList.path[index]}">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="20" class="mt">
            <el-col :span="12">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>用户在线流失分析</span>
                    </div>
                    <div ref="online" class="online"></div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>用户新增分析</span>
                    </div>
                    <div class="online" ref="box"></div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import * as echarts from "echarts";
import {get} from "@/utils/http"
import breadCrumb from "@/mixins/breadCrumb"
export default {
    mixins : [breadCrumb],
    mounted() {
        this.boxDate();
        this.onlineData();
    },
    methods: {
        async onlineData() {
            let onlineChart = echarts.init(this.$refs.online);
            let {data} = await get("/onlinechart").catch((error)=>{
                this.$message({
                    type : "error",
                    message : error
                })
            })
            let newData = data.new
            let oldData = data.old
            let backData = data.back 
            const option = {
                legend: {},
                tooltip: {
                    trigger: "axis",
                    showContent: false,
                },
                dataset: {
                    source: [
                        [
                            "product",
                            "星期一",
                            "星期二",
                            "星期三",
                            "星期四",
                            "星期五",
                            "星期六",
                            "星期天",
                        ],
                        newData,
                        oldData,
                        backData,
                    ],
                },
                xAxis: { type: "category" },
                yAxis: { gridIndex: 0 },
                grid: { top: "55%" },
                series: [
                    {
                        type: "line",
                        smooth: true,
                        seriesLayoutBy: "row",
                        emphasis: { focus: "series" },
                    },
                    {
                        type: "line",
                        smooth: true,
                        seriesLayoutBy: "row",
                        emphasis: { focus: "series" },
                    },
                    {
                        type: "line",
                        smooth: true,
                        seriesLayoutBy: "row",
                        emphasis: { focus: "series" },
                    },
                    {
                        type: "line",
                        smooth: true,
                        seriesLayoutBy: "row",
                        emphasis: { focus: "series" },
                    },
                    {
                        type: "pie",
                        id: "pie",
                        radius: "30%",
                        center: ["50%", "25%"],
                        emphasis: {
                            focus: "self",
                        },
                        label: {
                            formatter: "{b}: {@2012} ({d}%)",
                        },
                        encode: {
                            itemName: "product",
                            value: "2012",
                            tooltip: "2012",
                        },
                    },
                ],
            };
            onlineChart.on("updateAxisPointer", function (event) {
                const xAxisInfo = event.axesInfo[0];
                if (xAxisInfo) {
                    const dimension = xAxisInfo.value + 1;
                    onlineChart.setOption({
                        series: {
                            id: "pie",
                            label: {
                                formatter: "{b}: {@[" + dimension + "]} ({d}%)",
                            },
                            encode: {
                                value: dimension,
                                tooltip: dimension,
                            },
                        },
                    });
                }
            });
            onlineChart.setOption(option);
        },
        boxDate() {
            let boxChart = echarts.init(this.$refs.box);
            //设置挂载点
            const option = {
                legend: {
                    top: "bottom",
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        restore: { show: true },
                        saveAsImage: { show: true },
                    },
                },
                series: [
                    {
                        name: "Nightingale Chart",
                        type: "pie",
                        radius: [40, 220],
                        center: ["50%", "50%"],
                        roseType: "area",
                        itemStyle: {
                            borderRadius: 8,
                        },
                        data: [
                            { value: 40, name: "rose 1" },
                            { value: 38, name: "rose 2" },
                            { value: 32, name: "rose 3" },
                            { value: 30, name: "rose 4" },
                            { value: 28, name: "rose 5" },
                            { value: 26, name: "rose 6" },
                            { value: 22, name: "rose 7" },
                            { value: 18, name: "rose 8" },
                        ],
                    },
                ],
            };
            //配置图表
            boxChart.setOption(option);
        },
    },
};
</script>

<style lang="less" scoped>
.online {
    height: 500px;
}
</style>