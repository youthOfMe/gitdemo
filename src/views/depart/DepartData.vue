<template>
    <div>
        <bread-vue :breadlist="this.$route.meta.bread"></bread-vue>
        <el-card class="mt">
            <el-row :gutter="24">
                <el-col :span="18">
                    <el-row :gutter="24">
                        <el-col :span="8">
                            <el-input></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input></el-input>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6">
                    <el-row>
                        <el-col :span="17">
                            <el-dropdown>
                                <span class="el-dropdown-link" @click="changeShow()">
                                    {{show ? "收起" : "展开"}}<i
                                        :class="show ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
                                    ></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                </el-dropdown-menu>
                            </el-dropdown>
                        </el-col>
                        <el-col :span="7">
                            <el-button type="primary">查询</el-button>
                            <el-button type="primary">重置</el-button>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row class="mt" v-show="show">
                <el-col :span="18">
                    <el-row :gutter="24">
                        <el-col :span="8">
                            <el-input></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input></el-input>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
import BreadVue from "@/comment/BreadVue.vue";
    export default {
        components: {
            BreadVue,
        },
        data () {
            return {
                show : false
            }
        },
        methods : {
            changeShow () {
                this.show = !this.show
            }
        }
    };
</script>

<style lang="less" scoped>
    .el-dropdown-link {
        cursor: pointer;
        color: #409eff;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
</style>