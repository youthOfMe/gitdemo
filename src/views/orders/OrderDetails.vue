<template>
    <div>
        <bread-vue :breadlist="this.$route.meta.bread"></bread-vue>
        <el-row class="mt">
            <el-card style="height:70px">
                <el-col :span="1" :offset="23">
                    <el-button type="primary" @click="back()">返回</el-button>
                </el-col>
            </el-card>
        </el-row>
        <el-row class="mt">
            <el-card>
                <el-steps :active="2" align-center>
                    <el-step
                        title="待处理"
                        description="该订单商家待处理哦"
                    ></el-step>
                    <el-step
                        title="打包中"
                        description="该商品正在打包中"
                    ></el-step>
                    <el-step
                        title="发货中"
                        description="该商品快递员正在取件"
                    ></el-step>
                    <el-step
                        title="已发货"
                        description="该商品已经发货啦"
                    ></el-step>
                    <el-step
                        title="处理完毕"
                        description="该订单已经结束啦"
                    ></el-step>
                </el-steps>
            </el-card>
        </el-row>
    </div>
</template>

<script>
import BreadVue from "@/comment/BreadVue.vue";
import {mapState,mapMutations} from "vuex"
export default {
    components: {
        BreadVue,
    },
    beforeRouteLeave(to,from,next){
        if(to.path === "/orders/shop"){
            this.changeIsFromDetails(true)
        }else{
            this.changeIsFromDetails(false)
        }
        next()
    },
    methods : {
        back(){
            this.$router.go(-1)
        },
        ...mapMutations("moduleDetails",["changeIsFromDetails"])
    },
    data(){
        return {
            
        }
    },
    computed : { ...mapState("moduleDetails",["isFromDetails"])}
};
</script>

<style lang="less" scoped>
</style>