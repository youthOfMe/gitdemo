<template>
    <div>
        <bread-vue :breadlist="breadlist"></bread-vue>
        <el-card class="mt">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input :placeholder="'请输入用户ID/订单号/用户名称'" v-model="searchContent">
                        <el-select  slot="prepend" placeholder="请选择" v-model="searchSelect">
                            <el-option label="用户ID" :value="1"></el-option>
                            <el-option label="订单号" :value="2"></el-option>
                            <el-option label="用户名称" :value="3"></el-option>
                        </el-select>
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-date-picker
                        v-model="searchTime"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-col>
                <el-col :span="6" :offset="6">
                    <div class="fr">
                        <el-button type="primary" @click="search">搜索</el-button>
                        <el-button type="primary" @click="addBox">新增盲盒</el-button>
                        <el-button :disabled="buttonVisable">审核</el-button>
                        <el-button :disabled="buttonVisable">修改</el-button>
                        <el-button :disabled="buttonVisable">删除</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-radio-group v-model="params.status" @change="getlist">
                <el-radio-button :label="1">全部盲盒(300)</el-radio-button>
                <el-radio-button :label="2">未审核(80)</el-radio-button>
                <el-radio-button :label="3">已审核(20)</el-radio-button>
                <el-radio-button :label="4">已抽取(80)</el-radio-button>
                <el-radio-button :label="5">未抽取(20)</el-radio-button>
                <el-radio-button :label="6">免费盲盒(100)</el-radio-button>
                <el-radio-button :label="7">收费盲盒(50)</el-radio-button>
            </el-radio-group>
        </el-card>
        <el-card>
            <el-table :data="tableData" style="width: 100%" @selection-change="selectAdd" v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table-column type="selection" width="55" align="center" fixed="left" ></el-table-column>
                <el-table-column prop="date" label="日期" width="100px" align="center" fixed="left"></el-table-column>
                <el-table-column prop="id" label="盲盒编号" width="180px" align="center" fixed="left"></el-table-column>
                <el-table-column prop="uid" label="用户ID" width="120px" align="center"></el-table-column>
                <el-table-column prop="name" label="用户名称" width="180px" align="center"></el-table-column>
                <el-table-column prop="sex" label="用户性别" width="100px" align="center"></el-table-column>
                <el-table-column prop="personInfo" label="实名信息" width="300px" align="center"></el-table-column>
                <el-table-column prop="content" label="盲盒内容" width="300px" align="center"></el-table-column>
                <el-table-column prop="tel" label="联系方式" width="260px" align="center"></el-table-column>
                <el-table-column prop="boxSex" label="盲盒性别" width="80px" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.boxSex==1">男</span>
                        <span v-if="scope.row.boxSex==2">女</span>
                    </template>
                </el-table-column>
                <el-table-column prop="boxStatus" label="状态" width="100px" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.boxStatus==1">未审核</span>
                        <span v-if="scope.row.boxStatus==2">已审核</span>
                        <span v-if="scope.row.boxStatus==3">未抽取</span>
                        <span v-if="scope.row.boxStatus==4">已抽取</span>
                    </template>
                </el-table-column>
                <el-table-column prop="classbox" label="盲盒类别" width="180px" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.classbox==1">免费盲盒</span>
                        <span v-if="scope.row.classbox==2">收费盲盒</span>
                    </template>
                </el-table-column>
                <el-table-column prop="from" label="盲盒来源" width="100px" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.from==1">官方</span>
                        <span v-if="scope.row.from==2">代理商</span>
                        <span v-if="scope.row.from==3">加盟商</span>
                        <span v-if="scope.row.from==4">用户</span>
                    </template>
                </el-table-column>
                <el-table-column prop="operate" label="操作" width="220px" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
                        <el-button size="mini" @click="edit(scope.row)">详情</el-button>
                        <el-button size="mini" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="sizeChange"
                @current-change="currentChange"
                :current-page="params.page"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="params.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                class="fr mt">
            </el-pagination>
            <div class="clear"></div>
        </el-card>
        <add-blind-box :visibles="visible" @abc="visibleChange"></add-blind-box>
    </div>
</template>

<script>
import BreadVue from "@/comment/BreadVue.vue"
import {post} from "@/utils/http"
import moment from "moment"
import AddBlindBox from './AddBlindBox.vue'
import {mapMutations} from "vuex"
    export default {
        components: { BreadVue,AddBlindBox },
        created () {
            console.log(this.$route.meta.bread,123)
            this.getlist()
        },
        data () {
            return {
                loading : true,
                buttonVisable : true,
                visible : false,//新建弹框是否显示
                breadlist : this.$route.meta.bread,
                classbox : "",
                selectlist : [],//是否选择
                select : true,//是否选择
                total : 0,//条数
                searchContent : "",//搜索框内的内容
                params : {
                    page : 1,
                    pageSize : 10,
                    status : 1,
                },//刚开始刷新时传过去的参数
                searchSelect : 0,//选择框搜索的类型
                boxStatus : 1,
                tableData : [],//数据渲染
                operate : "",
                searchTime : "",//时间
                pickerOptions: {
                shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                        }
                    }, 
                    {
                        text: '最近一个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近三个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                        }
                    }]
                }     
            }
        },
        methods : {
            ...mapMutations(["changeBlindBox"]),
            async getlist () {
                let {data} = await post("/blindbox/list",this.params).catch((error)=>{
                    this.$message({
                        type : "error",
                        message : error
                    })
                })
                this.tableData = data.list
                this.total = data.total
                this.loading = false
            },
            async search () {
                if(this.searchContent === "" || this.searchSelect === 0 || this.searchTime === ""){
                    this.$message({
                        type : "error",
                        message : "请选择搜索类型,搜索时间以及内容"
                    })
                    return "错误"
                }
                this.loading = true
                let startTime = moment(this.searchTime[0]).format("YYYY-MM-DD")
                let endTime = moment(this.searchTime[1]).format("YYYY-MM-DD")
                //处理时间
                let {data} = await post("/blindbox/list",{
                    ...this.params,
                    startTime,
                    endTime,
                    searchSelect : this.searchSelect,
                    searchContent : this.searchContent
                })
                //搜索
                this.tableData = data.list //更新数据
                this.total = data.total //更新数据
                this.loading = false
            },
            sizeChange (pageSize) {
                console.log(pageSize)
                this.params.pageSize = pageSize
                this.getlist()
            },
            currentChange (page) {
                this.params.page = page
                this.getlist()
            },
            visibleChange(m){
                this.visible = m
            },
            addBox(){
                this.visible = true
            },
            edit(payload){
                this.changeBlindBox(payload)
                this.visible = true
            },
            selectAdd(selection){
                this.buttonVisable = selection.length === 0 ? true : false
            }
        },
        
    }
</script>

<style lang="less" scoped>

</style>