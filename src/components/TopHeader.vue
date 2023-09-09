<template>
    <div>
        <div class="fr topfunc">
            <el-dropdown class="fr" @command="handlecommand">
                <span class="el-dropdown-link">
                    欢迎您，{{nickname}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" >
                    <el-dropdown-item command="a">个人中心</el-dropdown-item>
                    <el-dropdown-item command="b">修改密码</el-dropdown-item>
                    <el-dropdown-item command="c">退出登录</el-dropdown-item>
                    <el-dropdown-item disabled commmand="d">暴揍海星</el-dropdown-item>
                    <el-dropdown-item divided command="e">自毁程序</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <p class="fl time">
                今天是你来到暮海星辰的第<span>{{sailtime}}</span>天
            </p>
            <div class="clear"></div>
        </div>
        <div class="clear"></div>
    </div>
</template>

<script>
import  {get} from "@/utils/http"
import {removeToken} from "@/utils/auth"
    export default {
        created () {
            this.timea()
        },
        data () {
            return {
                nickname : sessionStorage.getItem("nickname"),
                timeOne : 0,
                sailtime : 0
            }
        },
        methods : {
            async timea () {
                let {time} = await get("http://localhost:8080/setsail").catch((error)=>{
                    console.log(error)
                    this.$message({
                        type : "error",

                    })
                })
                this.timeOne = time
            },
            handlecommand (item) {
                if(item === "c"){
                    removeToken()
                    this.$router.push("/login")
                }else if(item === "e"){
                    this.$message({
                        type : "success",
                        message : "已报警"
                    })
                }
            }
        },
        computed : {
            worktime () {
                let now = new Date()
                let target = this.timeOne ? new Date(this.timeOne) : new Date()
                return Math.floor((now - target)/1000/60/60/24)
            }
        },
        watch : {
            timeOne () {
                let now = new Date()
                this.sailtime = Math.floor((now - new Date(this.timeOne))/1000/60/60/24)
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-dropdown-link {
        cursor: pointer;
    }
    .el-icon-arrow-down {
        font-size: 18px;
    }
    .topfunc {
        margin-right: 20px;
    }
    .time {
        font-size: 26px;
        margin-right: 30px;
        span {
            color: #5696ff;
            font-size: 36px;
        }
        cursor : pointer
    }
</style>