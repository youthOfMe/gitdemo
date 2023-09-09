
<template>
    <div>
        <h1 class="title">暮海星辰后台系统</h1>
        <el-menu
            :router="true"
        >
            <menus-vue v-for="(item,index) in menuList" :key="index" :menu="item"></menus-vue>
        </el-menu>
    </div>
</template>

<script>
import MenusVue from "./MenusVue.vue"
import {get} from "@/utils/http"
    export default {
        data () {
            return {
                menuList : []
            }
        },
        created () {
            this.menus()
        },
        components : {
            MenusVue
        },
        methods : {
            menus () {
                get("http://localhost:8080/menu").then(({data})=>{
                    console.log(data)
                    this.menuList = data
                }).catch((error)=>{
                    console.log(error)
                    this.$$message({
                        type : "error",
                        message : "请求失败，请检查网络是否正常"
                    })
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .title {
        color: #000000;
        line-height: 70px;
        text-align: center;
    }
</style>