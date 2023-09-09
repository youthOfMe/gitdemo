<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item
                v-for="(item, index) in breadList.data"
                :key="index"
                :to="{ path: breadList.path[index] }"
                >{{ item }}</el-breadcrumb-item
            >
        </el-breadcrumb>
        <el-card class="mt">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input
                        :placeholder="'请输入用户ID/订单号/用户名称'"
                        v-model="searchContent"
                    >
                        <el-select
                            slot="prepend"
                            placeholder="请选择"
                            v-model="searchSelect"
                        >
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
                        :picker-options="pickerOptions"
                    >
                    </el-date-picker>
                </el-col>
                <el-col :span="6" :offset="6">
                    <div class="fr">
                        <el-button type="primary" @click="search()"
                            >查询</el-button
                        >
                        <el-button :disabled="select">审核</el-button>
                        <el-button :disabled="select">删除</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-radio-group v-model="params.status" @change="getlist">
                <el-radio-button :label="1">全部订单(300)</el-radio-button>
                <el-radio-button :label="2">待处理(80)</el-radio-button>
                <el-radio-button :label="3">打包中(20)</el-radio-button>
                <el-radio-button :label="4">发货中(100)</el-radio-button>
                <el-radio-button :label="5">已发货(50)</el-radio-button>
                <el-radio-button :label="6">处理完毕(30)</el-radio-button>
                <el-radio-button :label="7">已退款(12)</el-radio-button>
                <el-radio-button :label="8">投诉中(8)</el-radio-button>
            </el-radio-group>
        </el-card>
        <el-card>
            <el-table
                :data="tableData"
                style="width: 100%"
                @selection-change="selectChange"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
            >
                <el-table-column
                    type="selection"
                    width="55"
                    align="center"
                    fixed="left"
                ></el-table-column>
                <el-table-column
                    type="index"
                    width="50px"
                    fixed="left"
                    label="序号"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="date"
                    label="日期"
                    width="100px"
                    align="center"
                    fixed="left"
                ></el-table-column>
                <el-table-column
                    prop="id"
                    label="订单号"
                    width="180px"
                    align="center"
                    fixed="left"
                ></el-table-column>
                <el-table-column
                    prop="uid"
                    label="用户ID"
                    width="120px"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="name"
                    label="用户名称"
                    width="180px"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="commodity"
                    label="商品名称"
                    width="300px"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="address"
                    label="地址"
                    width="180px"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="tel"
                    label="充值账号/手机号"
                    width="180px"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="count"
                    label="数量"
                    width="100px"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="unit"
                    label="单位"
                    width="100px"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="money"
                    label="价格"
                    width="150px"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    width="100px"
                    align="center"
                >
                    <template slot-scope="scope">
                        <span v-if="scope.row.status == 1">待处理</span>
                        <span v-if="scope.row.status == 2">打包中</span>
                        <span v-if="scope.row.status == 3">发货中</span>
                        <span v-if="scope.row.status == 4">已发货</span>
                        <span v-if="scope.row.status == 5">处理完毕</span>
                        <span v-if="scope.row.status == 6">已退款</span>
                        <span v-if="scope.row.status == 7">投诉中</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="percent"
                    label="处理进度"
                    width="180px"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="from"
                    label="订单来源"
                    width="100px"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="operate"
                    label="操作"
                    width="240px"
                    align="center"
                    fixed="right"
                >
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handle(scope.row)"
                            >处理</el-button
                        >
                        <el-button size="mini" @click="detail()"
                            >详情</el-button
                        >
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
                class="fr mt"
            >
            </el-pagination>
            <div class="clear"></div>
        </el-card>
        <handle-order :visibles="visible" @abc="visibleChange"></handle-order>
    </div>
</template>

<script>
import HandleOrder from "./HandleOrder.vue";
import { post } from "@/utils/http";
import breadCrumbo from "@/mixins/breadCrumbo";
import moment from "moment";
import { mapMutations, mapState } from "vuex";
export default {
    components: {
        HandleOrder,
    },
    mixins: [breadCrumbo],
    beforeRouteLeave(to, from, next) {
        if (to.path === "/orders/details") {
            from.meta.keepAlive = true;
            console.log(to.path);
        } else {
            this.clearCache();
            console.log(to.path);
            console.log(666);
        }
        next();
    },
    created() {
        this.getlist();
    },
    activated() {
        if (!this.isFromDetails) {
            this.getlist()
        }
    },
    data() {
        return {
            loading : true,
            visible: false,
            selectlist: [], //是否选择
            select: true, //是否选择
            total: 0, //条数
            searchContent: "", //搜索框内的内容
            params: {
                page: 1,
                pageSize: 10,
                status: "1",
            }, //刚开始刷新时传过去的参数
            searchSelect: 0, //选择框搜索的类型
            tableData: [], //数据渲染
            operate: "",
            searchTime: "", //时间
            pickerOptions: {
                shortcuts: [
                    {
                        text: "最近一周",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 7
                            );
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30
                            );
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "最近三个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 90
                            );
                            picker.$emit("pick", [start, end]);
                        },
                    },
                ],
            },
        };
    },
    methods: {
        ...mapMutations(["changeBlindBox"]),
        async getlist() {
            let { data } = await post("/orders/commodity", this.params).catch(
                (error) => {
                    this.$message({
                        type: "error",
                        message: error,
                    });
                }
            );
            this.tableData = data.list;
            this.total = data.total;
            this.loading = false
        },
        async search() {
            if (
                this.searchContent === "" ||
                this.searchSelect === 0 ||
                this.searchTime === ""
            ) {
                
                this.$message({
                    type: "error",
                    message: "请选择搜索类型,搜索时间以及内容",
                });
                return "错误";
            }
            this.loading = true
            let startTime = moment(this.searchTime[0]).format("YYYY-MM-DD");
            let endTime = moment(this.searchTime[1]).format("YYYY-MM-DD");
            let { data } = await post("/orders/commodity", {
                ...this.params,
                startTime,
                endTime,
                searchSelect: this.searchSelect,
                searchContent: this.searchContent,
            }).catch((error) => {
                this.$message({
                    type: "error",
                    message: error,
                });
            });
            this.tableData = data.list;
            this.total = data.total;
            this.loading = false
        },
        sizeChange(pageSize) {
            this.params.pageSize = pageSize;
            this.getlist();
        },
        selectChange(selection) {
            this.select = selection.length === 0 ? true : false;
        },
        currentChange(page) {
            this.params.page = page;
            this.getlist();
        },
        handle(payload) {
            this.changeBlindBox(payload);
            this.visible = true;
        },
        visibleChange(m) {
            this.visible = m;
        },
        detail() {
            this.$router.push("/orders/details");
        },
        clearCache() {
            let vnode = this.$vnode;
            let parentVnode = vnode && vnode.parent;
            if (
                parentVnode &&
                parentVnode.componentInstance &&
                parentVnode.componentInstance.cache
            ) {
                var key =
                    vnode.key == null
                        ? vnode.componentOptions.Ctor.cid +
                          (vnode.componentOptions.tag
                              ? `::${vnode.componentOptions.tag}`
                              : "")
                        : vnode.key;
                var cache = parentVnode.componentInstance.cache;
                var keys = parentVnode.componentInstance.keys;
                if (cache[key]) {
                    this.$destroy(); // remove key
                    if (keys.length) {
                        var index = keys.indexOf(key);
                        if (index > -1) {
                            keys.splice(index, 1);
                        }
                    }
                    cache[key] = null;
                }
            }
        },
    },
    computed: {
        ...mapState("moduleDetails",["isFromDetails"]),
    },
};
</script>

<style lang="less" scoped>
</style>