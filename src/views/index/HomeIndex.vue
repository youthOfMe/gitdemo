<template>
    <div>
        <el-row class="info_one" :gutter="24">
            <el-col :span="6" class="info_one_com">
                <el-card class="box-card">
                    <div class="fl">
                        <p class="text item">用户新增</p>
                        <p class="text item num">7777</p>
                        <p class="text item">+77.77% 
                            <span>与上月相比</span>
                        </p>
                    </div> 
                    <i class="el-icon-tickets fr"></i>
                </el-card>
            </el-col>
            
            <el-col :span="6" class="info_one_com">
                <el-card class="box-card two">
                    <div class="fl">
                        <p class="text item">充值新增</p>
                        <p class="text item num">88888</p>
                        <p class="text item">+88.88% 
                            <span>与上月相比</span>
                        </p>
                    </div> 
                    <i class="el-icon-money fr"></i>
                </el-card>
            </el-col>
            <el-col :span="6" class="info_one_com" >
                <el-card class="box-card three">
                    <div class="fl">
                        <p class="text item">盲盒新增</p>
                        <p class="text item num">66666</p>
                        <p class="text item">+66.66% 
                            <span>与上月相比</span>
                        </p>
                    </div> 
                    <i class="el-icon-box fr"></i>
                </el-card>
            </el-col>
            <el-col :span="6" class="info_one_com">
                <el-card class="box-card four">
                    <div class="fl">
                        <p class="text item">投诉新值</p>
                        <p class="text item num">0009</p>
                        <p class="text item">-99.99% 
                            <span>与上月相比</span>
                        </p>
                    </div> 
                    <i class="el-icon-chat-dot-round fr"></i>
                </el-card>
            </el-col>
        </el-row>
        <el-row class="data mt2" :gutter="24">
            <el-col :span="12">
                <el-card >
                    <div slot="header" class="clearfix">
                        <span>用户新增</span>
                    </div>
                    <div ref="user" class="user_data">
                        
                    </div>
                </el-card>
                <el-card class="mt2 life" >
                    <div slot="header" class="clearfix">
                        <span>3小时内紧急待办</span>
                    </div>
                    <el-collapse>
                        <el-collapse-item title="用户投诉" name="1">
                            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                        </el-collapse-item>
                        <el-collapse-item title="聊天违规" name="2">
                            <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                        </el-collapse-item>
                        <el-collapse-item title="盲盒违规" name="3">
                            <div>简化流程：设计简洁直观的操作流程；</div>
                            <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                            <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                        </el-collapse-item>
                        <el-collapse-item title="帖子违规" name="4">
                            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                            <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
                        </el-collapse-item>
                    </el-collapse>
                </el-card>
                <el-card class="mt2">
                    <el-timeline class="thing">
                        <el-timeline-item timestamp="2018/4/12" placement="top">
                        <el-card class="info">
                            <h4>更新 Github 模板</h4>
                            <p>王小虎 提交于 2018/4/12 20:46</p>
                        </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2018/4/3" placement="top">
                        <el-card class="info">
                            <h4>更新 Github 模板</h4>
                            <p>王小虎 提交于 2018/4/3 20:46</p>
                        </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2018/4/2" placement="top">
                        <el-card class="info">
                            <h4>更新 Github 模板</h4>
                            <p>王小虎 提交于 2018/4/2 20:46</p>
                        </el-card>
                        </el-timeline-item>
                    </el-timeline>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>充值新增</span>
                    </div>
                    <div ref="pay" class="pay_data">
                        
                    </div>
                </el-card>
                <el-card class="mt2 top_person">
                    <div slot="header" class="clearfix">
                        <span>今日豪哥</span>
                    </div>
                    <el-row>
                        <el-col :span="6" class="tc" v-for="(item,index) in [1,2,3,4]" :key="index">
                            <div>
                                <el-avatar icon="el-icon-user-solid" class="head_icon tc"></el-avatar>
                                <p>名字</p>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>
                <el-card class="mt2">
                    <div slot="header" class="clearfix">
                        <span>待添加</span>
                    </div>
                    <div>
                        <span>青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪</span>
                        <el-divider></el-divider>
                        <span>少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉</span>
                    </div>
                </el-card>
                <el-card class="mt2">
                    <el-descriptions title="版本信息" direction="vertical" :column="4" border>
                        <el-descriptions-item label="开发者">辰风 暮雪 海星</el-descriptions-item>
                        <el-descriptions-item label="版本号">0.9</el-descriptions-item>
                        <el-descriptions-item label="版本信息" :span="2">vue2试用版</el-descriptions-item>
                        <el-descriptions-item label="团队">
                            <el-tag size="small">暮海星辰</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item label="服务器供应">微软</el-descriptions-item>
                    </el-descriptions>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card >
                    <div slot="header" class="clearfix">
                        <span>盲盒新增</span>
                    </div>
                    <div ref="box" class="box_data">
                    </div>
                </el-card>
                <el-card class="mt2">
                    <el-calendar>
                    </el-calendar>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="24" class="mt2">
            <el-col :span="12">
            </el-col>
            <el-col :span="12">
                
            </el-col>
        </el-row>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import {get} from "@/utils/http"
    export default {
        mounted () {
            this.userDate()
            this.boxDate()
            this.payDate()
        },
        methods : {
            async userDate () {
                let userChart = echarts.init(this.$refs.user)
                const {data} = await get("/userchart").catch((error)=>{
                    this.$message({
                        type : "error",
                        message : error
                    })
                })
                let times = []
                let users = []
                for(let key in data){
                    times.push(key)
                    users.push(data[key])
                }
                const option = {
                    xAxis: {
                        type: 'category',
                        data: times
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            data: users,
                            type: 'line',
                            smooth: true,
                            areaStyle: {
                                opacity: 0.5,
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgb(128, 255, 165)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgb(1, 191, 236)'
                                }
                                ])
                            },
                        }
                    ]
                }
                userChart.setOption(option)
            },
            boxDate () {
                let boxChart = echarts.init(this.$refs.box)
                //设置挂载点
                const option = {
                    legend: {
                        top: 'bottom'
                    },
                    toolbox: {
                        show: true,
                        feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        restore: { show: true },
                        saveAsImage: { show: true }
                        }
                    },
                    series: [
                        {
                            name: 'Nightingale Chart',
                            type: 'pie',
                            radius: [40, 220],
                            center: ['50%', '50%'],
                            roseType: 'area',
                            itemStyle: {
                                borderRadius: 8
                            },
                            data: [
                                { value: 40, name: 'rose 1' },
                                { value: 38, name: 'rose 2' },
                                { value: 32, name: 'rose 3' },
                                { value: 30, name: 'rose 4' },
                                { value: 28, name: 'rose 5' },
                                { value: 26, name: 'rose 6' },
                                { value: 22, name: 'rose 7' },
                                { value: 18, name: 'rose 8' }
                            ]
                        }
                    ]
                }
                //配置图表
                boxChart.setOption(option)
            },
            payDate () {
                let payChart = echarts.init(this.$refs.pay)
                const option = {
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        top: '5%',
                        left: 'center'
                    },
                    series: [
                        {
                            name: 'Access From',
                            type: 'pie',
                            radius: ['40%', '70%'],
                            avoidLabelOverlap: false,
                            itemStyle: {
                                borderRadius: 10,
                                borderColor: '#fff',
                                borderWidth: 5
                            },
                            label: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                label: {
                                show: true,
                                fontSize: 40,
                                fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            data: [
                                { value: 1048, name: 'Search Engine' },
                                { value: 735, name: 'Direct' },
                                { value: 580, name: 'Email' },
                                { value: 484, name: 'Union Ads' },
                                { value: 300, name: 'Video Ads' }
                            ]
                        }
                    ]
                }
                payChart.setOption(option)
            }
        }
    }
</script>

<style lang="less" scoped>
    .info_one {
        height: 150px;
        .info_one_com {
            height: 150px;
        }
    }
    .box-card {
        background-color: white;
        color: #303133;
        height: 100%;
        line-height: 30px;
        font-size: 18px;
        i {
            font-size: 100px;
            color : rgba(0,0,0,0.5);
        }
        span {
            font-size: 14px;
        }
        .num {
            font-weight: 700;
            font-size: 16px;
        }
    }
    // .two {
    //     background-color: rgb(255,111,117);
    // }
    // .three {
    //     background-color: rgb(77,91,255);
    // }
    // .four {
    //     background-color: rgb(254,158,55);
    // }
    .user_data {
        height: 260px;
    }
    .box_data {
        height: 600px;
    }
    .pay_data {
        height: 400px;
    }
    .life {
        padding-bottom: 25px;
    }
    .top_person {
        height: 180px;
    }
    .head_icon {
        width: 60px;
        height: 60px;
        font-size: 40px;
        line-height: 60px;
    }
    .thing {
        background-color: white;
        box-sizing: border-box;
        padding: 20px 20px;
        .info {
            line-height: 35px;
        }
    }
</style>