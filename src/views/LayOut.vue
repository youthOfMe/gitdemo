<template>
    <div>
        <el-container>
            <el-aside width="200px" class="aside">
                <nav-left></nav-left>
            </el-aside>
            <el-container>
                <el-header class="head">
                    <top-header></top-header>
                </el-header>
                <el-main class="main">
                    <keep-alive>
                        <router-view v-if="this.$route.meta.keepAlive"></router-view>
                    </keep-alive>
                    <router-view v-if="!this.$route.meta.keepAlive"></router-view>
                </el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import TopHeader from "@/components/TopHeader.vue" 
import NavLeft from "@/components/NavLeft.vue"
    export default {
        components : {
            TopHeader,NavLeft
        }
    }
</script>

<style lang="less" scoped>
    .head {
        line-height: 60px;
        box-shadow:0 2px 2px rgba(0,24,41,0.3);
    }
    .aside {
        height: 100vh;
        background-color:white;
    }
    .main {
        background-color: #e9eef3;
        height: 70vh;
        margin-top: 2px;
    }
</style>