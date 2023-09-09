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
                        <el-button type="primary" @click="addBox">新增用户</el-button>
                        <el-button disabled>审核</el-button>
                        <el-button disabled>修改</el-button>
                        <el-button disabled>删除</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-radio-group v-model="params.status" @change="getlist">
                <el-radio-button :label="1">全部用户(300)</el-radio-button>
                <el-radio-button :label="2">老用户(80)</el-radio-button>
                <el-radio-button :label="3">新用户(20)</el-radio-button>
                <el-radio-button :label="4">已违规(80)</el-radio-button>
                <el-radio-button :label="5">会员用户(80)</el-radio-button>
                <el-radio-button :label="6">非会员用户(20)</el-radio-button>
            </el-radio-group>
        </el-card>
        <el-card>
            <el-table :data="tableData" style="width: 100%" v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table-column type="selection" width="55" align="center" fixed="left"></el-table-column>
                <el-table-column prop="date" label="注册时间" width="100px" align="center" fixed="left"></el-table-column>
                <el-table-column prop="uid" label="用户ID" width="120px" align="center"></el-table-column>
                <el-table-column prop="name" label="用户名称" width="180px" align="center"></el-table-column>
                <el-table-column prop="sex" label="用户性别" width="100px" align="center"></el-table-column>
                <el-table-column prop="personInfo" label="实名信息" width="300px" align="center"></el-table-column>
                <el-table-column prop="achievement" label="用户成就" width="300px" align="center"></el-table-column>
                <el-table-column prop="pay" label="收费币" width="100px" align="center"></el-table-column>
                <el-table-column prop="check" label="签到币" width="100px" align="center"></el-table-column>
                <el-table-column prop="soul" label="缘分点" width="100px" align="center"></el-table-column>
                <el-table-column prop="userClass" label="用户类别" width="100px" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.userClass==1">新用户</span>
                        <span v-if="scope.row.userClass==2">老用户</span>
                        <span v-if="scope.row.userClass==3">已违规</span>
                    </template>
                </el-table-column>
                <el-table-column prop="vip" label="会员服务" width="100px" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.vip==1">已开通</span>
                        <span v-if="scope.row.vip==2">未开通</span>
                    </template>
                </el-table-column>
                <el-table-column prop="vipTime" label="会员时间" width="200px" align="center"></el-table-column>
                <el-table-column prop="from" label="用户来源" width="100px" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.from==1">官方注册</span>
                        <span v-if="scope.row.from==2">代理商</span>
                        <span v-if="scope.row.from==3">加盟商</span>
                        <span v-if="scope.row.from==4">B站链接</span>
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
        <add-user :visibles="visible" @abc="visibleChange"></add-user>
    </div>
</template>

<script>
import BreadVue from "@/comment/BreadVue.vue"
import {post} from "@/utils/http"
import moment from "moment"
import addUser from './AddUser.vue'
import {mapMutations} from "vuex"
    export default {
        components: { BreadVue, addUser },
        created () {
            console.log(this.$route.meta.bread,123)
            this.getlist()
        },
        data () {
            return {
                loading : true,
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
                let {data} = await post("/user/list",this.params).catch((error)=>{
                    this.$message({
                        type : "error",
                        message : error
                    })
                })
                console.log(data)
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
                let {data} = await post("/user/list",{
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
            selectChange (selection) {
                this.select = selection.length === 0 ? true : false
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
            }
        }
        
    }
</script>

<style lang="less" scoped>

</style>